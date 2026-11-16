// Intro animée du logo PHB70 (page d'accueil, 1re visite de la session)
// Adapté de PHB70 Cinematic Intro V4.4 : mêmes durées, courbes et valeurs.
// Version HTML simple : GSAP est chargé par une balise <script> dans index.html.
//
// Déroulé (3,25 s) :
//  0,00 – 1,10 s  lettres P, H, B qui apparaissent avec leurs facettes
//  0,28 – 1,82 s  zoom arrière jusqu'au logo centré
//  1,26 – 1,84 s  apparition du « 70 », puis courte pause
//  2,05 – 2,85 s  le logo glisse dans le header, le fond crème s'efface
//  2,65 s         le texte du carrousel apparaît
(function () {
  const root = document.documentElement;
  if (!root.classList.contains('phb-intro')) return;

  // Fin de l'intro : on rend la main au site
  function finish() {
    root.classList.remove('phb-intro', 'is-intro-active');
    document.dispatchEvent(new Event('phb70:intro-hero'));
  }

  // GSAP pas chargé (pas de réseau…) : on affiche directement le site
  if (typeof gsap === 'undefined') {
    finish();
    return;
  }

  root.setAttribute('data-intro-started', '');
  try { sessionStorage.setItem('phb70_intro_played', '1'); } catch (e) {}

  class PhbIntro {
    constructor(options = {}) {
      this.options = { onComplete: options.onComplete || null };

      // Éléments du site existant
      this.headerLogoSlot = document.querySelector('.header__logo img');
      this.siteHeader = document.querySelector('.header');
      this.siteNav = document.querySelector('.header__nav');
      this.heroSection = document.querySelector('.carousel');
      this.heroContent = document.querySelector('.carousel__text');
      this.heroVisual = document.querySelector('.carousel__dots');

      // Éléments de l'intro
      this.introLogoStage = document.getElementById('introLogoStage');
      this.introBackdrop = document.getElementById('introBackdrop');

      this.nodes = {
        pBase: document.getElementById('p-base'),
        pFacet: document.getElementById('p-facet'),
        pEdge: document.getElementById('p-edge'),
        hBase: document.getElementById('h-base'),
        hFacet: document.getElementById('h-facet'),
        bBase: document.getElementById('b-base'),
        bFacetTop: document.getElementById('b-facet-top'),
        bFacetMiddle: document.getElementById('b-facet-middle'),
        bFacetBottom: document.getElementById('b-facet-bottom'),
        seven: document.getElementById('seven-base'),
        zero: document.getElementById('zero-base'),
      };

      this.timeline = null;
      this.handleResize = this.handleResize.bind(this);
      window.addEventListener('resize', this.handleResize);
    }

    // Positions : gros plan sur PHB, logo centré, puis place dans le header
    calculateCoordinates() {
      const slotRect = this.headerLogoSlot.getBoundingClientRect();
      const stageRect = this.introLogoStage.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const stageWidth = stageRect.width;
      const stageHeight = stageWidth * (240 / 1040);

      const centerX = (viewportWidth - stageWidth) / 2;
      const centerY = (viewportHeight - stageHeight) / 2;

      const isMobile = viewportWidth < 860;
      const macroScale = isMobile ? 1.38 : 1.55;
      const macroX = centerX + (isMobile ? 45 : 115);
      const macroY = centerY;

      const settleScale = isMobile ? 1.05 : 1.06;
      const settleX = centerX + (isMobile ? 6 : 14);

      const dockScale = slotRect.width / stageWidth;
      const dockX = slotRect.left + slotRect.width / 2 - stageWidth / 2;
      const dockY = slotRect.top + slotRect.height / 2 - stageHeight / 2;

      return { centerX, centerY, macroScale, macroX, macroY, settleScale, settleX, dockX, dockY, dockScale };
    }

    resetStates() {
      if (this.timeline) {
        this.timeline.kill();
        this.timeline = null;
      }
      root.classList.add('is-intro-active');
      gsap.set(
        [
          this.introLogoStage,
          this.introBackdrop,
          this.siteHeader,
          this.siteNav,
          this.heroSection,
          this.heroContent,
          this.heroVisual,
          ...Object.values(this.nodes),
        ],
        { clearProps: 'all' }
      );
    }

    buildTimeline() {
      this.resetStates();
      const coords = this.calculateCoordinates();
      const n = this.nodes;

      gsap.set(this.introLogoStage, {
        x: coords.macroX,
        y: coords.macroY,
        scale: coords.macroScale,
        opacity: 0,
        filter: 'invert(0)',
        transformOrigin: '50% 50%',
        force3D: true,
      });

      gsap.set(n.pBase, { opacity: 0, y: 9, scale: 1.018, transformOrigin: '111px 114px' });
      gsap.set(n.pFacet, { opacity: 0, x: 2, y: -2 });
      gsap.set(n.pEdge, { opacity: 0, x: 1.5, y: -1.5 });
      gsap.set(n.hBase, { opacity: 0, y: 9, scale: 1.018, transformOrigin: '341px 114px' });
      gsap.set(n.hFacet, { opacity: 0, x: 2, y: -1.5 });
      gsap.set(n.bBase, { opacity: 0, y: 9, scale: 1.018, transformOrigin: '577px 114px' });
      gsap.set([n.bFacetTop, n.bFacetBottom], { opacity: 0, x: 1.5, y: -2 });
      gsap.set(n.bFacetMiddle, { opacity: 0, x: 1.5, y: -1.5 });
      gsap.set(n.seven, { opacity: 0, x: 16 });
      gsap.set(n.zero, { opacity: 0, scale: 0.94, transformOrigin: '909px 114px' });

      gsap.set(this.introBackdrop, { opacity: 1 });
      gsap.set(this.siteNav, { opacity: 0, y: -6 });
      gsap.set([this.heroContent, this.heroVisual], { autoAlpha: 0, y: 24 });

      this.timeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          if (this.options.onComplete) this.options.onComplete();
        },
      });

      const tl = this.timeline;

      // Acte 1 : P
      tl.to(this.introLogoStage, { opacity: 1, duration: 0.20, ease: 'power2.out' }, 0.00)
        .to(n.pBase, { opacity: 1, y: 0, scale: 1.0, duration: 0.70, ease: 'power2.out' }, 0.04)
        .to(n.pFacet, { opacity: 1, x: 0, y: 0, duration: 0.52, ease: 'power2.out' }, 0.16)
        .to(n.pEdge, { opacity: 0.5, x: 0, y: 0, duration: 0.48, ease: 'power2.out' }, 0.22);

      // Acte 2 : H puis B
      tl.to(n.hBase, { opacity: 1, y: 0, scale: 1.0, duration: 0.70, ease: 'power2.out' }, 0.22)
        .to(n.hFacet, { opacity: 1, x: 0, y: 0, duration: 0.52, ease: 'power2.out' }, 0.34)
        .to(n.bBase, { opacity: 1, y: 0, scale: 1.0, duration: 0.70, ease: 'power2.out' }, 0.40)
        .to([n.bFacetTop, n.bFacetBottom], { opacity: 1, x: 0, y: 0, duration: 0.52, ease: 'power2.out' }, 0.52)
        .to(n.bFacetMiddle, { opacity: 0.55, x: 0, y: 0, duration: 0.50, ease: 'power2.out' }, 0.58);

      // Acte 3 : zoom arrière
      tl.to(this.introLogoStage, { x: coords.settleX, y: coords.centerY, scale: coords.settleScale, duration: 1.00, ease: 'power3.out' }, 0.28)
        .to(this.introLogoStage, { x: coords.centerX, y: coords.centerY, scale: 1.0, duration: 0.54, ease: 'power2.out' }, 1.28);

      // Acte 4 : « 70 »
      tl.to(n.seven, { opacity: 1, x: 0, duration: 0.52, ease: 'power3.out' }, 1.26)
        .to(n.zero, { opacity: 1, scale: 1.0, duration: 0.52, ease: 'power3.out' }, 1.32);

      // Acte 5 : le logo rejoint le header
      tl.call(() => root.classList.remove('is-intro-active'), null, 2.05)
        .to(this.introLogoStage, { x: coords.dockX, y: coords.dockY, scale: coords.dockScale, duration: 0.80, ease: 'power3.inOut' }, 2.05)
        .to(this.introBackdrop, { opacity: 0, duration: 0.60, ease: 'power2.inOut' }, 2.15)
        // Le logo passe en blanc en même temps que le fond s'efface,
        // pour correspondre au logo du header posé sur le carrousel
        .to(this.introLogoStage, { filter: 'invert(1)', duration: 0.60, ease: 'power2.inOut' }, 2.15)
        .to(this.siteNav, { opacity: 1, y: 0, duration: 0.50, ease: 'power2.out' }, 2.35)
        .call(() => document.dispatchEvent(new Event('phb70:intro-hero')), null, 2.65)
        .to(this.heroContent, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 2.65)
        .to(this.heroVisual, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 2.75);
    }

    play() {
      this.buildTimeline();
      this.timeline.play(0);
    }

    // Si la fenêtre change de taille pendant l'intro, on recalcule les positions
    handleResize() {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        if (!this.timeline) return;
        const t = this.timeline.time();
        this.buildTimeline();
        if (t >= 2.05) root.classList.remove('is-intro-active');
        this.timeline.play(t);
      }, 150);
    }

    destroy() {
      window.removeEventListener('resize', this.handleResize);
      clearTimeout(this.resizeTimeout);
      if (this.timeline) this.timeline.kill();
    }
  }

  const intro = new PhbIntro({
    onComplete: () => {
      intro.destroy();
      // Le logo animé est pile à la place du logo du header : on passe la main
      finish();
    },
  });
  intro.play();
})();
