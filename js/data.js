/* =====================================================================
   DONNÉES DU SITE — modifiez ce fichier avec un éditeur de texte.
   Gardez les guillemets "..." et les virgules.
   ===================================================================== */

const SITE = {
  nom: "Silver Corporate",
  slogan: "Former • Inspirer • Transformer",
  formule: "Des besoins réels aux solutions concrètes.",
  principe: "Moins d'annonces. Plus de réalisations.",
  adresse: "Pointe-Noire, République du Congo",
  logo: "images/logo.png",               // le site essaie aussi .jpg, .jpeg, .webp, .svg
  whatsapp: "242069534092",              // chiffres seulement, avec l'indicatif
  whatsappAffiche: "+242 06 953 40 92",
  email: "silvercorporate.cg@gmail.com",
  // Collez les liens de vos pages. Un lien vide n'est pas affiché.
  reseaux: { facebook: "", linkedin: "", youtube: "", tiktok: "" },
  paiements: ["Mobile Money", "Espèces", "Transfert"]
};

/* ---------- Façons d'écrire un prix ----------
   fixe(500)             -> 500 FCFA
   fixe(300,"page")      -> 300 FCFA/page
   aPartir(1000)         -> À partir de 1 000 FCFA
   fourchette(2000,3000) -> 2 000 à 3 000 FCFA
   devis() | volume() | demande()
   Le 3e paramètre true dans S(...) place le service dans « les plus demandés » (accueil). */
const fixe = (p, u) => ({ type: "fixe", prix: p, unite: u });
const aPartir = p => ({ type: "a_partir", prix: p });
const fourchette = (p, m) => ({ type: "fourchette", prix: p, prix_max: m });
const devis = () => ({ type: "devis" });
const volume = () => ({ type: "volume" });
const demande = () => ({ type: "demande" });
const S = (nom, prix, pop) => Object.assign({ nom, pop: !!pop }, prix);

/* ---------- Catalogue Silver Services (grille 2026) ---------- */
const SERVICES = [
  { nom: "Saisie & mise en forme", icone: "file", services: [
    S("Saisie simple", fixe(300, "page"), true),
    S("Saisie + mise en forme", fixe(500, "page")),
    S("Mise en forme seule", fixe(500, "page")),
    S("Mise en page professionnelle", aPartir(1000)),
    S("Correction de présentation", aPartir(500)),
    S("Numérotation / pagination", aPartir(500))
  ]},
  { nom: "Impression & reprographie", icone: "printer", note: "Tarifs dégressifs possibles pour les commandes en quantité.", services: [
    S("Impression N&B", fixe(50, "page"), true),
    S("Impression couleur", fixe(100, "page")),
    S("Photocopie N&B", fixe(25, "page")),
    S("Scan", fixe(200, "page")),
    S("Scan de plusieurs pages", volume())
  ]},
  { nom: "Documents & PDF", icone: "file", services: [
    S("Conversion Word ↔ PDF", fixe(500)),
    S("Fusion de PDF", fixe(500)),
    S("Compression de PDF", fixe(500)),
    S("Séparation de PDF", fixe(500)),
    S("Extraction de pages PDF", fixe(500)),
    S("Correction de document", aPartir(500)),
    S("Organisation de documents numériques", aPartir(1000))
  ]},
  { nom: "Lettres & documents professionnels", icone: "mail", note: "Les éventuels frais officiels d'une administration ne sont pas inclus.", services: [
    S("Lettre simple", fixe(500)),
    S("Lettre professionnelle", fixe(1000)),
    S("Lettre de motivation", fixe(1000)),
    S("Demande administrative simple", fixe(500)),
    S("Document administratif personnalisé", aPartir(1000)),
    S("Attestation / déclaration — mise en forme", aPartir(500))
  ]},
  { nom: "CV & candidatures", icone: "briefcase", services: [
    S("CV simple", fixe(500), true),
    S("CV avec photo", fixe(700)),
    S("CV professionnel", fixe(1000)),
    S("Lettre de motivation (candidature)", fixe(1000)),
    S("CV + lettre de motivation", fixe(1500)),
    S("Mise à jour d'un CV existant", aPartir(500)),
    S("Conversion CV en PDF", fixe(500))
  ]},
  { nom: "Bureautique", icone: "laptop", services: [
    S("PowerPoint simple", fixe(1000), true),
    S("PowerPoint professionnel", fourchette(2000, 3000)),
    S("Document Excel simple", fixe(1000)),
    S("Tableau Excel complexe", fourchette(2000, 3000)),
    S("Mise en forme d'un tableau Excel", aPartir(1000)),
    S("Rapport / mémoire — mise en forme", aPartir(2000)),
    S("Table des matières automatique", aPartir(1000)),
    S("Mise en forme de rapport / mémoire complet", aPartir(3000))
  ]},
  { nom: "Création graphique", icone: "pencil", services: [
    S("Affiche simple", fixe(2000), true),
    S("Affiche professionnelle", fourchette(3000, 5000)),
    S("Conception de carte de visite", fixe(2000)),
    S("Invitation / carte personnalisée", fixe(2000)),
    S("Flyer simple", fixe(2000)),
    S("Visuel pour réseaux sociaux", fixe(2000)),
    S("Visuel professionnel pour réseaux sociaux", fourchette(3000, 5000)),
    S("Modification d'un visuel existant", aPartir(1000))
  ]},
  { nom: "Finition & présentation", icone: "layers", services: [
    S("Reliure", fourchette(500, 1500)),
    S("Plastification", fourchette(500, 1000)),
    S("Préparation d'un document pour impression", aPartir(500))
  ]},
  { nom: "Services numériques", icone: "laptop", services: [
    S("Assistance informatique simple", aPartir(1000)),
    S("Installation / configuration d'un logiciel", aPartir(1000)),
    S("Organisation de fichiers et dossiers", aPartir(1000)),
    S("Transfert / classement de fichiers", aPartir(500)),
    S("Création d'une adresse e-mail", fixe(500)),
    S("Configuration d'un compte numérique", aPartir(500)),
    S("Assistance pour démarches numériques", aPartir(1000)),
    S("Assistance à l'utilisation d'un outil numérique", aPartir(1000))
  ]},
  { nom: "Services web", icone: "globe", note: "L'hébergement et le nom de domaine sont facturés séparément lorsqu'ils sont nécessaires.", services: [
    S("Création d'une page web simple", aPartir(5000)),
    S("Création d'un site vitrine simple", aPartir(15000), true),
    S("Modification d'un site existant", aPartir(2000)),
    S("Mise à jour de contenu d'un site", aPartir(1000)),
    S("Création d'une page de présentation", aPartir(5000)),
    S("Assistance à la mise en ligne d'un site", aPartir(2000))
  ]},
  { nom: "Outils numériques & IA", icone: "spark", services: [
    S("Assistance à l'utilisation d'un outil d'IA", aPartir(1000)),
    S("Aide à la rédaction avec outils numériques/IA", aPartir(1000)),
    S("Création de prompts simples", aPartir(1000)),
    S("Assistance à l'utilisation d'outils numériques", aPartir(1000)),
    S("Initiation pratique aux outils d'IA", demande())
  ]},
  { nom: "Entrepreneurs & petites entreprises", icone: "trend", services: [
    S("Création d'un document professionnel", aPartir(1000)),
    S("Présentation d'entreprise", aPartir(2000)),
    S("Tableau de suivi simple", aPartir(1500)),
    S("Devis simple — mise en forme", aPartir(500)),
    S("Facture — mise en forme", aPartir(500)),
    S("Modèle de document", aPartir(1000)),
    S("Pack de documents personnalisés", devis())
  ]},
  { nom: "Assistance administrative & numérique", icone: "check", note: "Préparation de documents, classement de fichiers, saisie d'informations, mise en forme, préparation de dossiers, démarches numériques, candidatures, organisation de documents.", services: [
    S("Assistance administrative et numérique (selon la demande)", aPartir(1000))
  ]}
];

/* ---------- Packs ---------- */
const PACKS = [
  { nom: "Pack Étudiant", prix: 2500, contenu: ["Saisie jusqu'à 3 pages", "Mise en forme jusqu'à 2 pages", "Impression N&B jusqu'à 10 pages", "Conversion en PDF"], eco: "Économie indicative : jusqu'à 400 FCFA" },
  { nom: "Pack Candidat", prix: 1500, contenu: ["CV simple", "Lettre simple", "Impression N&B jusqu'à 5 pages", "Conversion en PDF"], eco: "Économie indicative : jusqu'à 250 FCFA" },
  { nom: "Pack Entrepreneur", prix: 4000, contenu: ["Lettre professionnelle", "Affiche simple", "Document Excel simple", "Conversion en PDF"], eco: "Économie indicative : jusqu'à 500 FCFA" },
  { nom: "Pack Document", prix: 2500, contenu: ["Saisie jusqu'à 5 pages", "Mise en forme jusqu'à 3 pages", "Impression N&B jusqu'à 10 pages", "Conversion en PDF"], eco: "Économie indicative : jusqu'à 1 500 FCFA", note: "Valable pour les documents de difficulté normale." },
  { nom: "Pack Petite Entreprise", prix: 5000, contenu: ["Document Excel simple", "Lettre professionnelle", "Affiche simple", "Conception de carte de visite"], eco: "Économie indicative : jusqu'à 1 000 FCFA" },
  { nom: "Pack Numérique", prix: 3000, contenu: ["Création d'une adresse e-mail", "Organisation de fichiers/dossiers", "Assistance à la configuration d'un compte numérique", "Assistance à l'utilisation d'un outil numérique"] },
  { nom: "Pack Visibilité", prix: 5000, contenu: ["1 affiche simple", "2 visuels pour réseaux sociaux", "1 carte de visite", "1 modification après validation"] },
  { nom: "Pack Web Démarrage", prix: 15000, aPartir: true, contenu: ["Site vitrine simple", "Présentation de l'activité", "Nombre de pages défini selon le devis", "Adaptation mobile", "Mise en ligne"], note: "Hébergement et nom de domaine non inclus." }
];

/* ---------- Projets ----------
   Statuts : Idée, Préparation, Expérimentation, En cours, En développement, Validé, Suspendu, Terminé.
   Exemple à copier quand un projet existe réellement :
   { titre:"…", statut:"En cours", categorie:"Numérique", description:"…", objectif:"…", resultats:"", date:"2026-10-01", image:"", lien:"" }, */
const PROJETS = [ 
];

/* ---------- Réalisations (concret et documenté uniquement) ----------
   { titre:"…", contexte:"…", objectif:"…", resultat:"…", impact:"…", temoignage:"", date:"2026-10-01", image:"" }, */
const REALISATIONS = [
];

/* ---------- Actualités ----------
   Catégories : Actualité, Annonce, Projet, Réalisation, Événement, Opportunité, Article, Communiqué.
   Statut "Publié" = visible ; "Brouillon" ou "Archivé" = caché.
   { titre:"…", categorie:"Annonce", statut:"Publié", date:"2026-10-08", auteur:"Silver Corporate", contenu:"Paragraphe 1.\n\nParagraphe 2.", image:"", lien:"" }, */
const ACTUALITES = [
];

/* ---------- Équipe ---------- */
const EQUIPE = [
  { nom: "Beni S. J BAZOUKOULA", fonction: "Fondateur & Coordonnateur général",
    bio: "Définit la vision, oriente la stratégie, coordonne les activités et développe les partenariats de Silver Corporate.",
    competences: "", photo: "", linkedin: "" }
];

/* ---------- Partenaires (partenariats réellement établis uniquement) ----------
   { nom:"…", logo:"", domaine:"…", type:"Technique", description:"…", lien:"" }, */
const PARTENAIRES = [
];

/* ---------- Documents / ressources ----------
   { titre:"…", type:"Document institutionnel", description:"…", date:"2026-10-01", fichier:"documents/presentation.pdf" }, */
const RESSOURCES = [
];