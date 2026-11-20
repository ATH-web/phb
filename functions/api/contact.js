// Cloudflare Pages Function : reçoit le formulaire de contact (POST /api/contact)
// et envoie la demande par e-mail via Resend.
//
// Variables à définir dans Cloudflare (Pages > Settings > Variables and Secrets) :
//   RESEND_API_KEY  (secret)  clé API Resend, ex. re_xxxxxxxx
//   CONTACT_TO                adresse qui reçoit les demandes, ex. contact@phb70.fr
//   CONTACT_FROM              expéditeur sur un domaine vérifié dans Resend,
//                             ex. "Site PHB70 <formulaire@phb70.fr>"

const TYPES = {
  hotellerie: 'Hôtellerie',
  restauration: 'Restauration',
  immobilier: 'Immobilier de prestige',
  particulier: 'Particulier',
  autre: 'Autre',
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const escape = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    return json({ error: 'Configuration manquante' }, 500);
  }

  let data;
  try {
    data = await request.formData();
  } catch {
    return json({ error: 'Requête invalide' }, 400);
  }
  const get = (k, max = 200) => String(data.get(k) || '').trim().slice(0, max);

  // Champ piège invisible : rempli uniquement par les robots
  if (get('site_web')) return json({ ok: true });

  const nom = get('nom');
  const societe = get('societe');
  const email = get('email', 254);
  const telephone = get('telephone', 40);
  const type = TYPES[get('type')] || TYPES.autre;
  const message = get('message', 5000);
  const consentement = data.get('consentement');

  if (!nom || !message || !consentement || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Champs obligatoires manquants ou invalides' }, 400);
  }

  const lignes = [
    ['Nom', nom],
    ['Société', societe],
    ['E-mail', email],
    ['Téléphone', telephone],
    ['Type de projet', type],
  ].filter(([, v]) => v);

  const html = `
    <h2 style="font-family:Georgia,serif;font-weight:normal">Nouvelle demande depuis le site</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      ${lignes.map(([k, v]) => `<tr><td style="color:#666">${k}</td><td><strong>${escape(v)}</strong></td></tr>`).join('')}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;border-top:1px solid #ddd;padding-top:12px">${escape(message)}</p>`;

  const text = `${lignes.map(([k, v]) => `${k} : ${v}`).join('\n')}\n\n${message}`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: env.CONTACT_TO.split(',').map((s) => s.trim()),
      reply_to: email,
      subject: `Demande de contact — ${nom}${societe ? ` (${societe})` : ''} — ${type}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error('Resend', res.status, await res.text());
    return json({ error: 'Envoi impossible' }, 502);
  }
  return json({ ok: true });
}
