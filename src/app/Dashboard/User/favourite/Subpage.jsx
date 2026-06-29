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
    <div className='p-5'>
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
                    <div className='grid grid-cols-1   md:px-0 md:grid-cols-2 gap-2'>
            {
        
        Datas.map( (recipe , index)  => (
            <div
                key={index}
                className="group bg-white/80 dark:bg-black  backdrop-blur-md rounded-3xl overflow-hidden border border-white shadow-lg  transition-all duration-500"
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
                  <div className="grid grid-cols-2 gap-3 dark:text-black bg-gray-50 rounded-2xl p-4 mb-5">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} />
                      <span>{recipe.preparationTime} min</span>
                    </div>

                    <div className="flex items-center  dark:text-black gap-2 text-sm">
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
                       <div className='flex items-center justify-between'> 


                         <Link
                  href={`/Recipes/${recipe._id}`}
                  className="bg-orange-500 rounded-4xl hover:bg-orange-600 text-white px-4 py-2 transition"
                >
                  View Details
                </Link>
                         <Button
                    onClick={() => DeleteFavourite(recipe._id)}
                    className=" flex gap-3 items-center justify-center py-3 rounded-2xl bg-red-500 text-white font-semibold  transition-all"
                  >
                    <RiDeleteBin6Line />
                   Delete Now
                  </Button> 
                   

                       </div>
                 

                </div>
              </div>
        ))
        
        }
        </div>
       
    </div>
  )
}

export default Favouritehomepage 