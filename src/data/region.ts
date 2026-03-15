export interface Region {
  id: number;
  name: string;
  slug: string;
  zone: string;
  image: string;
  description: string;
  chefLieu: string;
}

export const regions: Region[] = [
  // NORD
  { id: 1, name: "DIANA", zone: "Nord", slug: "diana", image: "/regions/diana.jpg", chefLieu: "Antsiranana", description: "Le point culminant du Nord, abritant Nosy Be et les baies de Diego." },
  { id: 2, name: "SAVA", zone: "Nord", slug: "sava", image: "/regions/sava.jpg", chefLieu: "Sambava", description: "La capitale mondiale de la vanille et des parcs luxuriants de Marojejy." },
  { id: 7, name: "Sofia", zone: "Nord", slug: "sofia", image: "/regions/sofia.jpg", chefLieu: "Antsohihy", description: "Région de plaines fertiles et carrefour entre le Nord et l'Ouest." },

  // CENTRE (Hautes Terres)
  { id: 3, name: "Itasy", zone: "Centre", slug: "itasy", image: "/regions/itasy.jpg", chefLieu: "Miarinarivo", description: "Région volcanique célèbre pour son lac et les chutes de la Lily." },
  { id: 4, name: "Analamanga", zone: "Centre", slug: "analamanga", image: "/regions/analamanga.jpg", chefLieu: "Antananarivo", description: "Cœur historique et économique situé sur les hautes terres centrales." },
  { id: 5, name: "Vakinankaratra", zone: "Centre", slug: "vakinankaratra", image: "/regions/vakinankaratra.jpg", chefLieu: "Antsirabe", description: "Terre thermale et agricole aux paysages volcaniques spectaculaires." },
  { id: 6, name: "Bongolava", zone: "Centre", slug: "bongolava", image: "/regions/bongolava.jpg", chefLieu: "Tsiroanomandidy", description: "Vastes savanes et zones de transition vers l'Ouest sauvage." },
  { id: 14, name: "Amoron'i Mania", zone: "Centre", slug: "amoroni-mania", image: "/regions/amoroni-mania.jpg", chefLieu: "Ambositra", description: "Capitale de l'artisanat Zafimaniry et du travail du bois précieux." },
  { id: 15, name: "Matsiatra Ambony", zone: "Centre", slug: "matsiatra-ambony", image: "/regions/matsiatra-ambony.jpg", chefLieu: "Fianarantsoa", description: "Région de montagnes, de vignobles et de culture Betsileo." },

  // OUEST
  { id: 8, name: "Boeny", zone: "Ouest", slug: "boeny", image: "/regions/boeny.jpg", chefLieu: "Mahajanga", description: "Cité des fleurs, célèbre pour son bord de mer et ses grottes." },
  { id: 9, name: "Betsiboka", zone: "Ouest", slug: "betsiboka", image: "/regions/betsiboka.jpg", chefLieu: "Maevatanana", description: "Région aurifère traversée par le majestueux fleuve Betsiboka." },
  { id: 10, name: "Melaky", zone: "Ouest", slug: "melaky", image: "/regions/melaky.jpg", chefLieu: "Maintirano", description: "Terre des Tsingy de Bemaraha et des paysages calcaires uniques." },
  { id: 20, name: "Menabe", zone: "Ouest", slug: "menabe", image: "/regions/menabe.jpg", chefLieu: "Morondava", description: "Terre de l'Allée des Baobabs et des couchers de soleil mythiques." },

  // EST
  { id: 11, name: "Alaotra-Mangoro", zone: "Est", slug: "alaotra-mangoro", image: "/regions/alaotra-mangoro.jpg", chefLieu: "Ambatondrazaka", description: "Le grenier à riz de l'île, bordant le plus grand lac de Madagascar." },
  { id: 12, name: "Atsinanana", zone: "Est", slug: "atsinanana", image: "/regions/atsinanana.jpg", chefLieu: "Toamasina", description: "Grand port de l'Est et porte d'entrée du canal des Pangalanes." },
  { id: 13, name: "Analanjirofo", zone: "Est", slug: "analanjirofo", image: "/regions/analanjirofo.jpg", chefLieu: "Fenerive Est", description: "Côte des girofliers, incluant l'emblématique île Sainte-Marie." },
  { id: 16, name: "Vatovavy", zone: "Est", slug: "vatovavy", image: "/regions/vatovavy.jpg", chefLieu: "Mananjary", description: "Culture riche et paysages côtiers sculptés par l'océan Indien." },
  { id: 17, name: "Fitovinany", zone: "Est", slug: "fitovinany", image: "/regions/fitovinany.jpg", chefLieu: "Manakara", description: "Terminus de la célèbre ligne de train FCE et plages sauvages." },
  { id: 18, name: "Atsimo-Atsinanana", zone: "Est", slug: "atsimo-atsinanana", image: "/regions/atsimo-atsinanana.jpg", chefLieu: "Farafangana", description: "Zones forestières et littorales authentiques du Sud-Est." },

  // SUD
  { id: 19, name: "Ihorombe", zone: "Sud", slug: "ihorombe", image: "/regions/ihorombe.jpg", chefLieu: "Ihosy", description: "Vastes plateaux herbeux et porte d'accès au massif de l'Isalo." },
  { id: 21, name: "Atsimo-Andrefana", zone: "Sud", slug: "atsimo-andrefana", image: "/regions/atsimo-andrefana.jpg", chefLieu: "Toliara", description: "Le Grand Sud, ses lagons turquoises et ses forêts d'épineux." },
  { id: 22, name: "Androy", zone: "Sud", slug: "androy", image: "/regions/androy.jpg", chefLieu: "Ambovombe", description: "L'extrême Sud, berceau de la culture Antandroy et des paysages arides." },
  { id: 23, name: "Anosy", zone: "Sud", slug: "anosy", image: "/regions/anosy.jpg", chefLieu: "Tolagnaro", description: "Rencontre entre mer et montagnes à Fort-Dauphin." }
];