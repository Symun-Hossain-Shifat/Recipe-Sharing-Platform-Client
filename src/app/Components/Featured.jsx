

import { GetallFeatures } from '@/lib/GetApiData/featured';
import React from 'react';

async function FeaturedRecipes() { 
    const Datas = await GetallFeatures()
  return (
    <section className="w-11/12 mx-auto py-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Featured Recipes</h2>
        <p className="text-gray-500 mt-2">
          Discover our hand-picked featured recipes.
        </p>
      </div>
      {
            Datas.length === 0 ? (
                <div className="flex bg-orange-50 flex-col items-center justify-center py-20 text-center">
                <div className="text-7xl mb-4">🍽️</div>

                <h2 className="text-2xl font-bold mb-2">
                    No Featured Recipes Found
                </h2>

                <p className="text-gray-500 max-w-md">
                    There are currently no featured recipes available.
                    Once the admin marks recipes as featured, they will appear here.
                </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {Datas.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Recipe Image */}
            <img
              src={recipe.recipeImage}
              alt={recipe.recipeName}
              className="w-full h-56 object-cover"
            />

            {/* Card Content */}
            <div className="p-5">
              <h3 className="text-xl font-bold mb-3">
                {recipe.recipeName}
              </h3>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Category:</span>{' '}
                  {recipe.category}
                </p>

                <p>
                  <span className="font-semibold">Cuisine:</span>{' '}
                  {recipe.cuisineType}
                </p>

                <p>
                  <span className="font-semibold">
                    Preparation Time:
                  </span>{' '}
                  {recipe.preparationTime} Minutes
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
            )
        }

      
    </section>
  );
}

export default FeaturedRecipes;