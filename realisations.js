// Page Réalisations : livres de projets dans une bibliothèque, filtres
// et visionneuse où l'on tourne les pages.
(function () {
  // ===== Liste des projets =====
  // categorie : "hotellerie", "restauration" ou "immobilier"
  // lieu : facultatif (laisser '' s'il n'est pas connu)
  // images : une entrée par page du livre.
  //   - 'photo.jpg'               → une photo seule sur la page
  //   - ['photo1.jpg', 'photo2.jpg'] → deux photos l'une au-dessus de l'autre (idéal pour les photos en largeur)
  //   - { decale: ['photo1.jpg', 'photo2.jpg'] } → deux photos décalées : en haut à gauche, en bas à droite
  // couverture : photo de la couverture, reprise seule sur la page à côté de la description
  //   (ne pas la remettre dans images).
  // photoIntro : facultatif, photo de la page 2 (face à la description) si elle doit
  //   être différente de la couverture.
  // etiquette : facultatif, texte affiché en haut de la couverture à la place du secteur.
  // couverturePosition : facultatif, quelle partie de la photo garder sur la couverture
  //   (ex. 'center 85%' : on garde le bas, on coupe le haut).
  const PROJETS = [
    {
      titre: 'Luteca',
      lieu: '',
      categorie: 'restauration',
      etiquette: 'Mobilier haut de gamme',
      texte: 'Profondément ancrés dans les traditions artisanales qui ont inspiré le travail des plus grands designers modernistes mexicains du XXe siècle.',
      couverture: 'assets/realisations/luteca/couverture.jpg',
      photoIntro: 'assets/realisations/luteca/salle.jpg',
      images: [
        'assets/realisations/luteca/oco-l1.jpg',
        { decale: ['assets/realisations/luteca/oco-w2.jpg', 'assets/realisations/luteca/oco-w1.jpg'] },
        ['assets/realisations/luteca/table-ovale-w2.jpg', 'assets/realisations/luteca/table-ovale-face.jpg'],
        { decale: ['assets/realisations/luteca/table-ovale-d1.jpg', 'assets/realisations/luteca/table-ronde-w1.jpg'] },
        'assets/realisations/luteca/chaise-eugenio-w1.jpg',
        'assets/realisations/luteca/chaise-eugenio-w2.jpg',
        'assets/realisations/luteca/buffet-tresse.jpg',
        { decale: ['assets/realisations/luteca/buffet-tresse-d2.jpg', 'assets/realisations/luteca/buffet-tresse-d5.jpg'] },
        'assets/realisations/luteca/san-miguel-terrasse.jpg',
        { decale: ['assets/realisations/luteca/san-miguel-l1.jpg', 'assets/realisations/luteca/san-miguel-w1.jpg'] },
      ],
    },
    {
      titre: 'Norman',
      lieu: '',
      categorie: 'hotellerie',
      texte: 'Projet d’hôtel conçu comme des appartements parisiens, avec des pièces de design et un mobilier éclectique.',
      couverture: 'assets/realisations/norman/05.jpg',
      images: [
        'assets/realisations/norman/salon-vert.jpg',
        'assets/realisations/norman/tete-de-lit.jpg',
        'assets/realisations/norman/chambre.jpg',
        'assets/realisations/norman/table-basse.jpg',
        'assets/realisations/norman/chambre-lit-cuir.jpg',
        ['assets/realisations/norman/chambre-rangements.jpg', 'assets/realisations/norman/coin-salon.jpg'],
        'assets/realisations/norman/salon-escalier.jpg',
        ['assets/realisations/norman/bar.jpg', 'assets/realisations/norman/restaurant.jpg'],
        'assets/realisations/norman/02.jpg',
        ['assets/realisations/norman/03.jpg', 'assets/realisations/norman/04.jpg'],
        'assets/realisations/norman/01.jpg',
        'assets/realisations/norman/06.jpg',
      ],
    },
    {
      titre: 'VF Architecture',
      lieu: '',
      categorie: 'immobilier',
      texte: 'VF ARCHITECTURE nous fait confiance pour l’ameublement de ses projets de résidences de prestige. Du choix des matières à la conception de mobilier sur mesure, nous composons des intérieurs en accord avec l’architecture de chaque maison.',
      couverture: 'assets/realisations/vf-architecture/couverture.jpg', // photo de couverture (n'apparaît pas dans le livre)
      images: [
        ['assets/realisations/vf-architecture/01.jpg', 'assets/realisations/vf-architecture/03.jpg'],
        ['assets/realisations/vf-architecture/04.jpg', 'assets/realisations/vf-architecture/05.jpg'],
        ['assets/realisations/vf-architecture/06.jpg', 'assets/realisations/vf-architecture/07.jpg'],
        ['assets/realisations/vf-architecture/09.jpg', 'assets/realisations/vf-architecture/11.jpg'],
        'assets/realisations/vf-architecture/08.jpg',
        'assets/realisations/vf-architecture/10.jpg',
        ['assets/realisations/vf-architecture/12.jpg', 'assets/realisations/vf-architecture/13.jpg'],
        ['assets/realisations/vf-architecture/14.jpg', 'assets/realisations/vf-architecture/15.jpg'],
      ],
    },
    {
      titre: 'Sainte-Maxime',
      lieu: '',
      categorie: 'immobilier',
      texte: 'Projet d’ameublement sur mesure pour une villa contemporaine à Sainte-Maxime.',
      couverture: 'assets/realisations/projet-5/01.jpg',
      images: [
        ['assets/realisations/projet-5/02.jpg', 'assets/realisations/projet-5/03.jpg'],
        'assets/realisations/projet-5/salle-a-manger.jpg',
        'assets/realisations/projet-5/05.jpg',
        ['assets/realisations/projet-5/06.jpg', 'assets/realisations/projet-5/07.jpg'],
        'assets/realisations/projet-5/chambre.jpg',
        'assets/realisations/projet-5/commode.jpg',
        'assets/realisations/projet-5/chambre-suspensions.jpg',
        'assets/realisations/projet-5/coin-fauteuil.jpg',
        'assets/realisations/projet-5/salle-de-bain.jpg',
        'assets/realisations/projet-5/vasque.jpg',
      ],
    },
    {
      titre: 'Maison Heller',
      lieu: '',
      categorie: 'hotellerie',
      texte: 'Projet imaginé par Philippe Starck, qui nous a confié la réalisation de l’ensemble du mobilier sur mesure et de la menuiserie.',
      couverture: 'assets/realisations/maison-heller/couverture.jpg',
      images: [
        'assets/realisations/maison-heller/couloir.jpg',
        ['assets/realisations/maison-heller/chambre-armoire.jpg', 'assets/realisations/maison-heller/chambre-bureau.jpg'],
        'assets/realisations/maison-heller/table-de-chevet.jpg',
        ['assets/realisations/maison-heller/dressing.jpg', 'assets/realisations/maison-heller/bureau-lampes.jpg'],
        'assets/realisations/maison-heller/bar.jpg',
        'assets/realisations/maison-heller/restaurant-vitraux.jpg',
        'assets/realisations/maison-heller/bar-vitrail.jpg',
        'assets/realisations/maison-heller/table-portrait.jpg',
      ],
    },
    {
      titre: 'Le mobilier',
      lieu: '',
      categorie: 'restauration',
      texte: '', // pas de texte d'introduction
      couverture: 'assets/realisations/projet-4/01.jpg',
      images: [
        ['assets/realisations/projet-4/02.jpg', 'assets/realisations/projet-4/03.jpg'],
        'assets/realisations/projet-4/05.jpg',
        'assets/realisations/projet-4/04.jpg',
        'assets/realisations/projet-4/06.jpg',
      ],
    },
  ];

  const CATEGORIES = {
    hotellerie: 'Hôtellerie',
    restauration: 'Restauration',
    immobilier: 'Immobilier de prestige',
  };

  const esc = (str) => String(str).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ===== Couverture d'un livre (même dessin dans la bibliothèque et dans la visionneuse) =====
  // Tous les livres ont une couverture crème (aussi dans la visionneuse)
  function coverHTML(p) {
    return `
      <span class="cover cover--creme">
        <span class="cover__eyebrow">${esc(p.etiquette || CATEGORIES[p.categorie])}</span>
        <span class="cover__photo"><img src="${esc(p.couverture || [].concat(p.images[0])[0])}" alt="" loading="lazy"${p.couverturePosition ? ` style="object-position: ${esc(p.couverturePosition)}"` : ''}></span>
        <span class="cover__title">${esc(p.titre)}</span>
        <span class="cover__place">${p.lieu ? esc(p.lieu) : '&nbsp;'}</span>
      </span>`;
  }

  // ===== Génération des livres =====
  document.querySelector('.books--cabinet').innerHTML = PROJETS.map((p, i) => `
      <div class="book-item" data-cat="${p.categorie}">
        <button class="book" type="button" data-index="${i}" aria-label="Ouvrir le livre : ${esc(p.titre)}">
          <span class="book__body">
            ${coverHTML(p)}
          </span>
        </button>
      </div>`).join('');

  // ===== Bibliothèques : un livre par case =====
  // Deux meubles au choix (onglets). Pour chacun, les cases de la photo, de gauche à droite
  // puis de haut en bas. x : centre de la case, y : hauteur de l'étagère depuis le bas,
  // en % de la photo. 6 cases : au-delà de 6 projets, il faudra une autre photo.
  const MEUBLES = {
    noyer: [ // assets/realisations/bibliotheque.jpg
      { x: 23.9, y: 58.2 }, { x: 50.5, y: 58.2 }, { x: 75.8, y: 58.2 },
      { x: 26.4, y: 26.2 }, { x: 50.1, y: 26.2 }, { x: 75.9, y: 26.2 },
    ],
    taupe: [ // assets/realisations/bibliotheque-taupe.jpg
      { x: 24.2, y: 57.4 }, { x: 50.3, y: 57.4 }, { x: 75.6, y: 57.4 },
      { x: 26.1, y: 25.7 }, { x: 50.0, y: 25.7 }, { x: 75.8, y: 25.7 },
    ],
  };
  const cabinetEl = document.getElementById('cabinet');
  const tabs = [...document.querySelectorAll('.cabinet-tabs__tab')];

  function layoutCabinet() {
    const cases = MEUBLES[cabinetEl.dataset.meuble] || MEUBLES.noyer;
    const visible = [...cabinetEl.querySelectorAll('.book-item')].filter((it) => !it.hidden);
    visible.forEach((it, k) => {
      const c = cases[k % cases.length];
      it.style.setProperty('--x', c.x + '%');
      it.style.setProperty('--y', c.y + '%');
    });
  }

  function choisirMeuble(nom, focus) {
    if (!MEUBLES[nom]) return;
    cabinetEl.dataset.meuble = nom;
    tabs.forEach((t) => {
      const actif = t.dataset.meuble === nom;
      t.setAttribute('aria-selected', actif);
      t.tabIndex = actif ? 0 : -1;
      if (actif) {
        cabinetEl.setAttribute('aria-labelledby', t.id);
        if (focus) t.focus();
      }
    });
    layoutCabinet();
    try { localStorage.setItem('phb-meuble', nom); } catch (e) { /* stockage indisponible */ }
  }

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => choisirMeuble(t.dataset.meuble));
    // flèches gauche / droite pour passer d'un onglet à l'autre
    t.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      choisirMeuble(next.dataset.meuble, true);
    });
  });

  let meubleInitial = 'noyer';
  try { meubleInitial = localStorage.getItem('phb-meuble') || 'noyer'; } catch (e) { /* stockage indisponible */ }
  choisirMeuble(meubleInitial);

  // ===== Visionneuse : livre en grand, pages qui se tournent =====
  const viewer = document.getElementById('viewer');
  const book = viewer.querySelector('.flipbook');
  const titleEl = viewer.querySelector('.viewer__title');
  const countEl = viewer.querySelector('.viewer__count');
  const prevBtn = viewer.querySelector('.viewer__nav--prev');
  const nextBtn = viewer.querySelector('.viewer__nav--next');
  const closeBtn = viewer.querySelector('.viewer__close');
  let leaves = [];
  let current = 0; // nombre de feuilles déjà tournées
  let lastFocus = null;
  let sourceBook = null; // livre cliqué dans la bibliothèque (masqué pendant que le livre est ouvert)
  let autoTurn = null;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const OPEN_MS = 750;   // durée de l'agrandissement du livre
  const VIEWER_BG = 'rgba(36, 34, 31, 0.97)';

  // Téléphone : une seule page visible (celle de droite), en grand.
  // Chaque feuille porte une page au recto, le verso reste vide.
  const PAGE_SEULE = window.matchMedia('(max-width: 600px)');
  let pageSeule = false; // mode du livre actuellement ouvert

  // Contenu de chaque page du livre
  function buildPages(p, seule) {
    const pages = [];
    pages.push(`<div class="page page--cover">${coverHTML(p)}</div>`);
    pages.push(`
      <div class="page page--intro">
        <p class="page__eyebrow">${esc(p.etiquette || CATEGORIES[p.categorie])}</p>
        <h2 class="page__title">${esc(p.titre)}</h2>
        ${p.lieu ? `<p class="page__place">${esc(p.lieu)}</p>` : ''}
        <span class="page__line" aria-hidden="true"></span>
        ${p.texte ? `<p class="page__text">${esc(p.texte)}</p>` : ''}
      </div>`);
    // Page de droite, face à la description : la photo de couverture, seule
    const coverSrc = p.photoIntro || p.couverture || [].concat(p.images[0])[0];
    pages.push(`<div class="page page--photo"><img src="${esc(coverSrc)}" alt="" loading="lazy"></div>`);
    p.images.forEach((entry) => {
      if (entry && entry.decale) {
        const imgs = entry.decale.map((src) => `<img src="${esc(src)}" alt="" loading="lazy">`).join('');
        pages.push(`<div class="page page--photo page--photo-decale">${imgs}</div>`);
        return;
      }
      const srcs = [].concat(entry); // une photo ou deux photos sur la page
      const imgs = srcs.map((src) => `<img src="${esc(src)}" alt="" loading="lazy">`).join('');
      pages.push(`<div class="page page--photo${srcs.length > 1 ? ' page--photo-2' : ''}">${imgs}</div>`);
    });
    // Nombre de pages pair (double page), puis 4e de couverture
    if (!seule && pages.length % 2 === 0) pages.push('<div class="page page--blank"></div>');
    pages.push('<div class="page page--back"><img src="assets/logo-phb70.svg" alt="PHB70"></div>');
    // Numéros de page (hors couvertures)
    // (chaque page est un seul <div> : on ajoute le numéro juste avant sa fermeture)
    return pages.map((html, i) => {
      if (i === 0 || i === pages.length - 1 || html.includes('page--blank')) return html;
      const h = html.trim();
      return `${h.slice(0, -'</div>'.length)}<span class="page__num">${i}</span></div>`;
    });
  }

  // Dernière position possible : livre refermé (double page) ou 4e de couverture (page seule)
  const lastPos = () => (pageSeule ? leaves.length - 1 : leaves.length);

  function render() {
    const n = leaves.length;
    leaves.forEach((leaf, i) => {
      const flipped = i < current;
      leaf.classList.toggle('is-flipped', flipped);
      leaf.style.zIndex = flipped ? i + 1 : n - i;
    });
    // Livre fermé : on le centre sur la couverture (ou sur la 4e de couverture)
    book.classList.toggle('is-closed-front', !pageSeule && current === 0);
    book.classList.toggle('is-closed-back', !pageSeule && current === n);
    book.classList.toggle('flipbook--page-seule', pageSeule);
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === lastPos();
    if (pageSeule) {
      countEl.textContent = current === 0 ? 'Couverture'
        : current === n - 1 ? 'Fin'
        : `Page ${current} / ${n - 2}`;
      return;
    }
    const total = n * 2;
    countEl.textContent = current === 0 ? 'Couverture'
      : current === n ? 'Fin'
      : `Pages ${current * 2 - 1}–${current * 2} / ${total - 2}`;
  }

  function turn(dir) {
    const n = leaves.length;
    const target = current + dir;
    if (target < 0 || target > lastPos()) return;
    // La feuille qui tourne passe au-dessus des autres pendant l'animation
    const leaf = leaves[dir > 0 ? current : current - 1];
    current = target;
    render();
    leaf.style.zIndex = n + 2;
    clearTimeout(leaf._t);
    leaf._t = setTimeout(render, 900);
  }

  // Ouverture : le livre part de sa place dans la bibliothèque et s'agrandit
  // jusqu'au centre de l'écran, puis s'ouvre tout seul sur la première double page.
  function open(index, srcEl) {
    const p = PROJETS[index];
    pageSeule = PAGE_SEULE.matches;
    const pages = buildPages(p, pageSeule);
    book.innerHTML = '';
    leaves = [];
    const step = pageSeule ? 1 : 2;
    for (let i = 0; i < pages.length; i += step) {
      const leaf = document.createElement('div');
      leaf.className = 'leaf';
      const back = pageSeule ? '<div class="page page--blank"></div>' : pages[i + 1];
      leaf.innerHTML = `
        <div class="leaf__face leaf__front">${pages[i]}</div>
        <div class="leaf__face leaf__back">${back}</div>`;
      // Clic sur une page de droite : on avance ; de gauche : on recule
      // Téléphone (page seule) : clic dans le quart gauche de la page = page précédente
      leaf.querySelector('.leaf__front').addEventListener('click', (e) => {
        if (pageSeule) {
          const r = e.currentTarget.getBoundingClientRect();
          if (e.clientX - r.left < r.width / 4) { turn(-1); return; }
        }
        turn(1);
      });
      leaf.querySelector('.leaf__back').addEventListener('click', () => turn(-1));
      book.appendChild(leaf);
      leaves.push(leaf);
    }
    current = 0;
    titleEl.textContent = `${p.titre} — ${p.etiquette || CATEGORIES[p.categorie]}`;

    // Livre fermé, sans animation de position (il peut rester l'état du livre précédent)
    book.classList.add('no-anim');
    render();
    lastFocus = document.activeElement;
    viewer.hidden = false;
    document.body.style.overflow = 'hidden';
    void book.offsetWidth; // applique l'état fermé tout de suite
    book.classList.remove('no-anim');
    closeBtn.focus({ preventScroll: true });

    clearTimeout(autoTurn);
    const startTurn = () => { autoTurn = setTimeout(() => { if (current === 0) turn(1); }, 250); };

    const srcCover = srcEl && srcEl.querySelector('.cover');
    if (reduceMotion || !srcCover) {
      startTurn();
      return;
    }

    // Où se trouve le livre cliqué, et où se trouvera la couverture en grand
    const from = srcCover.getBoundingClientRect();
    const to = leaves[0].querySelector('.leaf__front').getBoundingClientRect();
    const stage = viewer.querySelector('.viewer__stage');
    const stageRect = stage.getBoundingClientRect();
    const scale = from.width / to.width;
    const dx = (from.left + from.width / 2) - (to.left + to.width / 2);
    const dy = (from.top + from.height / 2) - (to.top + to.height / 2);
    stage.style.transformOrigin = `${to.left + to.width / 2 - stageRect.left}px ${to.top + to.height / 2 - stageRect.top}px`;

    sourceBook = srcEl;
    sourceBook.style.visibility = 'hidden'; // le livre "sort" de la bibliothèque

    const ease = 'cubic-bezier(0.22, 0.8, 0.25, 1)';
    stage.animate(
      [{ transform: `translate(${dx}px, ${dy}px) scale(${scale})` }, { transform: 'none' }],
      { duration: OPEN_MS, easing: ease }
    );
    // une fois le livre arrivé au centre, il s'ouvre (minuterie : plus fiable que la fin d'animation)
    autoTurn = setTimeout(startTurn, OPEN_MS);
    viewer.animate(
      [{ backgroundColor: 'rgba(36, 34, 31, 0)' }, { backgroundColor: VIEWER_BG }],
      { duration: OPEN_MS, easing: 'ease' }
    );
    viewer.querySelectorAll('.viewer__top, .viewer__controls').forEach((el) => {
      el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: OPEN_MS - 200, fill: 'backwards' });
    });
  }

  // Fermeture : fondu rapide, puis le livre reprend sa place dans la bibliothèque
  function close() {
    clearTimeout(autoTurn);
    const done = () => {
      viewer.hidden = true;
      document.body.style.overflow = '';
      if (sourceBook) sourceBook.style.visibility = '';
      sourceBook = null;
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    };
    if (reduceMotion) return done();
    viewer.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: 'ease', fill: 'forwards' });
    setTimeout(() => {
      done();
      viewer.getAnimations().forEach((a) => a.cancel()); // remet l'opacité pour la prochaine ouverture
    }, 300);
  }

  document.querySelectorAll('.book').forEach((b) => {
    b.addEventListener('click', () => open(Number(b.dataset.index), b));
  });
  // Téléphone : on tourne les pages en glissant le doigt
  const stageEl = viewer.querySelector('.viewer__stage');
  let touchX = null, touchY = null;
  stageEl.addEventListener('touchstart', (e) => {
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
  }, { passive: true });
  stageEl.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    const dy = e.changedTouches[0].clientY - touchY;
    touchX = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) turn(dx < 0 ? 1 : -1);
  });
  prevBtn.addEventListener('click', () => turn(-1));
  nextBtn.addEventListener('click', () => turn(1));
  closeBtn.addEventListener('click', close);
  // Clic sur le fond sombre : on ferme
  viewer.addEventListener('click', (e) => {
    if (e.target === viewer || e.target.classList.contains('viewer__stage')) close();
  });
  document.addEventListener('keydown', (e) => {
    if (viewer.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') turn(1);
    if (e.key === 'ArrowLeft') turn(-1);
    // Garde le focus clavier dans la visionneuse
    if (e.key === 'Tab') {
      const items = [closeBtn, prevBtn, nextBtn].filter((el) => !el.disabled);
      const idx = items.indexOf(document.activeElement);
      e.preventDefault();
      items[(idx + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
    }
  });
})();
