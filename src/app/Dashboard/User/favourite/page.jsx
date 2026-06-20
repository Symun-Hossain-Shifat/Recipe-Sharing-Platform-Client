import { Getspecificfavourites } from '@/lib/GetApiData/favourite'
import { Getspecificrecipes } from '@/lib/GetApiData/recipe';
import { GetUserInserver } from '@/lib/GetUser/Getuserinfo'
import { BarChart, Clock, Heart,  MapPin, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri';

async function Favouritehomepage () {
    const user = await GetUserInserver()
    
    const id = user?.id ;
    const Data = await Getspecificfavourites(id)
    // console.log(Data[0].recipeid)
    
      const recipes = await Promise.all(
    Data.map(item =>
      
      Getspecificrecipes(item.recipeid)
    )
    
  );
  const Datas = []
      const recipesall = await Promise.all(
    recipes.map(item =>
      
       Datas.push(item[0])
    )
    
  );
    console.log( Datas)
  return (
    <div>
       <div className="text-center mb-8">
            
            {/* Badge */}
            <span className="inline-flex items-center px-4 py-1 text-xs font-medium bg-orange-100 text-orange-600 rounded-full mb-3">
                ❤️ My Personal Collection
            </span>

            {/* Main Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                My Favourite Recipes {Datas.length}
            </h1>

            {/* Subtitle */}
            <p className="text-gray-500 mt-2 text-sm md:text-base">
                All the recipes you loved saved in one place 🍲
            </p>
            </div>
                    <div className='grid grid-cols-1 px-10  md:px-0 md:grid-cols-2 gap-2'>
            {
        
        Datas.map( (recipe , index)  => (
            <div
                key={index}
                className="group bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden border border-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                <Image
                        src={recipe.recipeImage || "/fallback.jpg"}
                        alt={recipe.recipeName || "recipe"}
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
                  <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-2xl p-4 mb-5">
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
                    href={`/Recipes/${recipe._id}`}
                    className="block flex gap-3 items-center justify-center py-3 rounded-2xl bg-red-500 text-white font-semibold  transition-all"
                  >
                    <RiDeleteBin6Line />
                   Delete
                  </Link>

                </div>
              </div>
        ))
        
        }
        </div>
       
    </div>
  )
}

export default Favouritehomepage 