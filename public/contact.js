// Page Contact : vérification du formulaire puis envoi à la fonction
// Cloudflare functions/api/contact.js (qui transmet la demande à Resend).
(function () {
  const ENDPOINT = '/api/contact';

  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = form.querySelector('.contact-form__status');

  // Le texte d'aide du message s'adapte au type de projet choisi
  const type = document.getElementById('contact-type');
  const message = document.getElementById('contact-message');
  const AIDES = {
    hotellerie: 'Nombre de clés, calendrier d\u2019ouverture, périmètre envisagé, niveau de finition visé…',
    restauration: 'Nombre de couverts, date d\u2019ouverture, pièces envisagées (tables, assises, bar…), ambiance recherchée…',
    immobilier: 'Surface, pièces à aménager, matériaux souhaités, calendrier du chantier…',
    particulier: 'La pièce que vous imaginez, ses dimensions, vos matériaux et finitions préférés…',
    autre: 'Parlez-nous de votre lieu, de vos envies et de votre calendrier…',
  };
  const majAide = () => { message.placeholder = AIDES[type.value] || AIDES.autre; };
  type.addEventListener('change', majAide);
  majAide();
  const submit = form.querySelector('.contact-form__submit');

  // Un champ obligatoire est marqué en erreur seulement après avoir été quitté
  form.querySelectorAll('[required]').forEach((el) => {
    el.addEventListener('blur', () => el.closest('.field, .consent').classList.toggle('is-invalid', !el.checkValidity()));
    el.addEventListener('input', () => {
      if (el.checkValidity()) el.closest('.field, .consent').classList.remove('is-invalid');
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const invalid = [...form.querySelectorAll('[required]')].filter((el) => !el.checkValidity());
    invalid.forEach((el) => el.closest('.field, .consent').classList.add('is-invalid'));
    if (invalid.length) {
      status.textContent = 'Merci de compléter les champs obligatoires.';
      status.className = 'contact-form__status is-error';
      invalid[0].focus();
      return;
    }

    if (!ENDPOINT) {
      status.textContent = 'Le formulaire n’est pas encore relié à une adresse e-mail : votre message n’a pas été envoyé. Appelez-nous en attendant.';
      status.className = 'contact-form__status is-error';
      return;
    }

    submit.disabled = true;
    status.textContent = 'Envoi en cours…';
    status.className = 'contact-form__status';
    try {
      const donnees = Object.fromEntries(new FormData(form).entries());
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(donnees),
      });
      const reponse = await res.json().catch(() => ({}));
      if (!res.ok || !reponse.ok) throw new Error(reponse.error || res.status);
      form.reset();
      status.textContent = 'Merci, votre demande a bien été envoyée. Nous revenons vers vous sous 48 heures.';
      status.className = 'contact-form__status is-success';
    } catch (err) {
      status.textContent = 'L’envoi n’a pas fonctionné. Réessayez ou appelez-nous directement.';
      status.className = 'contact-form__status is-error';
    } finally {
      submit.disabled = false;
    }
  });
})();
