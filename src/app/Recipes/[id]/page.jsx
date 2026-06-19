

import Image from "next/image";
import {
  Clock,
  User,
  Tag,
  MapPin,
  Heart,
  ShoppingCart,
  ArrowLeft,
  Flag,
  Bookmark,
} from "lucide-react";
import { Getspecificrecipes } from "@/lib/GetApiData/recipe";
import Link from "next/link";

export default  async function Detailspage({params}) {
const {id} =  await params 
const Data = await Getspecificrecipes(id)
const recipe = Data[0]
  return (
    <div className="w-11/12 mx-auto my-5 bg-gradient-to-br from-orange-50 via-white to-emerald-50">

     <Link href={'/Recipes'}>
       <button
      
        className="flex items-center gap-2 mb-5 px-4 py-2 bg-white shadow rounded-xl hover:bg-gray-100 transition"
      >
        <ArrowLeft size={18} />
        Back
      </button>
       </Link>
     

      {/* HERO */}
      <div className="relative h-[400px] w-full rounded-2xl overflow-hidden">
        <Image
          src={recipe.recipeImage}
          alt={recipe.recipeName}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="p-8 text-white">
            <h1 className="text-4xl font-bold">
              {recipe.recipeName}
            </h1>
            <p>By {recipe.authorName}</p>
          </div>
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="flex gap-3 mt-5 flex-wrap">

        <button className="flex items-center gap-2 px-4 py-2 bg-white shadow rounded-xl">
          <Heart className="text-red-500" />
          {recipe.likesCount}
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-white shadow rounded-xl">
          <Bookmark />
          Save
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-white shadow rounded-xl text-red-500">
          <Flag />
          Report
        </button>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">

          {/* META */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <div className="bg-white p-4 text-center rounded-xl shadow">
              <Clock className="mx-auto" />
              {recipe.preparationTime} min
            </div>

            <div className="bg-white p-4 text-center rounded-xl shadow">
              <Tag className="mx-auto" />
              {recipe.category}
            </div>

            <div className="bg-white p-4 text-center rounded-xl shadow">
              <MapPin className="mx-auto" />
              {recipe.cuisineType}
            </div>

            <div className="bg-white p-4 text-center rounded-xl shadow">
              <Heart className="mx-auto" />
              {recipe.likesCount} Likes
            </div>
          </div>

          {/* INGREDIENTS */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-3">Ingredients</h2>

           <p className="text-gray-700 leading-relaxed">
              {recipe.ingredients}
            </p>
          </div>

          {/* INSTRUCTIONS */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-3">Instructions</h2>
            <p className="text-gray-700 leading-relaxed">
              {recipe.instructions}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-5">

          {/* BUY BUTTON */}
          <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-emerald-500 text-white py-3 rounded-xl">
            <ShoppingCart />
            Buy Recipe
          </button>

          {/* AUTHOR */}
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <User className="mx-auto mb-2" />
            <h3 className="font-bold">{recipe.authorName}</h3>
            <p className="text-sm text-gray-500">
              {recipe.authorEmail}
            </p>
          </div>

          {/* STATUS */}
          <div className="bg-green-50 text-green-700 p-4 rounded-xl text-center text-sm">
            Status: {recipe.status}
          </div>
        </div>
      </div>
    </div>
  );
}