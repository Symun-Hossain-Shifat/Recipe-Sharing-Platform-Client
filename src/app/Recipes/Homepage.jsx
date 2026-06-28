'use client'

import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  BarChart,
  MapPin,
  Tag,
 
} from "lucide-react";


import { Description, ListBox , Select} from "@heroui/react";
import { useEffect, useState } from "react";
import { Getallrecipes } from "@/lib/GetApiData/recipe";


function RecipeHomepage({Datas , user}) { 


const [category, setCategory] = useState("all");
const [data, setData] = useState(Datas);

useEffect(() => {
  const fetchRecipes = async () => {
    if (category === "all") {
      setData(Datas);
    } else {
      const result = await Getallrecipes(category.toLocaleLowerCase());
      setData(result);
    }
  };

  fetchRecipes();
}, [category, Datas]);


  return (
     <div className="min-h-screen bg-gradient-to-br text-black dark:text-white dark:bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')] bg-cover bg-center opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-orange-500 to-emerald-600 bg-clip-text text-transparent">
              Discover Recipes
            </h1>

            <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
              Explore delicious recipes shared by food lovers around the world.
            </p>

            {/* Search Field */}
            <div className="
                    w-full max-w-md mx-auto my-3
                    px-5 
                    rounded-2xl text-black
                    border border-gray-300 dark:border-gray-700
                    bg-white dark:bg-gray-50
                    focus:border-orange-500
                    hover:border-orange-400
                    cursor-pointer
                ">
         
        
                    <select 
                    className="w-full py-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                
                >
                <option value="all">All Categories</option>
                <option value="Dinner"> Dinner</option>
                <option value="Lunch"> Lunch</option>
                <option value="Breakfast"> Breakfast</option>
                <option value="Snack"> Snack</option>
                </select>
                            </div>
                 
            
          </div>
        </div>
      </div>

      {/* Recipe Count */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <p className="text-gray-600 font-medium">
          Found {data.length} Recipes
        </p>
      </div>

      {/* Recipes Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {data.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-gray-700">
              No Recipe Found 😢
            </h2>
            <p className="text-gray-500 mt-2">
              Try searching with another keyword.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {data.map((recipe) => (
              <div
                key={recipe._id}
                className="group bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden border border-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={recipe.recipeImage}
                    alt={recipe.recipeName}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />

                  
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="flex items-center gap-1 text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                      <Tag size={12} />
                      {recipe.category}
                    </span>

                    <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      <MapPin size={12} />
                      {recipe.cuisineType}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-800 line-clamp-1 mb-2">
                    {recipe.recipeName}
                  </h2>

                  <p className="text-sm text-gray-500 mb-5">
                    By{" "}
                    <span className="font-semibold text-gray-700">
                      {recipe.authorName}
                    </span>
                  </p>

                  {/* Info */}
                  <div className="grid grid-cols-2 gap-3 dark:text-black bg-gray-50 rounded-2xl p-4 mb-5">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} />
                      <span>{recipe.preparationTime} min</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <BarChart size={16} />
                      <span
                        className={`font-semibold ${
                          recipe.difficultyLevel === "Easy"
                            ? "text-green-600"
                            : recipe.difficultyLevel === "Medium"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {recipe.difficultyLevel}
                      </span>
                    </div>
                  </div>

                  {/* Button */} 
                  
                  <Link 
                   href={ !user ? '/unauthorized' : `/Recipes/${recipe._id}`}
                                    
                    
                    className="block text-center py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-emerald-500 text-white font-semibold hover:from-orange-600 hover:to-emerald-600 transition-all"
                  >
                    View Full Recipe →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeHomepage;