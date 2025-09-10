
import HeroSlider from "./_component/HeroSlider";
import MainSlider from "./_component/MainSlider";
import SearchProducts from "./_component/SearchProducts";
import FeaturedProducts from "./product/_components/FeaturedProducts";

export default function Home() {
  return (
 <>
   <MainSlider/>
   <HeroSlider/>
   <SearchProducts/>
        <FeaturedProducts />
 
   </>
   
  );
}
