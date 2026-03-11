import Navbar from "./components/Navbar"
import Hero from "./components/Hero";
import TopDestinations from "./components/TopDestinations";
import LatestStories from "./components/LatestStories";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

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
