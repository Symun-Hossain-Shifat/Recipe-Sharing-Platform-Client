import Image from "next/image";
import Link from "next/link";
import { AiOutlineLike } from "react-icons/ai";
import { Getspecificrecipesbylikes } from "@/lib/GetApiData/recipe";
import { ChefHat, SearchX } from "lucide-react";

async function LikesRecipesection() {
  const likesCount = 4;
  const recipes = await Getspecificrecipesbylikes(likesCount);

  if (!recipes || recipes.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-20">
  <div className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-orange-50 to-amber-100 dark:from-zinc-900 dark:to-zinc-800 rounded-3xl shadow-xl border border-orange-200 dark:border-zinc-700 p-10 md:p-16">
    
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-orange-400 blur-3xl opacity-30 rounded-full"></div>
      <div className="relative w-24 h-24 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-2xl">
        <ChefHat size={48} />
      </div>
    </div>

    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
      🍽️ Popular Recipes
    </h2>

    <p className="max-w-lg text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
      We couldn't find any popular recipes at the moment.
      New trending dishes will appear here as users discover and love them.
    </p>

    <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-6 py-3 rounded-full shadow-lg border border-orange-200 dark:border-zinc-700">
      <SearchX className="text-orange-500" size={22} />
      <span className="font-medium text-gray-700 dark:text-gray-200">
        No Popular Recipes Found
      </span>
    </div>

    <button className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105">
      Explore All Recipes
    </button>

  </div>
</section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 dark:text-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl  font-bold text-gray-600 ">
          🔥 Popular Recipes
        </h2>
        <p className="text-gray-500 mt-2 text-gray-600">
          Show most liked recipes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white dark:bg-black rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <div className="relative w-full h-56">
              <Image
                src={recipe.recipeImage}
                alt={recipe.recipeName}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5 space-y-3">
              <h3 className="text-xl font-bold">
                {recipe.recipeName}
              </h3>

              <p className="text-gray-600">
                <span className="font-semibold">Author:</span>{" "}
                {recipe.authorName}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-red-500">
                  <AiOutlineLike size={22} />
                  <span className="font-semibold">
                    {recipe.likesCount} Likes
                  </span>
                </div>

                <Link
                  href={`/Recipes/${recipe._id}`}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LikesRecipesection;