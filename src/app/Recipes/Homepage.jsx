'use client'

import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  BarChart,
  MapPin,
  Tag,
  ArrowRight,

} from "lucide-react";


import { Description, ListBox, Pagination, Select } from "@heroui/react";
import { useEffect, useState } from "react";
import { Getallrecipes } from "@/lib/GetApiData/recipe";


function RecipeHomepage({ Datas, user }) {


  const [category, setCategory] = useState("all");
  const [data, setData] = useState(Datas);

  const [page, setPage] = useState(1);

  const itemsPerPage = 5;

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

      setData(result);
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
          <>
            <div className="grid sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4">

              {data.map((recipe) => (
                <div
                  key={recipe._id}
                  className="group relative overflow-hidden rounded-3xl bg-white border border-[#2B2420]/10 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={recipe.recipeImage}
                      alt={recipe.recipeName}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Cuisine Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-[#2B2420] shadow-lg">
                        {recipe.cuisineType}
                      </span>
                    </div>

                    {/* Category */}
                    <div className="absolute top-4 right-4">
                      <span className="rounded-full bg-[#BB4A2C] px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                        {recipe.category}
                      </span>
                    </div>

                    {/* Recipe name on image */}
                    <div className="absolute bottom-5 left-5 right-5">
                      <h2
                        className="text-2xl font-semibold leading-tight text-white drop-shadow-lg"
                        style={{ fontFamily: "'Fraunces', serif" }}
                      >
                        {recipe.recipeName}
                      </h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Author */}
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-9 h-9 rounded-full bg-[#F2DEB0] flex items-center justify-center">
                        <span className="text-sm font-bold text-[#2B2420]">
                          {recipe.authorName?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>

                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-[#2B2420]/40">
                          Recipe by
                        </p>
                        <p className="text-sm font-medium text-[#2B2420]">
                          {recipe.authorName}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {/* Preparation Time */}
                      <div className="flex items-center gap-3 rounded-2xl bg-[#FBF7EF] px-4 py-3">
                        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                          <Clock size={16} className="text-[#BB4A2C]" />
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-[#2B2420]/40">
                            Time
                          </p>
                          <p className="text-sm font-semibold text-[#2B2420]">
                            {recipe.preparationTime} min
                          </p>
                        </div>
                      </div>

                      {/* Difficulty */}
                      <div className="flex items-center gap-3 rounded-2xl bg-[#FBF7EF] px-4 py-3">
                        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
                          <span
                            className={`w-3 h-3 rounded-full ${recipe.difficultyLevel === "Easy"
                              ? "bg-[#5C7A52]"
                              : recipe.difficultyLevel === "Medium"
                                ? "bg-[#C68A2E]"
                                : "bg-[#BB4A2C]"
                              }`}
                          />
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-[#2B2420]/40">
                            Level
                          </p>
                          <p className="text-sm font-semibold text-[#2B2420]">
                            {recipe.difficultyLevel}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href={!user ? "/unauthorized" : `/Recipes/${recipe._id}`}
                      className="group/button flex items-center justify-center gap-2 w-full rounded-2xl bg-[#2B2420] py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#BB4A2C]"
                    >
                      <span>Explore Recipe</span>

                      <span className="transition-transform duration-300 group-hover/button:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              ))}


            </div>
            <Pagination className="w-full mt-6">
              <Pagination.Summary>
                Showing {startItem}-{endItem} of {totalItems} results
              </Pagination.Summary>
              <Pagination.Content>
                <Pagination.Item>
                  <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
                    <Pagination.PreviousIcon />
                    <span>Previous</span>
                  </Pagination.Previous>
                </Pagination.Item>
                {getPageNumbers().map((p, i) =>
                  p === "ellipsis" ? (
                    <Pagination.Item key={`ellipsis-${i}`}>
                      <Pagination.Ellipsis />
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item key={p}>
                      <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  ),
                )}
                <Pagination.Item>
                  <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
                    <span>Next</span>
                    <Pagination.NextIcon />
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          </>

        )}
      </div>
    </div>
  );
}

export default RecipeHomepage;