import Navbar from "./components/Navbar"
import Hero from "./components/Hero";
import TopDestinations from "./components/TopDestinations";
import LatestStories from "./components/LatestStories";

export default function Home() {
  return (
   <div>
    <Navbar/>
    <Hero/>
    <TopDestinations/>
    <LatestStories/>
   </div>
  );
}
