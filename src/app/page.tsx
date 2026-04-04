import Navbar from "./components/Navbar"
import Hero from "./components/Acceuil/Hero";
import TopDestinations from "./components/Acceuil/TopDestinations";
import LatestStories from "./components/Acceuil/LatestStories";
import Newsletter from "./components/Acceuil/Newsletter";
import Footer from "./components/Acceuil/Footer";

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
