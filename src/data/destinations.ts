export interface PointFort {
  name: string;
  img: string;
  tag: string;
}

export interface PointFort {
  name: string;
  img: string;
  tag: string;
}

export interface Destination {
  id: number;
  slug: string;
  name: string; 
  parentRegion: string; 
  zone: 'Nord' | 'Sud' | 'Est' | 'Ouest' | 'Centre';
  description: string;
  image: string;
  
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
    bestTime: "Mai à Octobre",
    access: "Avion ou Bateau depuis Ankify",
    climat: "Tropical de mousson",
    bonPlan: "Louez une pirogue traditionnelle pour rejoindre Nosy Iranja à l'aube. Vous profiterez du banc de sable blanc avant l'arrivée des vedettes touristiques.",
    pointsForts: [
      { name: "Nosy Iranja", img: "/images/pts/iranja.jpg", tag: "Lagon" },
      { name: "Réserve de Lokobe", img: "/images/pts/lokobe.jpg", tag: "Faune" },
      { name: "Mont Passot", img: "/images/pts/passot.jpg", tag: "Panorama" }
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
      { title: "Tour de l'île en Quad", duration: "Journée", type: "Aventure", img: "/images/act/quad.jpg" }
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
    bestTime: "Avril à Novembre",
    access: "Route Nationale 7 (RN7)",
    climat: "Semi-aride",
    bonPlan: "Terminez votre journée à la 'Fenêtre de l'Isalo'. Le rocher cadre parfaitement le soleil couchant pour une photo mythique.",
    pointsForts: [
      { name: "Piscine Naturelle", img: "/images/pts/piscine.jpg", tag: "Baignade" },
      { name: "Canyon des Singes", img: "/images/pts/canyon.jpg", tag: "Trek" },
      { name: "Reine de l'Isalo", img: "/images/pts/reine.jpg", tag: "Rocher" }
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
      { title: "Visite de Ranohira", duration: "2 heures", type: "Culture", img: "/images/act/ranohira.jpg" }
    ]
  }
];