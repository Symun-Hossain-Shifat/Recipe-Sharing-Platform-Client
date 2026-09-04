import Bannerpage from "./Components/Banner";
import LikesRecipesection from "./Components/LikesRecipesection";
import Processpage from "./Components/Process";
import TestimonialsSection from "./Components/Testimonial";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Bannerpage />
      <LikesRecipesection />
      <Processpage />
      <TestimonialsSection />
    </div>
  );
}
