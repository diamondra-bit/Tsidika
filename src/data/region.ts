export interface PointFort {
  name: string;
  img: string;
  tag: string;
}

export interface Region {
  id: number;
  slug: string;
  name: string;
  chefLieu: string;
  zone: 'Nord' | 'Sud' | 'Est' | 'Ouest' | 'Centre';
  description: string;
  image: string;
  superficie: string;
  population: string;
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

export const regions: Region[] = [
  {
    id: 1,
    slug: "diana",
    name: "Diana",
    chefLieu: "Antsiranana",
    zone: "Nord",
    description: "Nichée à l'extrême nord de la Grande Île, la région Diana est un sanctuaire de biodiversité unique au monde. Entre ses baies majestueuses, ses forêts d'émeraude et ses formations géologiques rouges sang, elle offre une aventure sensorielle incomparable pour les voyageurs en quête d'authenticité.",
    image: "/images/regions/diana-main.jpg",
    superficie: "19 266 km²",
    population: "880 000 hab.",
    climat: "Tropical sec",
    bonPlan: "Privilégiez un départ à 5h du matin pour les Tsingy Rouges. La lumière rasante sur la latérite crée un spectacle irréel que vous ne verrez nulle part ailleurs.",
    pointsForts: [
      { name: "Mer d'Émeraude", img: "/images/pts/emeraude.jpg", tag: "Lagon" },
      { name: "Montagne d'Ambre", img: "/images/pts/ambre.jpg", tag: "Parc National" },
      { name: "Tsingy Rouges", img: "/images/pts/tsingy.jpg", tag: "Géologie" }
    ],
    hotels: [
      { name: "Nature Lodge", price: "85€ / nuit", stars: 4, img: "/images/hotels/nature.jpg" },
      { name: "Mantasoa Lodge", price: "110€ / nuit", stars: 4, img: "/images/hotels/mantasoa.jpg" },
      { name: "Grand Hôtel", price: "70€ / nuit", stars: 3, img: "/images/hotels/grand-hotel.jpg" }
    ],
    restaurants: [
      { 
        name: "Le Melville", 
        specialite: "Carpaccio de poisson & Langoustes", 
        budgetMin: "80€", 
        budgetMax: "150€", 
        img: "/images/restos/melville.jpg",
        stars: 5 
      },
      { 
        name: "La Jonque", 
        specialite: "Cuisine fusion sino-malgache", 
        budgetMin: "40€", 
        budgetMax: "80€", 
        img: "/images/restos/jonque.jpg",
        stars: 4 
      },
      { 
        name: "L'Ancre Bleue", 
        specialite: "Grillades de mer", 
        budgetMin: "25€", 
        budgetMax: "50€", 
        img: "/images/restos/ancre.jpg",
        stars: 3 
      }
    ],
    activites: [
      { title: "Kitesurf à Sakalava", duration: "Demi-journée", type: "Sport", img: "/images/act/kite.jpg" },
      { title: "Safari Lémuriens", duration: "4 heures", type: "Nature", img: "/images/act/lemur.jpg" },
      { title: "Dhow au coucher du soleil", duration: "2 heures", type: "Romantique", img: "/images/act/dhow.jpg" },
      { title: "Baie de Mahajamba", duration: "2 heures", type: "Romantique", img: "/images/act/dhow.jpg" }
    ],
    coords: { lat: -12.27, lng: 49.28 }
  },
  {
    id: 2,
    slug: "sava",
    name: "SAVA",
    chefLieu: "Antsiranana",
    zone: "Nord",
    description: "Réputée pour ses plantations de vanille et ses paysages luxuriants, la SAVA est le cœur vert de Madagascar.",
    image: "/images/regions/diana-main.jpg",
    superficie: "25 518 km²",
    population: "1 123 000 hab.",
    climat: "Tropical humide",
    bonPlan: "Visitez les ateliers de préparation de vanille à Sambava pour découvrir les secrets de l'or noir malgache.",
    pointsForts: [
      { name: "Masoala", img: "/images/pts/emeraude.jpg", tag: "Parc National" },
      { name: "Chutes d'eau", img: "/images/pts/ambre.jpg", tag: "Nature" },
      { name: "Vanille", img: "/images/pts/tsingy.jpg", tag: "Culture" }
    ],
    hotels: [
      { name: "Nature Lodge", price: "85€ / nuit", stars: 4, img: "/images/hotels/nature.jpg" }
    ],
    restaurants: [
      { 
        name: "Le Melville", 
        specialite: "Carpaccio de poisson & Langoustes", 
        budgetMin: "80€", 
        budgetMax: "150€", 
        img: "/images/restos/melville.jpg",
        stars: 5 
      }
    ],
    activites: [
      { title: "Kitesurf à Sakalava", duration: "Demi-journée", type: "Sport", img: "/images/act/kite.jpg" }
    ],
    coords: { lat: -12.27, lng: 49.28 }
  },
];