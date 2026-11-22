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
const PAGES = [
  {
    file: 'index.html',
    path: '/',
    title: 'PHB70 — Mobilier sur mesure pour l’hôtellerie de prestige',
    description:
      'PHB70 conçoit et fait fabriquer du mobilier sur mesure pour hôtels, restaurants et résidences de prestige, de l’étude technique à la livraison.',
  },
  {
    file: 'equipe.html',
    path: '/equipe',
    title: 'Notre équipe — Designers et chefs de projet | PHB70',
    description:
      'Rencontrez l’équipe PHB70 : Philippe Boccara, fondateur, nos chefs de projet et notre architecte d’intérieur, qui suivent votre mobilier sur mesure.',
  },
  {
    file: 'methode.html',
    path: '/methode',
    title: 'Notre méthode : du premier croquis à la livraison | PHB70',
    description:
      'Faisabilité, prototype, production, contrôle et livraison : les quatre étapes de PHB70 pour concevoir et fabriquer votre mobilier sur mesure.',
  },
  {
    file: 'realisations.html',
    path: '/realisations',
    title: 'Réalisations — Hôtels, restaurants et résidences | PHB70',
    description:
      'Feuilletez les réalisations de PHB70 : mobilier sur mesure conçu et fabriqué pour des hôtels, des restaurants et des résidences de prestige.',
  },
  {
    file: 'sur-mesure.html',
    path: '/sur-mesure',
    title: 'Sur mesure : des pièces uniques à vos dimensions | PHB70',
    description:
      'Dimensions, essences de bois, tissus, finitions : découvrez des pièces uniques dessinées et fabriquées par PHB70 selon les envies de chaque client.',
  },
  {
    file: 'contact.html',
    path: '/contact',
    title: 'Contact — Parlons de votre projet de mobilier | PHB70',
    description:
      'Un projet d’hôtel, de restaurant ou de résidence ? Écrivez à PHB70 pour étudier votre mobilier sur mesure. Nous vous répondons sous 48 heures.',
  },
  {
    file: 'mentions-legales.html',
    path: '/mentions-legales',
    title: 'Mentions légales du site PHB70 — Mobilier sur mesure',
    description:
      'Mentions légales du site PHB70 : informations sur l’éditeur, le directeur de la publication, l’hébergeur du site et la propriété intellectuelle des contenus.',
  },
  {
    file: 'confidentialite.html',
    path: '/confidentialite',
    title: 'Politique de confidentialité et données personnelles — PHB70',
    description:
      'Comment PHB70 traite les données personnelles transmises via son site et son formulaire de contact : finalités, destinataires, durées et droits.',
  },
];

// Dossier publié par Cloudflare Pages (Build output directory = public)
const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const today = new Date().toISOString().slice(0, 10);
const abs = (p) => SITE_URL.replace(/\/$/, '') + p;
const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map((p) => `  <url>\n    <loc>${abs(p.path)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
writeFileSync(join(root, 'sitemap.xml'), sitemap);

// robots.txt
writeFileSync(join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);

// Balises <head> de chaque page (seulement si la page contient les marqueurs SEO)
for (const p of PAGES) {
  const file = join(root, p.file);
  let html = readFileSync(file, 'utf8');
  if (!html.includes('<!-- SEO:start -->')) continue;
  const bloc = [
    '<!-- SEO:start -->',
    `<meta name="description" content="${attr(p.description)}">`,
    `<link rel="canonical" href="${abs(p.path)}">`,
    '<meta property="og:type" content="website">',
    '<meta property="og:locale" content="fr_FR">',
    '<meta property="og:site_name" content="PHB70">',
    `<meta property="og:title" content="${attr(p.title)}">`,
    `<meta property="og:description" content="${attr(p.description)}">`,
    `<meta property="og:url" content="${abs(p.path)}">`,
    `<meta property="og:image" content="${abs(OG_IMAGE)}">`,
    '<!-- SEO:end -->',
  ].join('\n  ');
  html = html
    .replace(/<!-- SEO:start -->[\s\S]*?<!-- SEO:end -->/, bloc)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${attr(p.title)}</title>`);
  writeFileSync(file, html);
}

console.log(`sitemap.xml et robots.txt générés pour ${SITE_URL} (${PAGES.length} pages)`);
for (const p of PAGES) console.log(`  ${p.path.padEnd(18)} titre ${p.title.length} car. · description ${p.description.length} car.`);
