import Image from "next/image";
import Link from "next/link";
import { AiOutlineLike } from "react-icons/ai";
import { Getspecificrecipesbylikes } from "@/lib/GetApiData/recipe";

async function LikesRecipesection() {
  const likesCount = 4;
  const recipes = await Getspecificrecipesbylikes(likesCount);

  if (!recipes || recipes.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6">🔥 Popular Recipes</h2>
        <p className="text-gray-500">No popular recipes found.</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">
          🔥 Popular Recipes
        </h2>
        <p className="text-gray-500 mt-2">
          Show most liked recipes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
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