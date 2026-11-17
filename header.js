// Header du site (toutes les pages) :
// - page d'accueil : transparent sur le carrousel, voile crème flou dès qu'on scrolle
// - autres pages (data-solid) : voile crème flou dès le départ
// - se cache quand on descend, réapparaît quand on remonte
// Au rechargement, on revient toujours tout en haut de la page
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

(function () {
  const header = document.querySelector('.header--transparent');
  if (!header) return;

  const solid = header.hasAttribute('data-solid');
  const TOLERANCE = 5; // ignore les tout petits mouvements
  let lastY = window.scrollY;

  // Sur les pages sans carrousel, on décale le contenu
  // pour qu'il ne passe pas sous le header fixe
  function setOffset() {
    if (solid) document.body.style.paddingTop = header.offsetHeight + 'px';
  }

  function update() {
    const y = window.scrollY;

    header.classList.toggle('is-scrolled', solid || y > 10);

    if (Math.abs(y - lastY) > TOLERANCE && !header.classList.contains('is-menu-open')) {
      // On descend (et on a dépassé la hauteur du header) : on cache
      // On remonte : on affiche
      header.classList.toggle('is-hidden', y > lastY && y > header.offsetHeight);
      lastY = y;
    }
  }

  // ===== Menu mobile : bouton 3 barres qui ouvre le menu en plein écran =====
  const nav = header.querySelector('.header__nav');
  const burger = document.createElement('button');
  burger.type = 'button';
  burger.className = 'header__burger';
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Ouvrir le menu');
  burger.innerHTML = '<span></span><span></span><span></span>';
  if (nav) {
    nav.id = nav.id || 'menu-principal';
    burger.setAttribute('aria-controls', nav.id);
    header.appendChild(burger);
    header.classList.add('has-burger');
  }
  const mobile = window.matchMedia('(max-width: 900px)');

  function setMenu(open) {
    header.classList.toggle('is-menu-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    document.documentElement.style.overflow = open ? 'hidden' : ''; // la page ne défile pas derrière
    if (open) header.classList.remove('is-hidden');
  }
  const isOpen = () => header.classList.contains('is-menu-open');

  burger.addEventListener('click', () => setMenu(!isOpen()));
  if (nav) nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) { setMenu(false); burger.focus(); }
  });
  mobile.addEventListener('change', () => { if (!mobile.matches) setMenu(false); });

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', setOffset);
  setOffset();
  update();
})();
