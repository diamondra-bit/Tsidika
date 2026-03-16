export interface PointInteret {
  name: string;
  tag: string;
  img: string;
}

export interface Region {
  id: number;
  name: string;
  slug: string;
  zone: string;
  image: string;
  description: string;
  chefLieu: string;
  superficie: string;
  population: string;
  climat: string;
  bonPlan: string;
  pointsForts: PointInteret[];
  gastronomie: {
    title: string;
    description: string;
    items: string[];
    image: string;
  };
}

export const regions: Region[] = [
  // --- NORD ---
  { 
    id: 1, 
    name: "Diana", 
    zone: "Nord", 
    slug: "diana", 
    image: "/regions/diana.jpg", 
    chefLieu: "Antsiranana", 
    superficie: "19 266 km²",
    population: "889 736 hab.",
    climat: "Tropical sec",
    description: "Le point culminant du Nord, abritant Nosy Be et les baies de Diego Suarez. Une terre d'aventure entre mer d'émeraude et montagnes sacrées.",
    pointsForts: [
      { name: "Nosy Be", tag: "PLAGE & DÉTENTE", img: "/TopDestination/nosybe.jpg" },
      { name: "Mer d'Émeraude", tag: "EAU CRISTALLINE", img: "/TopDestination/diego.jpg" },
      { name: "Tsingy Rouges", tag: "AVENTURE", img: "/TopDestination/tsingy.jpg" }
    ],
    bonPlan: "Visitez les Tsingy Rouges en milieu d'après-midi pour capter la lumière dorée sur la latérite.",
    gastronomie: {
      title: "L'Or Brun & Saveurs Marines",
      description: "Entre mer et montagne, la région Diana abrite des plantations séculaires de cacao et de vanille.",
      items: ["Cacao d'Ambanja", "Poisson au coco", "Punch au rhum"],
      image: "/culture/gastronomie-diana.jpg"
    }
  },
  { 
    id: 2, 
    name: "Sava", 
    zone: "Nord", 
    slug: "sava", 
    image: "/regions/sava.jpg", 
    chefLieu: "Sambava", 
    superficie: "25 518 km²",
    population: "1 123 013 hab.",
    climat: "Tropical humide",
    description: "La capitale mondiale de la vanille. Cette région verdoyante abrite les parcs luxuriants de Marojejy et de Masoala.",
    pointsForts: [
      { name: "Marojejy", tag: "RANDONNÉE", img: "/TopDestination/masoala.jpg" },
      { name: "Antalaha", tag: "CULTURE", img: "/TopDestination/vanille.jpg" },
      { name: "Parc Masoala", tag: "BIODIVERSITÉ", img: "/TopDestination/masoala.jpg" }
    ],
    bonPlan: "Achetez votre vanille directement auprès des coopératives à Antalaha pour une qualité inégalée.",
    gastronomie: {
      title: "Le Parfum de la Vanille",
      description: "La SAVA intègre l'or noir dans sa cuisine, créant des saveurs douces et boisées uniques au monde.",
      items: ["Poulet à la vanille", "Café de forêt", "Fruits tropicaux"],
      image: "/culture/gastronomie-sava.jpg"
    }
  },

  // --- OUEST ---
  { 
    id: 3, 
    name: "Boeny", 
    zone: "Ouest", 
    slug: "boeny", 
    image: "/regions/boeny.jpg", 
    chefLieu: "Mahajanga", 
    superficie: "31 046 km²",
    population: "931 171 hab.",
    climat: "Chaud et sec",
    description: "La cité des fleurs. Une région accueillante célèbre pour son bord de mer animé et son baobab géant millénaire.",
    pointsForts: [
      { name: "Cirque Rouge", tag: "PAYSAGE", img: "/TopDestination/tsingy.jpg" },
      { name: "Anjohibe", tag: "GROTTES", img: "/TopDestination/ankarana.jpg" },
      { name: "Parc d'Ankarafantsika", tag: "FAUNE", img: "/TopDestination/lemurien1.jpg" }
    ],
    bonPlan: "Ne manquez pas de manger des brochettes sur 'le Bord' au coucher du soleil.",
    gastronomie: {
      title: "Grillades & Bord de Mer",
      description: "L'art de vivre à Mahajanga se résume à ses soirées gourmandes face au Canal du Mozambique.",
      items: ["Masikita (brochettes)", "Mokary", "Jus de baobab"],
      image: "/culture/gastronomie-boeny.jpg"
    }
  },
  { 
    id: 4, 
    name: "Menabe", 
    zone: "Ouest", 
    slug: "menabe", 
    image: "/regions/menabe.jpg", 
    chefLieu: "Morondava", 
    superficie: "46 121 km²",
    population: "700 577 hab.",
    climat: "Aride",
    description: "Terre de l'emblématique Allée des Baobabs. Une région sauvage où les forêts sèches rencontrent la mer.",
    pointsForts: [
      { name: "Allée des Baobabs", tag: "ICÔNE", img: "/TopDestination/baobab1.jpg" },
      { name: "Forêt de Kirindy", tag: "NATURE", img: "/TopDestination/lemurien1.jpg" },
      { name: "Belo-sur-Mer", tag: "BOUTRES", img: "/TopDestination/iranja.jpg" }
    ],
    bonPlan: "L'Allée des Baobabs est plus spectaculaire au lever du soleil pour éviter la foule.",
    gastronomie: {
      title: "Saveurs du Canal",
      description: "Une cuisine généreuse basée sur les produits de la mer et les produits du terroir sec.",
      items: ["Crabes de mangrove", "Camarons de Morondava", "Koba"],
      image: "/culture/gastronomie-menabe.jpg"
    }
  },

  // --- CENTRE (HAUTES TERRES) ---
  { 
    id: 5, 
    name: "Analamanga", 
    zone: "Centre", 
    slug: "analamanga", 
    image: "/regions/analamanga.jpg", 
    chefLieu: "Antananarivo", 
    superficie: "16 911 km²",
    population: "3 618 128 hab.",
    climat: "Tropical d'altitude",
    description: "Cœur historique situé sur les hautes terres centrales, parsemé de collines sacrées et de rizières en terrasses.",
    pointsForts: [
      { name: "Palais de la Reine", tag: "HISTOIRE", img: "/TopDestination/ambohimanga.jpg" },
      { name: "Ambohimanga", tag: "PATRIMOINE", img: "/TopDestination/ambohimanga.jpg" },
      { name: "Marché d'Analakely", tag: "VIE LOCALE", img: "/TopDestination/antananarivo.jpg" }
    ],
    bonPlan: "Le coucher de soleil depuis la Haute Ville offre une vue panoramique sur toute la capitale.",
    gastronomie: {
      title: "Tradition des Hautes Terres",
      description: "Le riz est ici le roi, accompagné de brèdes et de viandes mijotées avec soin.",
      items: ["Romazava", "Ravitoto", "Variamin'anana"],
      image: "/culture/gastronomie-analamanga.jpg"
    }
  },
  { 
    id: 6, 
    name: "Matsiatra Ambony", 
    zone: "Centre", 
    slug: "matsiatra-ambony", 
    image: "/regions/matsiatra-ambony.jpg", 
    chefLieu: "Fianarantsoa", 
    superficie: "21 080 km²",
    population: "1 447 296 hab.",
    climat: "Tempéré",
    description: "Terre de montagnes et de vignobles. Célèbre pour sa vieille ville classée et ses paysages granitiques.",
    pointsForts: [
      { name: "Vieille Ville", tag: "HISTOIRE", img: "/TopDestination/antsirabe.jpg" },
      { name: "Parc de l'Anja", tag: "LÉMURIENS", img: "/TopDestination/lemurien1.jpg" },
      { name: "Vignobles", tag: "TERROIR", img: "/TopDestination/vigne.jpg" }
    ],
    bonPlan: "Prenez le train FCE vers Manakara pour un voyage hors du temps à travers les falaises.",
    gastronomie: {
      title: "Vignes & Terroir Betsileo",
      description: "Seule région viticole de l'île, elle offre des saveurs authentiques et réconfortantes.",
      items: ["Vin de Fianarantsoa", "Fromage artisanal", "Riz rouge"],
      image: "/culture/gastronomie-matsiatra.jpg"
    }
  },

  // --- SUD ---
  { 
    id: 7, 
    name: "Atsimo-Andrefana", 
    zone: "Sud", 
    slug: "atsimo-andrefana", 
    image: "/regions/atsimo-andrefana.jpg", 
    chefLieu: "Toliara", 
    superficie: "66 236 km²",
    population: "1 520 000 hab.",
    climat: "Aride",
    description: "Le Grand Sud. Entre lagons turquoises à Anakao et forêts d'épineux, une terre de contrastes saisissants.",
    pointsForts: [
      { name: "Anakao", tag: "SURF", img: "/TopDestination/anakao.jpg" },
      { name: "Lagon d'Ifaty", tag: "PLONGEÉ", img: "/TopDestination/nosybe.jpg" },
      { name: "Arboretum d'Antsokay", tag: "FLORE", img: "/TopDestination/amber.jpg" }
    ],
    bonPlan: "Prenez une pirogue Vezo pour rejoindre Anakao au petit matin.",
    gastronomie: {
      title: "Trésors du Lagon",
      description: "Une cuisine marquée par la pêche quotidienne des Vezo et les produits du bush.",
      items: ["Poisson grillé", "Langoustes", "Viande de chèvre"],
      image: "/culture/gastronomie-toliara.jpg"
    }
  },
  { 
    id: 8, 
    name: "Anosy", 
    zone: "Sud", 
    slug: "anosy", 
    image: "/regions/anosy.jpg", 
    chefLieu: "Tolagnaro", 
    superficie: "25 731 km²",
    population: "800 000 hab.",
    climat: "Subtropical",
    description: "Anciennement Fort-Dauphin. Là où les montagnes rencontrent l'Océan Indien dans un cadre sauvage.",
    pointsForts: [
      { name: "Baie de Libanona", tag: "SURF", img: "/TopDestination/diego.jpg" },
      { name: "Réserve de Berenty", tag: "FAUNE", img: "/TopDestination/lemurien1.jpg" },
      { name: "Pic Saint-Louis", tag: "VUE", img: "/TopDestination/isalo.jpg" }
    ],
    bonPlan: "Dégustez des langoustes fraîches sur la plage de Libanona.",
    gastronomie: {
      title: "Fusion Océanique",
      description: "La région Anosy est réputée pour ses fruits de mer d'une qualité exceptionnelle.",
      items: ["Langoustes géantes", "Huîtres de Fort-Dauphin", "Miel sauvage"],
      image: "/culture/gastronomie-anosy.jpg"
    }
  },

  // --- EST ---
  { 
    id: 9, 
    name: "Analanjirofo", 
    zone: "Est", 
    slug: "analanjirofo", 
    image: "/regions/analanjirofo.jpg", 
    chefLieu: "Fenerive Est", 
    superficie: "21 930 km²",
    population: "1 152 145 hab.",
    climat: "Humide",
    description: "La côte des girofliers. Inclut l'île Sainte-Marie, paradis tropical et sanctuaire des baleines.",
    pointsForts: [
      { name: "Île Sainte-Marie", tag: "PARADIS", img: "/TopDestination/sainte-marie.jpg" },
      { name: "Safari Baleines", tag: "SAUVAGE", img: "/TopDestination/diego.jpg" },
      { name: "Mananara Nord", tag: "PARC", img: "/TopDestination/masoala.jpg" }
    ],
    bonPlan: "De juillet à septembre, ne manquez pas le festival des baleines à Sainte-Marie.",
    gastronomie: {
      title: "Épices & Parfum de Mer",
      description: "Le girofle et la coco dominent cette cuisine parfumée et tropicale.",
      items: ["Crabe au coco", "Punch au girofle", "Fruits de mer"],
      image: "/culture/gastronomie-est.jpg"
    }
  },

  { id: 10, name: "Sofia", slug: "sofia", zone: "Nord", image: "/regions/sofia.jpg", chefLieu: "Antsohihy", superficie: "50 100 km²", population: "1 500 000 hab.", climat: "Sec", description: "Région carrefour entre le Nord et l'Ouest.", pointsForts: [{name: "Sahamalaza", tag: "PARC", img: "/TopDestination/lemurien1.jpg"}], bonPlan: "Étape idéale vers Diego.", gastronomie: {title: "Cuisine de Plaine", description: "Plats robustes.", items: ["Riz", "Viande"], image: "/culture/gastronomie.jpg"}},
  { id: 11, name: "Alaotra-Mangoro", slug: "alaotra-mangoro", zone: "Est", image: "/regions/alaotra.jpg", chefLieu: "Ambatondrazaka", superficie: "31 948 km²", population: "1 112 000 hab.", climat: "Humide", description: "Le grenier à riz de Madagascar.", pointsForts: [{name: "Lac Alaotra", tag: "LAC", img: "/TopDestination/lac.jpg"}], bonPlan: "Observez le lémurien Bandro.", gastronomie: {title: "Rizière & Lac", description: "Le meilleur riz de l'île.", items: ["Poisson de lac", "Riz blanc"], image: "/culture/gastronomie.jpg"}},
  { id: 12, name: "Atsinanana", slug: "atsinanana", zone: "Est", image: "/regions/atsinanana.jpg", chefLieu: "Toamasina", superficie: "21 934 km²", population: "1 484 403 hab.", climat: "Humide", description: "Le premier port de l'île.", pointsForts: [{name: "Canal des Pangalanes", tag: "EAU", img: "/TopDestination/diego.jpg"}], bonPlan: "Pirogue au lever du jour.", gastronomie: {title: "Port d'Attache", description: "Mélange urbain et marin.", items: ["Soupe chinoise", "Bao"], image: "/culture/gastronomie.jpg"}},
  { id: 13, name: "Vatovavy", slug: "vatovavy", zone: "Est", image: "/regions/vatovavy.jpg", chefLieu: "Mananjary", superficie: "10 000 km²", population: "700 000 hab.", climat: "Humide", description: "La côte luxuriante du Sud-Est.", pointsForts: [{name: "Mananjary", tag: "CULTURE", img: "/TopDestination/diego.jpg"}], bonPlan: "Découvrez les traditions Antambahoaka.", gastronomie: {title: "Saveurs du Sud-Est", description: "Cuisine de l'océan.", items: ["Poisson", "Brèdes"], image: "/culture/gastronomie.jpg"}},
  { id: 14, name: "Fitovinany", slug: "fitovinany", zone: "Est", image: "/regions/fitovinany.jpg", chefLieu: "Manakara", superficie: "10 000 km²", population: "750 000 hab.", climat: "Humide", description: "Terminus du célèbre train FCE.", pointsForts: [{name: "Manakara", tag: "TERRE", img: "/TopDestination/diego.jpg"}], bonPlan: "Visitez le trou du commissaire.", gastronomie: {title: "Étape Gourmande", description: "Plats de voyage.", items: ["Café", "Bananes"], image: "/culture/gastronomie.jpg"}},
  { id: 15, name: "Atsimo-Atsinanana", slug: "atsimo-atsinanana", zone: "Est", image: "/regions/atsimo-atsinanana.jpg", chefLieu: "Farafangana", superficie: "18 863 km²", population: "1 026 000 hab.", climat: "Humide", description: "Une région forestière et côtière reculée.", pointsForts: [{name: "Réserve de Manombo", tag: "BOIS", img: "/TopDestination/masoala.jpg"}], bonPlan: "Une immersion dans la culture Antesaka.", gastronomie: {title: "Forêt & Mer", description: "Produits locaux.", items: ["Miel", "Riz"], image: "/culture/gastronomie.jpg"}},
  { id: 16, name: "Amoron'i Mania", slug: "amoron-i-mania", zone: "Centre", image: "/regions/amoroni.jpg", chefLieu: "Ambositra", superficie: "16 141 km²", population: "833 000 hab.", climat: "Frais", description: "Capitale de l'artisanat Zafimaniry.", pointsForts: [{name: "Marqueterie", tag: "ART", img: "/TopDestination/antsirabe.jpg"}], bonPlan: "Achetez des objets en bois sculpté.", gastronomie: {title: "Cuisine Zafimaniry", description: "Rustique.", items: ["Saucisses", "Légumes secs"], image: "/culture/gastronomie.jpg"}},
  { id: 17, name: "Vakinankaratra", slug: "vakinankaratra", zone: "Centre", image: "/regions/vakinankaratra.jpg", chefLieu: "Antsirabe", superficie: "16 599 km²", population: "2 071 000 hab.", climat: "Frais", description: "Ville d'eau et centre industriel.", pointsForts: [{name: "Lacs Tritriva", tag: "VULCAN", img: "/TopDestination/isalo.jpg"}], bonPlan: "Tour en pousse-pousse.", gastronomie: {title: "Terroir Frais", description: "Produits laitiers.", items: ["Yaourt", "Foie gras"], image: "/culture/gastronomie.jpg"}},
  { id: 18, name: "Bongolava", slug: "bongolava", zone: "Centre", image: "/regions/bongolava.jpg", chefLieu: "Tsiroanomandidy", superficie: "16 688 km²", population: "571 000 hab.", climat: "Chaud", description: "Le pays du zébu.", pointsForts: [{name: "Grands Marchés", tag: "BOVIN", img: "/TopDestination/antananarivo.jpg"}], bonPlan: "Vivez l'ambiance des marchés aux bestiaux.", gastronomie: {title: "Cuisine de Cowboy", description: "Viande de zébu.", items: ["Kitoza", "Varanga"], image: "/culture/gastronomie.jpg"}},
  { id: 19, name: "Itasy", slug: "itasy", zone: "Centre", image: "/regions/itasy.jpg", chefLieu: "Miarinarivo", superficie: "6 993 km²", population: "898 833 hab.", climat: "Frais", description: "Région volcanique et agricole.", pointsForts: [{name: "Chutes de la Lily", tag: "EAU", img: "/TopDestination/isalo.jpg"}], bonPlan: "Détente au bord du lac.", gastronomie: {title: "Poissons de Lac", description: "Pêche fraîche.", items: ["Tilapia", "Carpe"], image: "/culture/gastronomie.jpg"}},
  { id: 20, name: "Ihorombe", slug: "ihorombe", zone: "Sud", image: "/regions/ihorombe.jpg", chefLieu: "Ihosy", superficie: "26 391 km²", population: "418 520 hab.", climat: "Aride", description: "Porte de l'Isalo.", pointsForts: [{name: "Massif de l'Isalo", tag: "ROCHE", img: "/TopDestination/isalo.jpg"}], bonPlan: "Baignade en piscine naturelle.", gastronomie: {title: "Hautes Plaines", description: "Viande séchée.", items: ["Kitoza", "Riz"], image: "/culture/gastronomie.jpg"}},
  { id: 21, name: "Androy", slug: "androy", zone: "Sud", image: "/regions/androy.jpg", chefLieu: "Ambovombe", superficie: "19 317 km²", population: "903 000 hab.", climat: "Très aride", description: "L'extrême sud sauvage.", pointsForts: [{name: "Cap Sainte-Marie", tag: "SUD", img: "/TopDestination/diego.jpg"}], bonPlan: "Découvrez la culture Antandroy.", gastronomie: {title: "Bush Cuisine", description: "Produits de l'aridité.", items: ["Cactus", "Chèvre"], image: "/culture/gastronomie.jpg"}},
  { id: 22, name: "Atsimo-Andrefana", slug: "atsimo-andrefana-2",  zone: "Sud", image: "/regions/atsimo.jpg", chefLieu: "Toliara", superficie: "66 236 km²", population: "1 520 000 hab.", climat: "Sec", description: "Littoral et Bush.", pointsForts: [{name: "Ifaty", tag: "MER", img: "/TopDestination/nosybe.jpg"}], bonPlan: "Snorkeling sur la barrière.", gastronomie: {title: "Vezo Food", description: "Produit de mer.", items: ["Poisson grillé"], image: "/culture/gastronomie.jpg"}},
  { id: 23, name: "Melaky", slug: "melaky", zone: "Ouest", image: "/regions/melaky.jpg", chefLieu: "Maintirano", superficie: "38 852 km²", population: "300 000 hab.", climat: "Chaud", description: "La région la plus isolée et mystérieuse.", pointsForts: [{name: "Tsingy de Bemaraha", tag: "UNESCO", img: "/TopDestination/tsingy.jpg"}], bonPlan: "Prévoyez un 4x4 robuste.", gastronomie: {title: "Cuisine Isolée", description: "Authentique.", items: ["Gibier", "Poisson"], image: "/culture/gastronomie.jpg"}}
];