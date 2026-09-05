import Link from "next/link";
import { Getspecificrecipesbylikes } from "@/lib/GetApiData/recipe";
import { ChefHat, SearchX } from "lucide-react";
import { GetUserInserver } from "@/lib/GetUser/Getuserinfo";
import AnimatedLikesGrid from "./AnimatedLikesGrid";

async function LikesRecipesection() {
  const user = await GetUserInserver();
  const likesCount = 4;
  const recipes = await Getspecificrecipesbylikes(likesCount);

  if (!recipes || recipes.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-800 p-8 sm:p-14">

          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shadow-xl">
              <ChefHat size={40} />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Popular Recipes
          </h2>

          <p className="max-w-lg text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
            No popular recipes found at the moment. New trending dishes will appear here as the community likes and shares them.
          </p>

          <div className="flex items-center gap-2 bg-zinc-950 px-5 py-2.5 rounded-full border border-zinc-800 mb-6">
            <SearchX className="text-emerald-400" size={18} />
            <span className="text-xs font-medium text-zinc-300">
              No Trending Recipes Found
            </span>
          </div>

          <Link href="/Recipes">
            <button className="px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm shadow-lg shadow-emerald-950/50 transition-all">
              Explore All Recipes
            </button>
          </Link>

        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 text-white">
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold px-3 py-1 bg-emerald-950/60 border border-emerald-800/50 rounded-full">
          Community Favorites
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
          🔥 Most Popular Recipes
        </h2>
        <p className="text-zinc-400 mt-2 text-sm sm:text-base max-w-md mx-auto">
          Discover top-rated recipes loved and recommended by home chefs around the world.
        </p>
      </div>

      <AnimatedLikesGrid recipes={recipes} user={user} />
    </section>
  );
}

export default LikesRecipesection;