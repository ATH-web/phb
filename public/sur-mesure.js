// Page Sur Mesure : pièces personnalisées, présentées en triptyque (la pièce · vue arrière + détail),
// générées à partir de la liste PIECES.
(function () {
  // ===== Liste des pièces (SIMULATION : textes et caractéristiques à remplacer) =====
  // demande, details, caracteristiques, planche, texture, projet : plus affichés pour l'instant (gardés pour plus tard)
  // nuancier : matériaux choisis par le client (pastilles)
  // texte : court paragraphe de présentation
  // en : textes de la version anglaise du site (nom, secteur, légendes du triptyque, noms du nuancier, texte)
  const PIECES = [
    {
      nom: 'Fauteuil Arceau',
      en: {
        nom: 'Arceau Armchair',
        secteur: 'Hospitality',
        legendes: ['The piece', 'Back view', 'The detail'],
        nuancier: ['Ivory nubuck', 'Brushed brass', 'Topstitching thread'],
        texte: 'A frame of brass tubing bent in a single piece, wrapping around the seat and extending into the armrests. Ivory nubuck, double topstitching and rolls held by custom-machined brass rings.',
      },
      projet: 'Projet à confirmer',
      secteur: 'Hôtellerie',
      image: '/assets/sur-mesure/fauteuil-arceau/vue-face.jpg',
      // triptyque : 3 photos — gauche (grande), puis à droite l'une au-dessus de l'autre
      //   les photos sont affichées en entier, sans recadrage
      triptyque: [
        { src: '/assets/sur-mesure/fauteuil-arceau/vue-face.jpg', legende: 'La pièce' },
        { src: '/assets/sur-mesure/fauteuil-arceau/vue-arriere.jpg', legende: 'Vue arrière' },
        { src: '/assets/sur-mesure/fauteuil-arceau/detail.jpg', legende: 'Le détail' },
      ],
      demande: 'Un fauteuil de lounge doux et lumineux, dont la structure devienne un élément de décor.',
      caracteristiques: {
        'Matériaux': 'Tube de laiton, nubuck ivoire',
        'Finitions': 'Laiton brossé satiné, double surpiqûre',
        'Dimensions': 'L 82 × P 78 × H 74 cm',
      },
      planche: '',
      nuancier: [
        { nom: 'Nubuck ivoire', couleur: '#ece6da', texture: 'cuir' },
        { nom: 'Laiton brossé', couleur: '#cdb57c', texture: 'metal' },
        { nom: 'Fil de surpiqûre', couleur: '#d9cfbd', texture: 'tissu' },
      ],
      texte: 'Une structure en tube de laiton cintré d\u2019un seul tenant, qui enveloppe l\u2019assise et se prolonge en accoudoirs. Nubuck ivoire, double surpiqûre et rouleaux fixés par des bagues en laiton usinées sur mesure.',
      details: [
        { x: 36, y: 26, titre: 'Accoudoirs en rouleau', texte: 'Rouleaux en nubuck fixés par une bague en laiton usinée.' },
        { x: 30, y: 62, titre: 'Tube cintré', texte: 'Un seul tube de laiton, cintré sans soudure visible.' },
        { x: 62, y: 52, titre: 'Double surpiqûre', texte: 'Coutures parallèles qui soulignent les volumes de l\u2019assise.' },
        { x: 74, y: 88, titre: 'Patins arrondis', texte: 'Le tube se termine en boucle au sol, sans pied rapporté.' },
      ],
    },
    {
      nom: 'Bibliothèque Orgue',
      en: {
        nom: 'Orgue Bookcase',
        secteur: 'Residential',
        legendes: ['The piece', 'The matching sideboard', 'The detail'],
        nuancier: ['Brushed brass', 'Pearl grey lacquer', 'Brass mesh'],
        texte: 'Clusters of brass tubes, like organ pipes, carry pearl grey lacquered shelves. Boxes of woven brass mesh punctuate the shelving; the sideboard speaks the same language.',
      },
      projet: 'Projet à confirmer',
      secteur: 'Résidentiel',
      image: '/assets/sur-mesure/bibliotheque-orgue/vue-face.jpg',
      triptyque: [
        { src: '/assets/sur-mesure/bibliotheque-orgue/vue-face.jpg', legende: 'La pièce' },
        { src: '/assets/sur-mesure/bibliotheque-orgue/vue-buffet.jpg', legende: 'Le buffet assorti' },
        { src: '/assets/sur-mesure/bibliotheque-orgue/detail.jpg', legende: 'Le détail' },
      ],
      demande: 'Une grande bibliothèque ouverte, légère malgré sa taille, et un buffet assorti pour le même salon.',
      caracteristiques: {
        'Matériaux': 'Tubes de laiton, plateaux laqués, maille de laiton tissée',
        'Finitions': 'Laiton brossé satiné, laque gris perle mate',
        'Dimensions': 'L 240 × P 40 × H 220 cm',
      },
      planche: '',
      nuancier: [
        { nom: 'Laiton brossé', couleur: '#c9b071', texture: 'metal' },
        { nom: 'Laque gris perle', couleur: '#e3e3e0', texture: 'pierre' },
        { nom: 'Maille de laiton', couleur: '#d8c79a', texture: 'tissu' },
      ],
      texte: 'Des faisceaux de tubes en laiton, comme des tuyaux d\u2019orgue, portent des plateaux laqués gris perle. Des caissons en maille de laiton tissée viennent rythmer les étagères ; le buffet reprend le même vocabulaire.',
      details: [
        { x: 17, y: 45, titre: 'Faisceaux de tubes', texte: 'Les montants sont faits de tubes de laiton groupés, sans aucune vis apparente.' },
        { x: 53, y: 43, titre: 'Caissons en maille', texte: 'Maille de laiton tissée, tendue dans un cadre en laiton plié.' },
        { x: 60, y: 20, titre: 'Plateaux laqués', texte: 'Laque gris perle mate, chants fins pour garder la légèreté.' },
        { x: 40, y: 87, titre: 'Socle en laiton', texte: 'Une plaque de laiton brossé qui pose la bibliothèque au sol.' },
      ],
    },
    {
      nom: 'Buffet Envol',
      en: {
        nom: 'Envol Sideboard',
        secteur: 'Residential',
        legendes: ['The piece', 'The handle-leg', 'The detail'],
        nuancier: ['Speckled aubergine lacquer', 'Patinated bronze', 'Black lacquered top'],
        texte: 'A dark case in speckled lacquer, crossed by two bronze gestures. Each handle starts under the top, folds back and runs down to the floor to become the leg: the piece seems to float.',
      },
      projet: 'Projet à confirmer',
      secteur: 'Résidentiel',
      image: '/assets/sur-mesure/buffet-envol/vue-face.jpg',
      triptyque: [
        { src: '/assets/sur-mesure/buffet-envol/vue-face.jpg', legende: 'La pièce' },
        { src: '/assets/sur-mesure/buffet-envol/poignee.jpg', legende: 'La poignée-piètement' },
        { src: '/assets/sur-mesure/buffet-envol/detail.jpg', legende: 'Le détail' },
      ],
      demande: 'Un buffet bas et sombre, presque monolithique, dont les poignées deviennent la signature de la pièce.',
      caracteristiques: {
        'Matériaux': 'Façade laquée moucheté aubergine, bronze sculpté',
        'Finitions': 'Laque profonde mouchetée, bronze patiné satiné',
        'Dimensions': 'L 260 × P 50 × H 70 cm',
      },
      planche: '',
      nuancier: [
        { nom: 'Laque aubergine mouchetée', couleur: '#3a1f26', texture: 'pierre' },
        { nom: 'Bronze patiné', couleur: '#c08a4e', texture: 'metal' },
        { nom: 'Plateau laqué noir', couleur: '#1f1a1c', texture: 'bois' },
      ],
      texte: 'Un caisson sombre en laque mouchetée, traversé par deux gestes en bronze. Chaque poignée naît sous le plateau, se replie et file jusqu’au sol pour devenir le piètement : le meuble semble flotter.',
      details: [
        { x: 34, y: 42, titre: 'Poignée sculptée', texte: 'Bronze modelé à la main, poli puis patiné satiné.' },
        { x: 22, y: 78, titre: 'Piètement effilé', texte: 'La poignée se prolonge jusqu’au sol en une pointe fine.' },
        { x: 70, y: 55, titre: 'Laque mouchetée', texte: 'Fond aubergine profond, moucheté de blanc en dégradés verticaux.' },
      ],
    },
    {
      nom: 'Armoire Sablier',
      en: {
        nom: 'Sablier Wardrobe',
        secteur: 'Residential',
        legendes: ['The piece', 'The detail', 'The legs'],
        nuancier: ['Midnight blue lacquer', 'Sky blue speckle', 'Lavender lacquer sides', 'Patinated bronze'],
        texte: 'Two midnight blue lacquered doors, painted with a pattern of speckled circles and diamonds. The bronze handles cross like an hourglass, then run down to the floor to carry the wardrobe.',
      },
      projet: 'Projet à confirmer',
      secteur: 'Résidentiel',
      image: '/assets/sur-mesure/armoire-sablier/vue-face.jpg',
      triptyque: [
        { src: '/assets/sur-mesure/armoire-sablier/vue-face.jpg', legende: 'La pièce' },
        { src: '/assets/sur-mesure/armoire-sablier/detail.jpg', legende: 'Le détail' },
        { src: '/assets/sur-mesure/armoire-sablier/pieds.jpg', legende: 'Le piètement' },
      ],
      demande: 'Une armoire haute au décor nocturne, assortie au buffet, avec la même signature en bronze.',
      caracteristiques: {
        'Matériaux': 'Façades laquées décor peint, bronze sculpté',
        'Finitions': 'Laque bleu nuit brillante, décor géométrique moucheté, bronze patiné',
        'Dimensions': 'L 120 × P 55 × H 190 cm',
      },
      planche: '',
      nuancier: [
        { nom: 'Laque bleu nuit', couleur: '#1c2c4a', texture: 'pierre' },
        { nom: 'Moucheté bleu ciel', couleur: '#5f8fb5', texture: 'pierre' },
        { nom: 'Laque lavande des flancs', couleur: '#6f74b0', texture: 'bois' },
        { nom: 'Bronze patiné', couleur: '#c2a066', texture: 'metal' },
      ],
      texte: 'Deux portes laquées bleu nuit, peintes d’un décor de cercles et de losanges mouchetés. Les poignées en bronze se croisent en sablier puis filent jusqu’au sol pour porter l’armoire.',
      details: [
        { x: 58, y: 45, titre: 'Poignées en sablier', texte: 'Deux bronzes symétriques qui se rejoignent au centre des portes.' },
        { x: 40, y: 25, titre: 'Décor peint', texte: 'Cercles et losanges mouchetés, peints sous une laque brillante.' },
        { x: 30, y: 94, titre: 'Piètement effilé', texte: 'Le bronze se prolonge jusqu’au sol en une pointe fine.' },
      ],
    },
    {
      nom: 'Table d’appoint Oco',
      en: {
        nom: 'Oco Side Table',
        secteur: 'Restaurants',
        legendes: ['The piece', 'The detail', 'The top'],
        nuancier: ['Solid walnut', 'Solid oak', 'Satin oil'],
        texte: 'A rounded base in solid wood, split by an arched opening, carrying a round top in a single gesture. Available in walnut or oak, with an oiled finish.',
      },
      projet: 'Luteca',
      secteur: 'Restauration',
      image: '/assets/sur-mesure/table-oco/vue-face.jpg',
      triptyque: [
        { src: '/assets/sur-mesure/table-oco/vue-face.jpg', legende: 'La pièce' },
        { src: '/assets/sur-mesure/table-oco/detail.jpg', legende: 'Le détail' },
        { src: '/assets/sur-mesure/table-oco/plateau.jpg', legende: 'Le plateau' },
      ],
      demande: 'Une petite table d’appoint en bois massif, sculpturale mais simple, déclinée en noyer et en chêne.',
      caracteristiques: {
        'Matériaux': 'Noyer massif ou chêne massif',
        'Finitions': 'Huile naturelle satinée, chants adoucis',
        'Dimensions': 'Ø 50 × H 55 cm',
      },
      planche: '',
      nuancier: [
        { nom: 'Noyer massif', couleur: '#6b3a24', texture: 'bois' },
        { nom: 'Chêne massif', couleur: '#b5763e', texture: 'bois' },
        { nom: 'Huile satinée', couleur: '#c99a68', texture: 'cuir' },
      ],
      texte: 'Un fût arrondi en bois massif, fendu d’une ouverture en arche, qui porte un plateau rond d’un seul geste. Proposée en noyer ou en chêne, finition huilée.',
      details: [
        { x: 50, y: 28, titre: 'Plateau rond', texte: 'Bois massif aux fils assortis, chant fin et adouci.' },
        { x: 48, y: 60, titre: 'Fente en arche', texte: 'Une ouverture creusée dans le fût, qui allège la silhouette.' },
        { x: 66, y: 50, titre: 'Fût sculpté', texte: 'Volume arrondi en bois massif, veinage vertical continu.' },
      ],
    },
    {
      nom: 'Chaise Terracotta', // NOM À CONFIRMER
      en: {
        nom: 'Terracotta Chair',
        secteur: 'Restaurants',
        legendes: ['The piece', 'Back view', 'The detail'],
        nuancier: ['Terracotta velvet', 'Matt black lacquer', 'Tone-on-tone piping'],
        texte: 'A high back with cut-away wings that embraces without enclosing, upholstered in terracotta velvet and outlined with piping. Fluted sabre legs in black lacquer, with carved blocks at the corners of the seat rail.',
      },
      projet: 'Projet à confirmer',
      secteur: 'Restauration', // À CONFIRMER
      image: '/assets/sur-mesure/chaise-terracotta/vue-face.jpg',
      triptyque: [
        { src: '/assets/sur-mesure/chaise-terracotta/vue-face.jpg', legende: 'La pièce' },
        { src: '/assets/sur-mesure/chaise-terracotta/vue-arriere.jpg', legende: 'Vue arrière' },
        { src: '/assets/sur-mesure/chaise-terracotta/detail.jpg', legende: 'Le détail' },
      ],
      demande: 'Une chaise de salle enveloppante, en velours chaud, avec un piètement qui rappelle le mobilier classique.',
      caracteristiques: {
        'Matériaux': 'Hêtre massif, velours',
        'Finitions': 'Laque noire mate, passepoil ton sur ton',
        'Dimensions': 'À confirmer',
      },
      planche: '',
      nuancier: [
        { nom: 'Velours terracotta', couleur: '#b5644a', texture: 'tissu' },
        { nom: 'Laque noire mate', couleur: '#1d1b1a', texture: 'bois' },
        { nom: 'Passepoil ton sur ton', couleur: '#a8573f', texture: 'cuir' },
      ],
      texte: 'Un dossier haut aux oreilles échancrées qui enveloppe sans enfermer, habillé de velours terracotta et souligné d\u2019un passepoil. Pieds sabre cannelés en laque noire, ceinture marquée de dés sculptés aux angles.',
      details: [
        { x: 50, y: 25, titre: 'Dossier échancré', texte: 'Oreilles creusées en arc, pour un maintien sans lourdeur.' },
        { x: 50, y: 58, titre: 'Passepoil', texte: 'Un fin cordon ton sur ton qui dessine chaque volume.' },
        { x: 40, y: 85, titre: 'Pieds cannelés', texte: 'Pieds sabre cannelés, dés sculptés aux angles de la ceinture.' },
      ],
    },
    {
      nom: 'Table Colonnes',
      projet: 'Luteca',
      secteur: 'Restauration',
      image: '/assets/realisations/luteca/03.jpg',
      demande: 'Une grande table d’hôtes qui rappelle les colonnes du lieu, assez longue pour dix couverts.',
      caracteristiques: {
        'Matériaux': 'Chêne massif',
        'Finitions': 'Huile naturelle mate, arêtes adoucies',
        'Dimensions': 'L 320 × P 110 × H 75 cm',
      },
      planche: '', // photo de la vraie planche matériaux (sinon une planche est dessinée à partir du nuancier)
      nuancier: [
        { nom: 'Chêne massif', couleur: '#b98a5a', texture: 'bois' },
        { nom: 'Huile naturelle mate', couleur: '#d9c3a1', texture: 'cuir' },
        { nom: 'Lin de nappe', couleur: '#e4dccd', texture: 'tissu' },
        { nom: 'Pierre du sol', couleur: '#cfc6b6', texture: 'pierre' },
      ],
      texte: 'Pour Luteca, une table d\u2019hôtes de dix couverts qui reprend les colonnes de la salle. Chêne massif huilé, pour un plateau qui se répare sur place.',
      details: [
        { x: 50, y: 25, titre: 'Plateau d’un seul tenant', texte: 'Lames de chêne sélectionnées pour un veinage continu sur toute la longueur.' },
        { x: 40, y: 62, titre: 'Piétement en colonnes', texte: 'Trois fûts tournés, dessinés d’après les colonnes de la salle.' },
        { x: 64, y: 56, titre: 'Cannelures creusées', texte: 'Rainures profondes taillées à la main dans chaque colonne.' },
      ],
    },
    {
      nom: 'Fauteuil Compas',
      projet: 'Luteca',
      secteur: 'Restauration',
      image: '/assets/realisations/luteca/05.jpg',
      demande: 'Un fauteuil de salle confortable, léger à déplacer, dans le rose poudré de la charte du restaurant.',
      caracteristiques: {
        'Matériaux': 'Noyer massif, velours de coton',
        'Finitions': 'Vernis satiné, passepoil ton sur ton',
        'Dimensions': 'L 58 × P 55 × H 82 cm',
      },
      planche: '', // photo de la vraie planche matériaux (sinon une planche est dessinée à partir du nuancier)
      nuancier: [
        { nom: 'Noyer massif', couleur: '#5b3b29', texture: 'bois' },
        { nom: 'Velours rose poudré', couleur: '#d98a85', texture: 'tissu' },
        { nom: 'Vernis satiné', couleur: '#8a5f45', texture: 'metal' },
        { nom: 'Passepoil ton sur ton', couleur: '#c77570', texture: 'cuir' },
      ],
      texte: 'Un fauteuil léger, pensé pour des repas qui durent. Structure en noyer affinée et velours teint au rose de la charte du restaurant.',
      details: [
        { x: 64, y: 20, titre: 'Dossier galbé', texte: 'Courbe ajustée pour un maintien confortable pendant tout le repas.' },
        { x: 26, y: 30, titre: 'Accoudoirs en compas', texte: 'Assemblage du bois visible, qui donne son nom au fauteuil.' },
        { x: 62, y: 44, titre: 'Velours sur mesure', texte: 'Teinte choisie avec le client parmi plus de quarante échantillons.' },
        { x: 30, y: 72, titre: 'Pieds fuselés', texte: 'Noyer massif, affiné vers le sol pour alléger la silhouette.' },
      ],
    },
    {
      nom: 'Banquette Soleil',
      projet: 'Le mobilier',
      secteur: 'Restauration',
      image: '/assets/realisations/projet-4/03.jpg',
      demande: 'Des sièges enveloppants qui apportent de la couleur et de la chaleur à une salle très minérale.',
      caracteristiques: {
        'Matériaux': 'Structure hêtre, mousse haute résilience, velours',
        'Finitions': 'Coque extérieure en tissu bouclé, piqûres ton sur ton',
        'Dimensions': 'L 70 × P 68 × H 78 cm',
      },
      planche: '', // photo de la vraie planche matériaux (sinon une planche est dessinée à partir du nuancier)
      nuancier: [
        { nom: 'Velours moutarde', couleur: '#c9940f', texture: 'tissu' },
        { nom: 'Bouclé grège', couleur: '#b9ada0', texture: 'tissu' },
        { nom: 'Palissandre verni', couleur: '#5a2f1d', texture: 'bois' },
        { nom: 'Laiton', couleur: '#c2a160', texture: 'metal' },
        { nom: 'Marbre du sol', couleur: '#e3ddd2', texture: 'pierre' },
      ],
      texte: 'Des assises enveloppantes pour réchauffer une salle très minérale : velours moutarde à l\u2019intérieur, bouclé grège au dos pour absorber le bruit.',
      details: [
        { x: 24, y: 75, titre: 'Velours moutarde', texte: 'Tissu traité anti-taches, adapté à un usage intensif en restauration.' },
        { x: 40, y: 28, titre: 'Coque enveloppante', texte: 'Dos arrondi habillé d’un tissu bouclé contrasté.' },
        { x: 82, y: 90, titre: 'Table assortie', texte: 'Plateau en palissandre verni, dessiné dans la même collection.' },
      ],
    },
    {
      nom: 'Commode Mosaïque',
      projet: 'Projet 3',
      secteur: 'Hôtellerie',
      image: '/assets/realisations/maison-heller/02.jpg',
      demande: 'Un meuble de rangement qui devienne la pièce forte de la suite, avec une façade travaillée comme une sculpture.',
      caracteristiques: {
        'Matériaux': 'Chêne massif et placage chêne',
        'Finitions': 'Teinte fumée, cire, façade en relief',
        'Dimensions': 'L 180 × P 50 × H 80 cm',
      },
      planche: '', // photo de la vraie planche matériaux (sinon une planche est dessinée à partir du nuancier)
      nuancier: [
        { nom: 'Chêne fumé', couleur: '#7a5638', texture: 'bois' },
        { nom: 'Cire satinée', couleur: '#a77e57', texture: 'cuir' },
        { nom: 'Vert sauge des murs', couleur: '#7f8a6a', texture: 'tissu' },
        { nom: 'Laiton patiné', couleur: '#a8884f', texture: 'metal' },
      ],
      texte: 'La pièce forte de la suite. Une façade en relief, bloc par bloc, en chêne fumé pour se détacher des murs vert sauge.',
      details: [
        { x: 40, y: 75, titre: 'Façade en relief', texte: 'Blocs de bois de différentes épaisseurs, assemblés un par un.' },
        { x: 30, y: 62, titre: 'Plateau débordant', texte: 'Léger débord pour souligner la ligne horizontale du meuble.' },
        { x: 52, y: 86, titre: 'Ouverture sans poignée', texte: 'Portes à pousser pour garder la façade intacte.' },
      ],
    },
    {
      nom: 'Tête de lit Palissandre',
      projet: 'Projet 3',
      secteur: 'Hôtellerie',
      image: '/assets/realisations/maison-heller/03.jpg',
      demande: 'Une tête de lit chaleureuse qui intègre l’éclairage et les chevets, sans un seul fil apparent.',
      caracteristiques: {
        'Matériaux': 'Placage palissandre, cuir pleine fleur, laiton',
        'Finitions': 'Vernis brillant, cuir surpiqué',
        'Dimensions': 'L 360 × H 130 cm',
      },
      planche: '', // photo de la vraie planche matériaux (sinon une planche est dessinée à partir du nuancier)
      nuancier: [
        { nom: 'Palissandre', couleur: '#4a2418', texture: 'bois' },
        { nom: 'Cuir cognac', couleur: '#a2582c', texture: 'cuir' },
        { nom: 'Laiton brossé', couleur: '#c2a160', texture: 'metal' },
        { nom: 'Lin blanc', couleur: '#ece7de', texture: 'tissu' },
        { nom: 'Pierre des chevets', couleur: '#d8d2c6', texture: 'pierre' },
      ],
      texte: 'Une tête de lit qui intègre liseuses et chevets sans un fil apparent. Palissandre, cuir cognac surpiqué et laiton brossé.',
      details: [
        { x: 74, y: 28, titre: 'Bandeau en cuir', texte: 'Cuir pleine fleur surpiqué, tendu sur un panneau rembourré.' },
        { x: 10, y: 36, titre: 'Panneaux palissandre', texte: 'Placage assorti en miroir pour un dessin symétrique.' },
        { x: 19, y: 41, titre: 'Applique intégrée', texte: 'Liseuse en laiton, câblage caché dans l’épaisseur du panneau.' },
      ],
    },
    {
      nom: 'Bar Travertin',
      projet: 'VF Architecture',
      secteur: 'Immobilier de prestige',
      image: '/assets/realisations/vf-architecture/13.jpg',
      demande: 'Un bar de réception pour une villa, monolithique, mis en valeur par la lumière.',
      caracteristiques: {
        'Matériaux': 'Travertin, onyx rétroéclairé, acier noirci',
        'Finitions': 'Pierre adoucie, éclairage LED intégré',
        'Dimensions': 'L 240 × P 70 × H 110 cm',
      },
      planche: '', // photo de la vraie planche matériaux (sinon une planche est dessinée à partir du nuancier)
      nuancier: [
        { nom: 'Travertin adouci', couleur: '#d6cbb8', texture: 'pierre' },
        { nom: 'Onyx miel', couleur: '#e9d6b9', texture: 'marbre' },
        { nom: 'Acier noirci', couleur: '#2b2b2b', texture: 'metal' },
        { nom: 'Chêne clair', couleur: '#c9a77c', texture: 'bois' },
      ],
      texte: 'Un bar de réception monolithique en travertin, devant un mur d\u2019onyx rétroéclairé. La lumière le fait exister jour et nuit.',
      details: [
        { x: 48, y: 68, titre: 'Comptoir cintré', texte: 'Travertin taillé en courbe, joints presque invisibles.' },
        { x: 62, y: 22, titre: 'Fond en onyx', texte: 'Plaques d’onyx rétroéclairées, choisies avec le client en carrière.' },
        { x: 50, y: 90, titre: 'Socle lumineux', texte: 'Ruban LED caché sous le comptoir : le bar semble flotter.' },
      ],
    },
  ];

  // Version anglaise du site (/en/) : on remplace les textes par ceux du champ "en"
  const EN = document.documentElement.lang === 'en';
  if (EN) {
    PIECES.forEach((p) => {
      if (!p.en) return;
      p.nom = p.en.nom;
      p.secteur = p.en.secteur;
      p.texte = p.en.texte;
      (p.triptyque || []).forEach((t, i) => { t.legende = p.en.legendes[i]; });
      p.nuancier.forEach((n, i) => { n.nom = p.en.nuancier[i]; });
    });
  }

  const esc = (str) => String(str).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const num = (i) => String(i + 1).padStart(2, '0');

  // Pastilles des matériaux
  const swatchesHTML = (p) => `
    <ul class="sm-swatches" aria-label="${EN ? 'Selected materials' : 'Matériaux choisis'}">
      ${p.nuancier.map((n) => `<li><span class="sm-swatches__chip" style="background:${esc(n.couleur)}"></span>${esc(n.nom)}</li>`).join('')}
    </ul>`;

  // ===== Triptyque (la pièce · vue arrière + détail empilés) =====
  // Seules les pièces qui ont un "triptyque" apparaissent ici.
  const triptyques = document.getElementById('view-triptyque');
  const tripFig = (p, t) => `
          <figure class="sm-trip__fig">
            <img src="${esc(t.src)}" alt="${esc(p.nom)}${EN ? ': ' : ' : '}${esc(t.legende)}" loading="lazy">
          </figure>`;
  triptyques.innerHTML = PIECES.filter((p) => p.triptyque).map((p) => {
    const i = PIECES.indexOf(p);
    return `
    <article class="sm-trip">
      <div class="sm-trip__images">
        ${tripFig(p, p.triptyque[0])}
        <div class="sm-trip__col">
          ${p.triptyque.slice(1).map((t) => tripFig(p, t)).join('')}
        </div>
      </div>
      <div class="sm-trip__text">
        <div>
          <p class="sm-eyebrow">${EN ? 'Piece' : 'Pièce'} ${num(i)} · ${esc(p.secteur)}</p>
          <h2 class="sm-title">${esc(p.nom)}</h2>
        </div>
        <div>
          <p class="sm-case__text">${esc(p.texte)}</p>
          ${swatchesHTML(p)}
        </div>
      </div>
    </article>`;
  }).join('');

  // Largeur des colonnes calculée d'après le format des photos, pour que la photo
  // de gauche ait exactement la même hauteur que les deux photos de droite empilées.
  function fitTrip(article) {
    const imgs = article.querySelectorAll('.sm-trip__images img');
    const box = article.querySelector('.sm-trip__images');
    if (imgs.length !== 3 || [...imgs].some((im) => !im.naturalWidth)) return;
    const col = article.querySelector('.sm-trip__col');
    const [a, b, c] = [...imgs].map((im) => im.naturalWidth / im.naturalHeight);
    // Mobile : les deux petites photos côte à côte, à la même hauteur
    if (window.matchMedia('(max-width: 900px)').matches) {
      box.style.gridTemplateColumns = '';
      col.style.gridTemplateColumns = `${b}fr ${c}fr`;
      return;
    }
    col.style.gridTemplateColumns = '';
    const gap = parseFloat(getComputedStyle(box).columnGap) || 0;
    const total = box.clientWidth;
    if (!total) return;
    const right = (total - gap - a * gap) / (a * (1 / b + 1 / c) + 1);
    box.style.gridTemplateColumns = `${total - gap - right}px ${right}px`;
  }
  triptyques.querySelectorAll('.sm-trip').forEach((article) => {
    article.querySelectorAll('img').forEach((im) => {
      if (!im.complete) im.addEventListener('load', () => fitTrip(article));
    });
    fitTrip(article);
  });
  window.addEventListener('resize', () => triptyques.querySelectorAll('.sm-trip').forEach(fitTrip));

})();
