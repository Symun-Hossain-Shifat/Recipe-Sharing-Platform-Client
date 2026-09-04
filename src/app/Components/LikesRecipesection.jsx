import Image from "next/image";
import Link from "next/link";
import { AiOutlineLike } from "react-icons/ai";
import { Getspecificrecipesbylikes } from "@/lib/GetApiData/recipe";
import { ChefHat, ChefHatIcon, SearchX } from "lucide-react";
import { GetUserInserver } from "@/lib/GetUser/Getuserinfo";

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col group shadow-xl"
          >
            <div className="relative w-full h-52 overflow-hidden bg-zinc-950">
              <Image
                src={recipe.recipeImage}
                alt={recipe.recipeName}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-700/60 flex items-center gap-1.5 text-xs text-white">
                <AiOutlineLike className="text-emerald-400" />
                <span className="font-semibold">{recipe.likesCount || 0}</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">
                  {recipe.recipeName}
                </h3>

                <p className="text-xs text-zinc-400 mt-1">
                  By <span className="text-zinc-200 font-medium">{recipe.authorName}</span>
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                <span className="text-xs text-emerald-400 font-medium bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-1 rounded-lg">
                  {recipe.category || 'Recipe'}
                </span>

                <Link
                  href={user?.email ? `/Recipes/${recipe._id}` : '/unauthorized'}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-md"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Link href="/Recipes">
          <button
            className="group flex items-center gap-2.5 px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all shadow-xl"
          >
            <ChefHatIcon
              size={18}
              className="text-emerald-400 group-hover:rotate-12 transition-transform duration-300"
            />
            Explore All Recipes
          </button>
        </Link>
      </div>

    </section>
  );
}

export default LikesRecipesection;