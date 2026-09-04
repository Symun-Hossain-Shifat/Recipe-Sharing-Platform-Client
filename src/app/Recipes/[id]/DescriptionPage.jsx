'use client';

import Image from "next/image";
import { useState } from "react";
import {
  Clock,
  Tag,
  MapPin,
  Heart,
  ShoppingCart,
  ArrowLeft,
  User2,
} from "lucide-react";

import Link from "next/link";
import toast from "react-hot-toast";
import { AiOutlineLike } from "react-icons/ai";

import { Postfavourite } from "@/lib/PostData/favourite";
import { authClient } from "@/lib/auth-client";
import { Postlikescount } from "@/lib/PostData/likes&favourite";
import { ReportPage } from "@/app/Components/Report";
import { EditRecipeInfo } from "@/lib/EditData/editRecipe";

export default function Detailspage({
  recipe,
  result1,
  result2,
  id,
}) {
  const { data: session, isPending } = authClient.useSession();
  const User = isPending ? null : session?.user;
  const authorEmail = recipe?.authorEmail;
  const UserEmail = User?.email;
  const [likes, setLikes] = useState(
    Number(recipe?.likesCount || 0)
  );

  const [liked, setLiked] = useState(false);

  const Handlefavourite = async (e) => {
    e.preventDefault();

    if (!User) {
      toast.error("Please login first");
      return;
    } 
    if (User?.role === 'Admin') {
      toast.error("Admins cannot favorite items!");
      return;
    }

    const Data = {
      useremail: User.email,
      userid: User.id,
      recipeid: recipe._id,
      authorEmail: recipe.authorEmail,
    };

    const result = await Postfavourite(Data, id);

    if (result) {
      toast.success("Added to favorites");
    }
  };

  const HandleLike = async (e) => {
    e.preventDefault();

    if (!User) {
      toast.error("Please login first");
      return;
    }

    if (liked) {
      toast.error("You already liked this recipe");
      return;
    }

    const Data = {
      useremail: User.email,
      userid: User.id,
      recipeid: recipe._id,
      authorEmail: recipe.authorEmail,
    };

    try {
      await Postlikescount(Data, recipe._id);

      const updatedLikes = likes + 1;

      const NewData = {
        authorName: recipe.authorName,
        authorEmail: recipe.authorEmail,
        authorId: recipe.authorId,
        recipeName: recipe.recipeName,
        recipeImage: recipe.recipeImage,
        category: recipe.category,
        cuisineType: recipe.cuisineType,
        difficultyLevel: recipe.difficultyLevel,
        preparationTime: recipe.preparationTime,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        likesCount: updatedLikes,
        isFeatured: recipe.isFeatured,
        status: recipe.status,
      };

      await EditRecipeInfo(NewData, recipe._id);

      setLikes(updatedLikes);
      setLiked(true);

      toast.success("Recipe liked successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white bg-black">
      {/* Back Button */}
      <Link href="/Recipes" className="inline-block mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-xl transition-colors text-sm font-medium">
          <ArrowLeft size={16} />
          Back to Recipes
        </button>
      </Link>

      {/* Hero Image Section */}
      <div className="relative h-[300px] sm:h-[420px] w-full rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950">
        <Image
          src={recipe.recipeImage}
          alt={recipe.recipeName}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end">
          <div className="p-6 sm:p-10 w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {recipe.category}
                </span>
                <span className="bg-zinc-800/80 backdrop-blur-md text-zinc-200 border border-zinc-700/60 text-xs font-medium px-3 py-1 rounded-full">
                  {recipe.cuisineType}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
                {recipe.recipeName}
              </h1>
              <p className="text-zinc-300 text-sm mt-1">
                Created by <span className="font-semibold text-emerald-400">{recipe.authorName}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex gap-3 mt-6 flex-wrap items-center">
        <button
          onClick={(e) => {
            if (UserEmail === authorEmail) {
              e.preventDefault();
              toast.error(
                "You cannot like your own recipe!"
              );
              return;
            }

            HandleLike(e);
          }}
          disabled={liked}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
            liked
              ? "bg-zinc-900 border-zinc-800 text-zinc-500 cursor-not-allowed"
              : "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white"
          }`}
        >
          <AiOutlineLike className="text-emerald-400 text-lg" />
          <span>{likes} Likes</span>
        </button>

        <button 
          onClick={(e) => {
            if (UserEmail === authorEmail) {
              e.preventDefault();
              toast.error(
                "You cannot add your own recipe to favorites!"
              );
              return;
            }

            Handlefavourite(e);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          <Heart className="text-rose-500" size={18} />
          <span>{result1?.length || 0} Favorites</span>
        </button>

        <ReportPage recipe={recipe} />
      </div>

      {/* Main Grid Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Stats, Ingredients, Steps) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 p-4 text-center rounded-2xl shadow-md">
              <Clock className="mx-auto text-emerald-400 mb-1" size={20} />
              <p className="text-[10px] uppercase text-zinc-500 font-semibold">Prep Time</p>
              <p className="text-sm font-bold text-white mt-0.5">{recipe.preparationTime} mins</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-4 text-center rounded-2xl shadow-md">
              <Tag className="mx-auto text-emerald-400 mb-1" size={20} />
              <p className="text-[10px] uppercase text-zinc-500 font-semibold">Category</p>
              <p className="text-sm font-bold text-white mt-0.5">{recipe.category}</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-4 text-center rounded-2xl shadow-md">
              <MapPin className="mx-auto text-emerald-400 mb-1" size={20} />
              <p className="text-[10px] uppercase text-zinc-500 font-semibold">Cuisine</p>
              <p className="text-sm font-bold text-white mt-0.5">{recipe.cuisineType}</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-4 text-center rounded-2xl shadow-md">
              <Heart className="mx-auto text-emerald-400 mb-1" size={20} />
              <p className="text-[10px] uppercase text-zinc-500 font-semibold">Difficulty</p>
              <p className="text-sm font-bold text-white mt-0.5">{recipe.difficultyLevel}</p>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400">🥗</span> Ingredients
            </h2>

            <div className="text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-zinc-950 p-5 rounded-2xl border border-zinc-800/80">
              {recipe.ingredients}
            </div>
          </div>

          {/* Instructions Section */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-emerald-400">👨‍🍳</span> Preparation Instructions
            </h2>

            <div className="text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-zinc-950 p-5 rounded-2xl border border-zinc-800/80">
              {recipe.instructions}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          
          {/* Purchase Form Card */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2">Unlock Full Access</h3>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              Support the author and get permanent access to premium recipe notes and instructions.
            </p>

            <form
              action="/api/checkout_recipe"
              method="POST"
              onSubmit={(e) => {
                if (UserEmail === authorEmail) {
                  e.preventDefault();
                  toast.error("You cannot buy your own recipe!");
                } else if (User?.role === 'Admin') {
                  e.preventDefault();
                  toast.error('Admins cannot purchase recipes!');
                }
              }}
            >
              <input type="hidden" name="recipeId" value={recipe._id} />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-950/50 transition-all text-sm"
              >
                <ShoppingCart size={18} />
                Buy Recipe Access
              </button>
            </form>
          </div>

          {/* Author Card */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl text-center">
            <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 mx-auto flex items-center justify-center mb-3">
              <User2 className="text-emerald-400" size={32} />
            </div>
            <h3 className="font-bold text-white text-base">
              {recipe.authorName}
            </h3>
            <p className="text-xs text-zinc-400 mt-1 truncate">
              {recipe.authorEmail}
            </p>
            <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center text-xs">
              <span className="text-zinc-500">Status</span>
              <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 font-semibold rounded-full uppercase text-[10px]">
                {recipe.status || 'Active'}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}