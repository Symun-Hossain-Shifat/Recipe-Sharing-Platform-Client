"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Banner from "@/assets/Banner1.jpg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function BannerPage() {
  return (
    <section className="relative overflow-hidden my-6 sm:my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Animated Glow background accents */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none -z-10"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/3 right-1/4 -translate-y-1/2 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center shadow-2xl backdrop-blur-sm">
        {/* Left — Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start"
        >
          {/* Badge */}
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-emerald-950/80 text-emerald-400 text-xs font-semibold px-4 py-1.5 rounded-full border border-emerald-800/60 mb-6 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Trending Culinary Platform
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-white font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] mb-6"
          >
            Discover & Share{" "}
            <span className="text-emerald-400 underline decoration-emerald-500/40 underline-offset-8">
              Delicious Recipes
            </span>{" "}
            Worldwide
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-zinc-400 text-base sm:text-lg max-w-lg mb-8 leading-relaxed"
          >
            Explore thousands of authentic recipes created by passionate food lovers.
            Whether you are a beginner or a professional chef, RecipeHub gives you the
            tools to cook, share, and enjoy.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-10 w-full sm:w-auto"
          >
            <Link href="/Recipes" className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto text-center bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-950/50 transition-colors"
              >
                Explore Recipes 🧭
              </motion.div>
            </Link>
            <Link href="/plans" className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto text-center bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-medium text-sm px-7 py-3.5 rounded-xl transition-colors"
              >
                View Membership Plans
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80 w-full"
          >
            {[
              { num: "12K+", label: "Recipes Shared" },
              { num: "8K+", label: "Home Chefs" },
              { num: "4.9★", label: "Community Rating" },
            ].map(({ num, label }) => (
              <motion.div
                key={label}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-white font-bold text-xl sm:text-2xl">{num}</p>
                <p className="text-zinc-500 text-xs mt-0.5">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Image with floating cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex justify-center items-center"
        >
          <div className="relative w-full max-w-md">
            <div className="overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl group">
              <Image
                src={Banner}
                alt="RecipeHub Banner"
                width={500}
                height={500}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
            </div>

            {/* Floating card — top right */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-4 -right-2 sm:right-2 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-xl hover:border-emerald-500/50 transition-colors"
            >
              <span className="text-2xl animate-bounce">🍝</span>
              <div>
                <p className="text-white text-xs font-bold">Featured Dish</p>
                <p className="text-zinc-400 text-[11px]">Spaghetti Carbonara</p>
              </div>
            </motion.div>

            {/* Floating card — bottom left */}
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -bottom-4 -left-2 sm:left-2 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-xl hover:border-emerald-500/50 transition-colors"
            >
              <span className="text-2xl">❤️</span>
              <div>
                <p className="text-white text-xs font-bold">2.4K Saves</p>
                <p className="text-zinc-400 text-[11px]">Popular this week</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}