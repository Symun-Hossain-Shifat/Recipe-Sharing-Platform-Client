"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AiOutlineLike } from "react-icons/ai";
import { ChefHatIcon } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function AnimatedLikesGrid({ recipes, user }) {
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {recipes.map((recipe) => (
          <motion.div
            key={recipe._id}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-colors duration-300 flex flex-col group shadow-xl"
          >
            <div className="relative w-full h-52 overflow-hidden bg-zinc-950">
              <Image
                src={recipe.recipeImage}
                alt={recipe.recipeName}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-700/60 flex items-center gap-1.5 text-xs text-white shadow-md"
              >
                <AiOutlineLike className="text-emerald-400" />
                <span className="font-semibold">{recipe.likesCount || 0}</span>
              </motion.div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">
                  {recipe.recipeName}
                </h3>

                <p className="text-xs text-zinc-400 mt-1">
                  By <span className="text-zinc-200 font-medium">{recipe.authorName}</span>
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                <span className="text-xs text-emerald-400 font-medium bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-1 rounded-lg">
                  {recipe.category || "Recipe"}
                </span>

                <Link
                  href={user?.email ? `/Recipes/${recipe._id}` : "/unauthorized"}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 active:scale-95 shadow-md shadow-emerald-950/40"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex justify-center mt-12"
      >
        <Link href="/Recipes">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2.5 px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold rounded-2xl border border-zinc-800 hover:border-emerald-500/50 transition-all shadow-xl"
          >
            <ChefHatIcon
              size={18}
              className="text-emerald-400 group-hover:rotate-12 transition-transform duration-300"
            />
            Explore All Recipes
          </motion.button>
        </Link>
      </motion.div>
    </>
  );
}
