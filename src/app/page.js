import Bannerpage from "./Components/Banner";
import CategoriesSection from "./Components/CategoriesSection";
import LikesRecipesection from "./Components/LikesRecipesection";
import Processpage from "./Components/Process";
import CulinaryTipsSection from "./Components/CulinaryTipsSection";
import TestimonialsSection from "./Components/Testimonial";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Bannerpage />
      <CategoriesSection />
      <LikesRecipesection />
      <Processpage />
      <CulinaryTipsSection />
      <TestimonialsSection />
    </div>
  );
}
