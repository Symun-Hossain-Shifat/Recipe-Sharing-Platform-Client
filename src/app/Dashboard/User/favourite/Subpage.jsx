'use client'
import { Deletefavourite } from '@/lib/DeleteData/favourite';
import { Button } from '@heroui/react';
import { BarChart, Clock, Heart,  MapPin, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';
import { RiDeleteBin6Line } from 'react-icons/ri';

 function Favouritehomepage ({Datas}) { 
    const DeleteFavourite = async (id) => {
   
  const result = await Deletefavourite(id)
  console.log(result)  

  if(result){
    toast.success('Favourite Deleted ')
    redirect('/Dashboard/User/')
  }
    }
   
  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="text-center mb-10 max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1 px-4 py-1 text-xs font-semibold bg-emerald-950/70 text-emerald-400 border border-emerald-800/50 rounded-full mb-3">
          ❤️ My Personal Collection
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          My Favorite Recipes ({Datas.length})
        </h1>

        <p className="text-zinc-400 mt-2 text-sm sm:text-base">
          All your saved culinary favorites stored in one place 🍲
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {Datas.map((recipe, index) => (
          <div
            key={index}
            className="group bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-xl hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden bg-zinc-950">
              <Image
                src={recipe.recipeImage || "/fallback.jpg"}
                alt={recipe.recipeName || "recipe"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="flex items-center gap-1 text-xs bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 px-3 py-1 rounded-full font-medium">
                    <Tag size={12} />
                    {recipe.category}
                  </span>

                  <span className="flex items-center gap-1 text-xs bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 py-1 rounded-full font-medium">
                    <MapPin size={12} />
                    {recipe.cuisineType}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white line-clamp-1 mb-1 group-hover:text-emerald-400 transition-colors">
                  {recipe.recipeName}
                </h2>

                <p className="text-xs text-zinc-400 mb-5">
                  By <span className="font-semibold text-zinc-200">{recipe.authorName}</span>
                </p>

                {/* Info */}
                <div className="grid grid-cols-2 gap-3 bg-zinc-950 rounded-2xl p-4 mb-6 border border-zinc-800">
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <Clock size={16} className="text-emerald-400 shrink-0" />
                    <span>{recipe.preparationTime} min</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <BarChart size={16} className="text-emerald-400 shrink-0" />
                    <span
                      className={`font-semibold ${
                        recipe.difficultyLevel === "Easy"
                          ? "text-emerald-400"
                          : recipe.difficultyLevel === "Medium"
                          ? "text-amber-400"
                          : "text-rose-400"
                      }`}
                    >
                      {recipe.difficultyLevel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-zinc-800"> 
                <Link
                  href={`/Recipes/${recipe._id}`}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-md"
                >
                  View Details
                </Link>

                <Button
                  onClick={() => DeleteFavourite(recipe._id)}
                  className="flex gap-2 items-center justify-center px-4 py-2.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-800/60 text-rose-300 font-semibold text-xs transition-colors"
                >
                  <RiDeleteBin6Line size={16} />
                  <span>Remove</span>
                </Button> 
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favouritehomepage 