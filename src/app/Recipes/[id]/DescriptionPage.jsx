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
  Bookmark,
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
  const authorEmail = recipe.authorEmail 
  const UserEmail = User?.email
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

    const Data = {
      useremail: User.email,
      userid: User.id,
      recipeid: recipe._id,
      authorEmail: recipe.authorEmail,
    };

    const result = await Postfavourite(Data, id);

    if (result) {
      toast.success("Added to favourite");
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
    <div className="w-11/12 p-7 dark:bg-black  dark:text-black rounded-md mx-auto my-5 bg-gradient-to-br from-orange-50 via-white to-emerald-50">
      <Link href="/Recipes">
        <button className="flex items-center gap-2 mb-5 px-4 py-2 bg-white shadow rounded-xl hover:bg-gray-100 transition">
          <ArrowLeft size={18} />
          Back
        </button>
      </Link>

      {/* Hero */}
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

      {/* Action Bar */}
      <div className="flex gap-3 mt-5 flex-wrap">
        <button
          onClick={HandleLike}
          disabled={liked}
          className={`flex items-center gap-2 px-4 py-2 shadow rounded-xl ${
            liked
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-white"
          }`}
        >
          <AiOutlineLike className="text-blue-500" size={30} />
          {likes}
        </button>

        <button
          onClick={Handlefavourite}
          className="flex items-center gap-2 px-4 py-2 bg-white shadow rounded-xl"
        >
          <Heart className="text-red-500" />
          {result1.length}
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-white shadow rounded-xl">
          <Bookmark />
          Save
        </button>

        <ReportPage recipe={recipe} />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
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
              {result1.length} Favourite
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-3">
              Ingredients
            </h2>

            <p className="text-gray-700 leading-relaxed">
              {recipe.ingredients}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-3">
              Instructions
            </h2>

            <p className="text-gray-700 leading-relaxed">
              {recipe.instructions}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <form
            action="/api/checkout_recipe"
            method="POST"
            onSubmit={(e) => {
              if (UserEmail === authorEmail) {
                e.preventDefault();
                toast.error("You cannot buy your own recipe! Please select another one.");
              }
            }}
          >
             <input type="hidden" name="recipeId" value={recipe._id} />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-emerald-500 text-white py-3 rounded-xl"
            >
              <ShoppingCart />
              Buy Recipe
            </button>
          </form>

          <div className="bg-white p-5 rounded-xl shadow text-center">
            <User2 className="mx-auto mb-2" />
            <h3 className="font-bold">
              {recipe.authorName}
            </h3>
            <p className="text-sm text-gray-500">
              {recipe.authorEmail}
            </p>
          </div>

          <div className="bg-green-50 text-green-700 p-4 rounded-xl text-center text-sm">
            Status: {recipe.status}
          </div>
        </div>
      </div>
    </div>
  );
}