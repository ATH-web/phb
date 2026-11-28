// Cloudflare Pages Function : reçoit le formulaire de contact (POST /api/contact)
// et envoie la demande par e-mail via Resend.
//
// Variables à définir dans Cloudflare (Pages > Settings > Variables and Secrets)
// et, en local, dans .dev.vars (voir .dev.vars.example) :
//   RESEND_API_KEY  (secret)  clé API Resend, ex. re_xxxxxxxx
//   CONTACT_TO                adresse qui reçoit les demandes (plusieurs possibles, séparées par des virgules)
//   CONTACT_FROM              expéditeur sur un domaine vérifié dans Resend,
//                             ex. "Site PHB70 <formulaire@mail.phb70.com>"

const TYPES = {
  hotellerie: 'Hôtellerie',
  restauration: 'Restauration',
  immobilier: 'Immobilier de prestige',
  particulier: 'Particulier',
  autre: 'Autre',
};

const MAX = { nom: 100, email: 200, societe: 150, telephone: 30, message: 5000 };
const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]{2,}$/;

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  });

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Lit le corps en JSON ou en FormData et renvoie un objet simple { champ: valeur }
async function lireCorps(request) {
  const type = request.headers.get('Content-Type') || '';
  if (type.includes('application/json')) {
    const data = await request.json();
    return data && typeof data === 'object' ? data : {};
  }
  const form = await request.formData();
  return Object.fromEntries(form.entries());
}

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    console.error('Contact : variables RESEND_API_KEY, CONTACT_TO ou CONTACT_FROM manquantes');
    return json({ ok: false, error: 'Service momentanément indisponible.' }, 500);
  }

  let data;
  try {
    data = await lireCorps(request);
  } catch {
    return json({ ok: false, error: 'Requête invalide.' }, 400);
  }
  const champ = (k) => (typeof data[k] === 'string' ? data[k].trim() : '');

  // Champ piège invisible : rempli uniquement par les robots → on fait semblant d'avoir envoyé
  if (champ('website')) return json({ ok: true });

  const nom = champ('nom');
  const email = champ('email');
  const societe = champ('societe');
  const telephone = champ('telephone');
  const message = champ('message');
  const type = TYPES[champ('type')] || '';
  const langue = champ('langue') === 'en' ? 'Anglais (version anglaise du site)' : '';
  const consentement = data.consentement === true || champ('consentement') !== '';

  const erreurs = [];
  if (!nom) erreurs.push('nom');
  if (!email || !EMAIL_RE.test(email)) erreurs.push('email');
  if (!message) erreurs.push('message');
  if (!consentement) erreurs.push('consentement');
  for (const [k, max] of Object.entries(MAX)) {
    if (champ(k).length > max) erreurs.push(k);
  }
  if (erreurs.length) {
    return json({ ok: false, error: 'Champs manquants ou invalides.', fields: [...new Set(erreurs)] }, 400);
  }

  const lignes = [
    ['Nom', nom],
    ['Société', societe],
    ['E-mail', email],
    ['Téléphone', telephone],
    ['Type de projet', type],
    ['Langue', langue],
  ].filter(([, v]) => v);

  const html = `
    <h2 style="font-family:Georgia,serif;font-weight:normal">Nouvelle demande depuis le site</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      ${lignes.map(([k, v]) => `<tr><td style="color:#666">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`).join('')}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;border-top:1px solid #ddd;padding-top:12px">${escapeHtml(message)}</p>`;

  const text = `${lignes.map(([k, v]) => `${k} : ${v}`).join('\n')}\n\n${message}`;

  // Pas de retour à la ligne dans l'objet du mail
  const sujet = `Demande de contact — ${nom}${societe ? ` (${societe})` : ''}`.replace(/[\r\n]+/g, ' ');

  let res;
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.CONTACT_FROM,
        to: env.CONTACT_TO.split(',').map((s) => s.trim()).filter(Boolean),
        reply_to: email,
        subject: sujet,
        html,
        text,
      }),
    });
  } catch (err) {
    console.error('Resend injoignable :', err);
    return json({ ok: false, error: 'L’envoi a échoué. Merci de réessayer.' }, 502);
  }

  if (!res.ok) {
    console.error('Resend a refusé l’envoi :', res.status, await res.text());
    return json({ ok: false, error: 'L’envoi a échoué. Merci de réessayer.' }, 502);
  }
  return json({ ok: true });
}

// Toute autre méthode que POST
export async function onRequest() {
  return json({ ok: false, error: 'Méthode non autorisée.' }, 405, { Allow: 'POST' });
}
