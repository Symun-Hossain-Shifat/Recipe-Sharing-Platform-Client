'use client'

import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Pagination } from "@heroui/react";
import { useEffect, useState } from "react";
import { Getallrecipes } from "@/lib/GetApiData/recipe";

function RecipeHomepage({ Datas, user }) {
  const [category, setCategory] = useState("all");
  const [data, setData] = useState(Datas);
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchRecipes = async () => {
      let result;

      if (category === "all") {
        result = await Getallrecipes("all", page, itemsPerPage);
      } else {
        result = await Getallrecipes(
          category.toLowerCase(),
          page,
          itemsPerPage
        );
      }

      setData(result || []);
    };

    fetchRecipes();
  }, [category, page]);

  useEffect(() => {
    setPage(1);
  }, [category]);

  const totalItems = data.length;
  const totalPages = Math.max(1, page + (data.length === itemsPerPage ? 1 : 0));

  const getPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = startItem + data.length - 1;

  return (
    <div className="min-h-screen bg-black text-white py-8">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6 pb-10">
        <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold px-3 py-1 bg-emerald-950/60 border border-emerald-800/50 rounded-full">
          Explore Recipe Collection
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white mt-4 tracking-tight">
          Browse All <span className="text-emerald-400">Recipes</span>
        </h1>

        <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Discover culinary inspirations, home-cooked favorites, and gourmet dishes shared by our passionate community.
        </p>

        {/* Filter Dropdown */}
        <div className="w-full max-w-xs sm:max-w-md mx-auto mt-6">
          <select
            className="w-full px-5 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-white font-medium focus:border-emerald-500 focus:outline-none cursor-pointer transition-colors shadow-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Dinner">Dinner Recipes</option>
            <option value="Lunch">Lunch Recipes</option>
            <option value="Breakfast">Breakfast Recipes</option>
            <option value="Snack">Snacks & Treats</option>
          </select>
        </div>
      </div>

      {/* Recipe Count Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-400">
          Showing <span className="text-white font-bold">{data.length}</span> recipes
        </p>
        <span className="text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-lg">
          Filter: {category === 'all' ? 'All Categories' : category}
        </span>
      </div>

      {/* Recipes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {data.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              No Recipes Found 😢
            </h2>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
              There are no recipes matching the selected category. Try selecting another category option.
            </p>
            <button 
              onClick={() => setCategory("all")}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-xl transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((recipe) => (
                <div
                  key={recipe._id}
                  className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl hover:border-zinc-700 transition-all duration-300 flex flex-col"
                >
                  {/* Image Header */}
                  <div className="relative h-60 w-full overflow-hidden bg-zinc-950">
                    <Image
                      src={recipe.recipeImage}
                      alt={recipe.recipeName}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/40" />

                    {/* Cuisine & Category Badges */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-semibold text-zinc-200 border border-zinc-700/60">
                        {recipe.cuisineType}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
                        {recipe.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {recipe.recipeName}
                      </h2>

                      {/* Author */}
                      <div className="flex items-center gap-2.5 mt-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-emerald-400">
                          {recipe.authorName?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[10px] uppercase tracking-wider text-zinc-500">Author</p>
                          <p className="text-xs font-medium text-zinc-300 truncate">{recipe.authorName}</p>
                        </div>
                      </div>
                    </div>

                    {/* Stats Pill */}
                    <div className="grid grid-cols-2 gap-2 py-2 border-y border-zinc-800/80">
                      <div className="flex items-center gap-2 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                        <Clock size={14} className="text-emerald-400 shrink-0" />
                        <div className="overflow-hidden">
                          <p className="text-[10px] text-zinc-500 uppercase">Prep Time</p>
                          <p className="text-xs font-semibold text-white truncate">{recipe.preparationTime} mins</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                          recipe.difficultyLevel === "Easy"
                            ? "bg-emerald-400"
                            : recipe.difficultyLevel === "Medium"
                            ? "bg-amber-400"
                            : "bg-rose-400"
                        }`} />
                        <div className="overflow-hidden">
                          <p className="text-[10px] text-zinc-500 uppercase">Difficulty</p>
                          <p className="text-xs font-semibold text-white truncate">{recipe.difficultyLevel}</p>
                        </div>
                      </div>
                    </div>

                    {/* Button */}
                    <Link
                      href={!user ? "/unauthorized" : `/Recipes/${recipe._id}`}
                      className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-3 text-sm font-semibold text-white transition-colors shadow-lg shadow-emerald-950/40"
                    >
                      <span>Explore Recipe</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-12 flex justify-center">
              <Pagination className="w-full max-w-lg">
                <Pagination.Summary className="text-zinc-400 text-xs">
                  Showing {startItem}-{endItem} of {totalItems} items
                </Pagination.Summary>
                <Pagination.Content>
                  <Pagination.Item>
                    <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
                      <Pagination.PreviousIcon />
                      <span>Previous</span>
                    </Pagination.Previous>
                  </Pagination.Item>
                  {getPageNumbers().map((p) => (
                    <Pagination.Item key={p}>
                      <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  ))}
                  <Pagination.Item>
                    <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
                      <span>Next</span>
                      <Pagination.NextIcon />
                    </Pagination.Next>
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RecipeHomepage;