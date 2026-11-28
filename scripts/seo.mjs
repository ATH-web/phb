// Générateur SEO du site PHB70 — à lancer avec : node scripts/seo.mjs
//
// C'est le SEUL endroit où figure l'URL de base du site. Le script :
//   - génère public/sitemap.xml et public/robots.txt ;
//   - réécrit, dans chaque page, le bloc compris entre <!-- SEO:start --> et <!-- SEO:end -->
//     (description, canonical, Open Graph) à partir de la liste PAGES ci-dessous, ainsi que le <title>.
// Après avoir changé SITE_URL ou un titre / une description, relancer le script.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const SITE_URL = 'https://www.phb70.com';

// Image de partage par défaut (réseaux sociaux, messageries)
const OG_IMAGE = '/assets/og-image.jpg';

// path : URL publique (Cloudflare Pages sert contact.html à l'adresse /contact)
// en : version anglaise de la page (dossier public/en/), reliée à la page française par des balises hreflang
const PAGES = [
  {
    file: 'index.html',
    path: '/',
    title: 'PHB70 — Mobilier sur mesure pour l’hôtellerie de prestige',
    description:
      'PHB70 conçoit et fait fabriquer du mobilier sur mesure pour hôtels, restaurants et résidences de prestige, de l’étude technique à la livraison.',
    en: {
      file: 'en/index.html',
      path: '/en/',
      title: 'PHB70 — Bespoke furniture for luxury hospitality',
      description:
        'PHB70 designs and manufactures bespoke furniture for hotels, restaurants and luxury residences, from technical design to delivery.',
    },
  },
  {
    file: 'equipe.html',
    path: '/equipe',
    title: 'Notre équipe — Designers et chefs de projet | PHB70',
    description:
      'Rencontrez l’équipe PHB70 : Philippe Boccara, fondateur, nos chefs de projet et notre architecte d’intérieur, qui suivent votre mobilier sur mesure.',
    en: {
      file: 'en/team.html',
      path: '/en/team',
      title: 'Our team — Designers and project managers | PHB70',
      description:
        'Meet the PHB70 team: founder Philippe Boccara, our project managers and our interior architect, who follow your bespoke furniture through.',
    },
  },
  {
    file: 'methode.html',
    path: '/methode',
    title: 'Notre méthode : du premier croquis à la livraison | PHB70',
    description:
      'Faisabilité, prototype, production, contrôle et livraison : les quatre étapes de PHB70 pour concevoir et fabriquer votre mobilier sur mesure.',
    en: {
      file: 'en/method.html',
      path: '/en/method',
      title: 'Our method: from first sketch to delivery | PHB70',
      description:
        'Feasibility, prototype, production, inspection and delivery: the four steps PHB70 follows to design and manufacture your bespoke furniture.',
    },
  },
  {
    file: 'realisations.html',
    path: '/realisations',
    title: 'Réalisations — Hôtels, restaurants et résidences | PHB70',
    description:
      'Feuilletez les réalisations de PHB70 : mobilier sur mesure conçu et fabriqué pour des hôtels, des restaurants et des résidences de prestige.',
    en: {
      file: 'en/projects.html',
      path: '/en/projects',
      title: 'Projects — Hotels, restaurants and residences | PHB70',
      description:
        'Leaf through PHB70’s projects: bespoke furniture designed and manufactured for hotels, restaurants and luxury residences.',
    },
  },
  {
    file: 'sur-mesure.html',
    path: '/sur-mesure',
    title: 'Sur mesure : des pièces uniques à vos dimensions | PHB70',
    description:
      'Dimensions, essences de bois, tissus, finitions : découvrez des pièces uniques dessinées et fabriquées par PHB70 selon les envies de chaque client.',
    en: {
      file: 'en/bespoke.html',
      path: '/en/bespoke',
      title: 'Bespoke: one-of-a-kind pieces made to measure | PHB70',
      description:
        'Dimensions, wood species, fabrics, finishes: discover one-of-a-kind pieces designed and made by PHB70 to each client’s wishes.',
    },
  },
  {
    file: 'contact.html',
    path: '/contact',
    title: 'Contact — Parlons de votre projet de mobilier | PHB70',
    description:
      'Un projet d’hôtel, de restaurant ou de résidence ? Écrivez à PHB70 pour étudier votre mobilier sur mesure. Nous vous répondons sous 48 heures.',
    en: {
      file: 'en/contact.html',
      path: '/en/contact',
      title: 'Contact — Let’s talk about your furniture project | PHB70',
      description:
        'A hotel, restaurant or residential project? Write to PHB70 to discuss your bespoke furniture. We reply within 48 hours.',
    },
  },
  {
    file: 'mentions-legales.html',
    path: '/mentions-legales',
    title: 'Mentions légales du site PHB70 — Mobilier sur mesure',
    description:
      'Mentions légales du site PHB70 : informations sur l’éditeur, le directeur de la publication, l’hébergeur du site et la propriété intellectuelle des contenus.',
    en: {
      file: 'en/legal-notice.html',
      path: '/en/legal-notice',
      title: 'Legal notice — PHB70 bespoke furniture',
      description:
        'Legal notice of the PHB70 website: information about the publisher, the publication director, the website host and intellectual property.',
    },
  },
  {
    file: 'confidentialite.html',
    path: '/confidentialite',
    title: 'Politique de confidentialité et données personnelles — PHB70',
    description:
      'Comment PHB70 traite les données personnelles transmises via son site et son formulaire de contact : finalités, destinataires, durées et droits.',
    en: {
      file: 'en/privacy.html',
      path: '/en/privacy',
      title: 'Privacy policy and personal data — PHB70',
      description:
        'How PHB70 processes personal data sent through its website and contact form: purposes, recipients, retention periods and your rights.',
    },
  },
];

// Dossier publié par Cloudflare Pages (Build output directory = public)
const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const today = new Date().toISOString().slice(0, 10);
const abs = (p) => SITE_URL.replace(/\/$/, '') + p;
const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Chaque page existe en français et en anglais : on aplatit la liste
const VERSIONS = PAGES.flatMap((p) => [
  { ...p, lang: 'fr', fr: p, en: p.en },
  ...(p.en ? [{ ...p.en, lang: 'en', fr: p, en: p.en }] : []),
]);

const alternates = (v) =>
  v.en
    ? [
        ['fr', v.fr.path],
        ['en', v.en.path],
        ['x-default', v.fr.path],
      ]
    : [];

// sitemap.xml (avec les versions linguistiques de chaque page)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${VERSIONS.map(
  (v) =>
    `  <url>\n    <loc>${abs(v.path)}</loc>\n${alternates(v)
      .map(([l, h]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(h)}"/>\n`)
      .join('')}    <lastmod>${today}</lastmod>\n  </url>`
).join('\n')}
</urlset>
`;
writeFileSync(join(root, 'sitemap.xml'), sitemap);

// robots.txt
writeFileSync(join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);

// Balises <head> de chaque page (seulement si la page contient les marqueurs SEO)
for (const v of VERSIONS) {
  const file = join(root, v.file);
  let html = readFileSync(file, 'utf8');
  if (!html.includes('<!-- SEO:start -->')) continue;
  const bloc = [
    '<!-- SEO:start -->',
    `<meta name="description" content="${attr(v.description)}">`,
    `<link rel="canonical" href="${abs(v.path)}">`,
    ...alternates(v).map(([l, h]) => `<link rel="alternate" hreflang="${l}" href="${abs(h)}">`),
    '<meta property="og:type" content="website">',
    `<meta property="og:locale" content="${v.lang === 'en' ? 'en_US' : 'fr_FR'}">`,
    ...(v.en ? [`<meta property="og:locale:alternate" content="${v.lang === 'en' ? 'fr_FR' : 'en_US'}">`] : []),
    '<meta property="og:site_name" content="PHB70">',
    `<meta property="og:title" content="${attr(v.title)}">`,
    `<meta property="og:description" content="${attr(v.description)}">`,
    `<meta property="og:url" content="${abs(v.path)}">`,
    `<meta property="og:image" content="${abs(OG_IMAGE)}">`,
    '<!-- SEO:end -->',
  ].join('\n  ');
  html = html
    .replace(/<!-- SEO:start -->[\s\S]*?<!-- SEO:end -->/, bloc)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${attr(v.title)}</title>`);
  writeFileSync(file, html);
}

console.log(`sitemap.xml et robots.txt générés pour ${SITE_URL} (${VERSIONS.length} pages)`);
for (const v of VERSIONS) console.log(`  ${v.path.padEnd(18)} titre ${v.title.length} car. · description ${v.description.length} car.`);
