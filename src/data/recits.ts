export interface Recit {
  id: number;
  title: string;
  slug: string;
  regionName: string;
  author: string;
  date: string;
  category: "Aventure" | "Culture" | "Rencontre";
  excerpt: string;
  content: string; // Tu pourras plus tard utiliser du Markdown ici
  coverImage: string;
  readingTime: string;
}
export const recits: Recit[] = [
  {
    id: 1,
    title: "Le réveil des géants : Une nuit dans l'Allée des Baobabs",
    slug: "nuit-allee-baobabs",
    regionName: "Menabe",
    author: "Tsidika Team",
    date: "12 Mars 2026",
    category: "Aventure",
    excerpt: "Le soleil disparaît, les silhouettes s'étirent. Récit d'une immersion au cœur du Menabe où le temps semble s'être arrêté.",
    content: "Le contenu long ici...",
    coverImage: "/recits/baobab-night.jpg",
    readingTime: "5 min"
  },
  {
    id: 2,
    title: "Sainte-Marie : Sur la piste des chants des baleines",
    slug: "chants-baleines-sainte-marie",
    regionName: "Analanjirofo",
    author: "Tsidika Team",
    date: "15 Juillet 2025",
    category: "Aventure",
    excerpt: "Chaque année, les baleines à bosse transforment les eaux cristallines de l'Est en un théâtre naturel époustouflant.",
    content: "Au large de l'île boraha, le silence est rompu par le souffle puissant des cétacés...",
    coverImage: "/recits/baleine.jpg",
    readingTime: "7 min"
  },
  {
    id: 3,
    title: "Zafimaniry : Le secret des sculpteurs de brume",
    slug: "zafimaniry-sculpteurs-brume",
    regionName: "Amoron'i Mania",
    author: "Tsidika Team",
    date: "05 Janvier 2026",
    category: "Culture",
    excerpt: "Une marche de plusieurs heures dans les montagnes pour découvrir l'art de vivre d'un peuple dont le bois raconte l'histoire.",
    content: "Derrière les rideaux de pluie et de brume des Hautes Terres se cachent des villages où aucune charpente n'utilise de clou...",
    coverImage: "/recits/zafimaniry.jpg",
    readingTime: "6 min"
  },
  {
    id: 4,
    title: "Le souffle de l'Ankarana : Traversée des Tsingy",
    slug: "traversee-tsingy-ankarana",
    regionName: "Diana",
    author: "Tsidika Team",
    date: "22 Octobre 2025",
    category: "Aventure",
    excerpt: "Marcher sur des lames de rasoir calcaires. Une expédition physique au milieu d'une forteresse minérale unique au monde.",
    content: "Le calcaire chante sous nos chaussures de randonnée. Ici, la nature a sculpté des lances de pierre qui protègent une faune endémique...",
    coverImage: "/recits/ankarana.jpg",
    readingTime: "8 min"
  },
  {
    id: 5,
    title: "Voix de demain : À la rencontre de la jeunesse d'Antananarivo",
    slug: "voix-demain-tana",
    regionName: "Analamanga",
    author: "Tsidika Team",
    date: "10 Février 2026",
    category: "Rencontre",
    excerpt: "Entre les collines de la capitale, nous avons écouté ceux qui dessinent le futur de la Grande Île. Portraits croisés.",
    content: "Dans l'effervescence d'Analakely ou le calme de la Haute-Ville, les jeunes Malgaches partagent leurs rêves de changement...",
    coverImage: "/recits/jeunesse-tana.jpg",
    readingTime: "4 min"
  }
];