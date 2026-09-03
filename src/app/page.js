
import Bannerpage from "./Components/Banner";

import LikesRecipesection from "./Components/LikesRecipesection";
import Processpage from "./Components/Process";
import TestimonialsSection from "./Components/Testimonial";

export default function Home() {
  return (
    <div >
      <Bannerpage></Bannerpage>

      <LikesRecipesection></LikesRecipesection>
      <Processpage></Processpage>
      <TestimonialsSection></TestimonialsSection>
    </div>
  );
}
