import Navbar from "./components/Navbar"
import Hero from "./Acceuil/Hero";
import TopDestinations from "./Acceuil/TopDestinations";
import LatestStories from "./Acceuil/LatestStories";
import Newsletter from "./Acceuil/Newsletter";
import Footer from "./Acceuil/Footer";

export default function Home() {
  return (
   <div>
    <Navbar/>
    <Hero/>
    <TopDestinations/>
    <LatestStories/>
    <Newsletter/>
    <Footer/>
   </div>
  );
}
