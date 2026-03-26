export interface PointFort {
  name: string;
  description:string;
}

export interface Destination {
  id: number;
  slug: string;
  name: string; 
  parentRegion: string; 
  zone: 'Nord' | 'Sud' | 'Est' | 'Ouest' | 'Centre';
  description: string;
  image: string;
  heroImage:string;
  
  bestTime: string;
  access: string; 
  climat: string; 
  
  bonPlan: string;
  pointsForts: PointFort[];
  
  hotels: { 
    name: string; 
    price: string; 
    stars: number; 
    img: string 
  }[];
  
  restaurants: { 
    name: string; 
    specialite: string; 
    budgetMin: string; 
    budgetMax: string; 
    img: string;
    stars: number;     
  }[];
  
  activites: { 
    title: string; 
    duration: string; 
    type: string; 
    img: string 
  }[];
  
  coords: { lat: number; lng: number };
}

export const destinations: Destination[] = [
  {
    id: 1,
    slug: "nosy-be",
    name: "Nosy Be",
    parentRegion: "Diana",
    zone: "Nord",
    description: "Surnommée l'île aux parfums, Nosy Be est une escale tropicale où l'air embaume l'ylang-ylang. Entre ses archipels satellites aux eaux cristallines et ses couchers de soleil sur le Mont Passot, c'est la destination balnéaire par excellence.",
    image: "/images/destinations/nosybe.jpg",
    heroImage:"/images/destinations/nosy-be1.jpg",
    bestTime: "Mai à Octobre",
    access: "Avion ou Bateau depuis Ankify",
    climat: "Tropical de mousson",
    bonPlan: "Louez une pirogue traditionnelle pour rejoindre Nosy Iranja à l'aube. Vous profiterez du banc de sable blanc avant l'arrivée des vedettes touristiques.",
   pointsForts: [
    {
      name: "Archipel de Nosy Iranja",
      description: "Deux îles reliées par un banc de sable blanc immaculé de 2 km, visible uniquement à marée basse."
    },
    {
      name: "Réserve de Lokobe",
      description: "Une forêt primaire préservée abritant des lémuriens endémiques, des caméléons et une flore tropicale dense."
    },
    {
      name: "Mont Passot",
      description: "Le point culminant de l'île offrant une vue panoramique à 360° sur les lacs sacrés et l'océan Indien."
    },
    {
      name: "Nosy Tanikely",
      description: "Une réserve marine protégée surnommée l'aquarium naturel, idéale pour nager avec les tortues marines."
    }
  ],
    coords: { lat: -13.31, lng: 48.26 },
    hotels: [
      { name: "Andilana Beach Resort", price: "180€", stars: 5, img: "/images/hotels/andilana.jpg" },
      { name: "Ravintsara Wellness Hotel", price: "140€", stars: 4, img: "/images/hotels/ravintsara.jpg" },
      { name: "L'Heure Bleue", price: "95€", stars: 4, img: "/images/hotels/heure-bleue.jpg" }
    ],
    restaurants: [
      { name: "Le Papillon", specialite: "Cuisine Italienne & Fruits de mer", budgetMin: "15€", budgetMax: "40€", img: "/images/restos/papillon.jpg", stars: 5 },
      { name: "Chez Loulou", specialite: "Poissons grillés & Plats locaux", budgetMin: "8€", budgetMax: "20€", img: "/images/restos/loulou.jpg", stars: 4 }
    ],
    activites: [
      { title: "Plongée à Nosy Tanikely", duration: "Demi-journée", type: "Sport", img: "/images/act/plongee.jpg" },
      { title: "Safari Baleines", duration: "3 heures", type: "Nature", img: "/images/act/baleines.jpg" },
      { title: "Tour de l'île en Quad", duration: "Journée", type: "Aventure", img: "/images/act/quad.jpg" },
      
      { title: "Nosy Iranja", duration: "Demi-journée", type: "Nature", img: "/images/act/iranja.jpg" },
      { title: "Réserve de Lokobe", duration: "Demi-journée", type: "Nature",  img: "/images/act/lokobe.jpg"}
    ]
  },
  {
    id: 2,
    slug: "isalo",
    name: "L'Isalo",
    parentRegion: "Ihorombe",
    zone: "Sud",
    description: "Un décor de western au cœur de Madagascar. Ce massif jurassique érodé offre des paysages ruiniformes, des canyons profonds et des piscines naturelles suspendues.",
    image: "/images/destinations/isalo-main.jpg",
    heroImage:"/images/destinations/isalo-bg.jpg",
    bestTime: "Avril à Novembre",
    access: "Route Nationale 7 (RN7)",
    climat: "Semi-aride",
    bonPlan: "Terminez votre journée à la 'Fenêtre de l'Isalo'. Le rocher cadre parfaitement le soleil couchant pour une photo mythique.",
    pointsForts: [
    {
      name: "Piscine Naturelle",
      description: "Une oasis de fougères et de pandanus entourant une eau cristalline au cœur des canyons rocheux."
    },
    {
      name: "Canyon des Singes",
      description: "Une immersion dans une gorge étroite où habitent les lémuriens Catta et Sifaka dans leur habitat sauvage."
    },
    {
      name: "La Fenêtre de l'Isalo",
      description: "Une formation rocheuse sculptée offrant le plus beau coucher de soleil de Madagascar sur la savane."
    },
    {
      name: "Massif de Grès Jurassique",
    description: "Des paysages lunaires sculptés par l'érosion depuis des millions d'années, parfaits pour la photographie."
    }
  ],
    coords: { lat: -22.48, lng: 45.30 },
    hotels: [
      { name: "Isalo Rock Lodge", price: "160€", stars: 4, img: "/images/hotels/rock-lodge.jpg" },
      { name: "Le Jardin du Roy", price: "110€", stars: 3, img: "/images/hotels/jardin-roy.jpg" },
      { name: "Relais de la Reine", price: "105€", stars: 3, img: "/images/hotels/relais-reine.jpg" }
    ],
    restaurants: [
      { name: "La Table d'Aloalo", specialite: "Zébu aux poivres verts", budgetMin: "12€", budgetMax: "30€", img: "/images/restos/aloalo.jpg", stars: 4 },
      { name: "Berny's", specialite: "Cuisine Européenne & Malagasy", budgetMin: "7€", budgetMax: "18€", img: "/images/restos/berny.jpg", stars: 3 }
    ],
    activites: [
      { title: "Randonnée Namaza", duration: "4 heures", type: "Trek", img: "/images/act/namaza.jpg" },
      { title: "Coucher de soleil à la Fenêtre", duration: "1 heure", type: "Photo", img: "/images/act/fenetre.jpg" },
      { title: "Visite de Ranohira", duration: "2 heures", type: "Culture", img: "/images/act/ranohira.jpg" },
      { title: "Piscine Naturelle",duration: "2 heures",type: "Culture", img: "/images/act/piscine.jpg" },
      { title: "Canyon des Singes",duration: "2 heures",type: "Culture", img: "/images/act/canyon.jpg"},
      { title: "Reine de l'Isalo", duration: "2 heures",type: "Culture", img: "/images/act/reine.jpg"}
    ]
  },{
    id: 3,
    slug: "sainte-marie",
    name: "Sainte-Marie",
    parentRegion: "Analanjirofo",
    zone: "Est",
    description: "Une île-jardin aux allures de paradis perdu. Ancienne terre de pirates, Sainte-Marie séduit par ses plages de sable fin, ses forêts luxuriantes et le spectacle annuel des baleines à bosse.",
    image: "/images/destinations/sainte-marie-main.jpg",
    heroImage: "/images/destinations/sainte-marie-bg.jpg",
    bestTime: "Juillet à Septembre (Baleines) ou Octobre à Décembre",
    access: "Avion (Air Madagascar) ou Bateau depuis Mahambo/Soanierana Ivongo",
    climat: "Tropical humide",
    bonPlan: "Louez un vélo ou un scooter pour traverser l'île du Sud au Nord. L'ambiance y est paisible et les rencontres avec les villageois authentiques.",
    pointsForts: [
      {
        name: "L'Île aux Nattes",
        description: "Un petit îlot au sud, accessible en pirogue, sans voitures, offrant les plus beaux lagons turquoise de la région."
      },
      {
        name: "Safari Baleines",
        description: "De juillet à septembre, observez les baleines à bosse qui viennent mettre bas dans les eaux calmes du canal de Sainte-Marie."
      },
      {
        name: "Cimetière des Pirates",
        description: "Un lieu chargé d'histoire dominant la baie de Forbans, où reposent les légendaires flibustiers du XVIIIe siècle."
      },
      {
        name: "Forêt d'Ampanihy",
        description: "Une exploration en pirogue à travers une mangrove intacte pour rejoindre une plage sauvage sur la côte Est."
      }
    ],
    coords: { lat: -16.92, lng: 49.91 },
    hotels: [
      { name: "Princesse Bora Lodge", price: "185€", stars: 4, img: "/images/hotels/bora-lodge.jpg" },
      { name: "Soanambo Hotel", price: "120€", stars: 4, img: "/images/hotels/soanambo.jpg" },
      { name: "Libertalia Hotel", price: "75€", stars: 3, img: "/images/hotels/libertalia.jpg" }
    ],
    restaurants: [
      { name: "Le Samouraï", specialite: "Carpaccio de poisson & Langoustes", budgetMin: "15€", budgetMax: "35€", img: "/images/restos/samourai.jpg", stars: 4 },
      { name: "La Bigorne", specialite: "Punch coco & Fruits de mer", budgetMin: "10€", budgetMax: "22€", img: "/images/restos/bigorne.jpg", stars: 3 }
    ],
    activites: [
      { title: "Sortie Baleines", duration: "3 heures", type: "Nature", img: "/images/act/baleines.jpg" },
      { title: "Pirogue à l'Île aux Nattes", duration: "4 heures", type: "Détente", img: "/images/act/nattes.jpg" },
      { title: "Tour de l'île en Scooter", duration: "6 heures", type: "Aventure", img: "/images/act/scooter.jpg" },
      { title: "Plongée Récif Corallien", duration: "2 heures", type: "Sport", img: "/images/act/plongee.jpg" },
      { title: "Histoire des Pirates", duration: "2 heures", type: "Culture", img: "/images/act/pirates.jpg" },
      { title: "Dégustation Rhum Arrangé", duration: "1 heure", type: "Gastronomie", img: "/images/act/rhum.jpg" }
    ]
  }
];