"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AiFillEdit } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { GiSelfLove } from "react-icons/gi";
import { MdOutlineWorkspacePremium } from "react-icons/md";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -25 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

export default function Processpage() {
  const steps = [
    {
      number: "01",
      icon: <FaRegUser className="text-emerald-400 text-xl" />,
      title: "Create Your Account",
      description:
        "Sign up for free in seconds. Set up your profile and join RecipeHub instantly.",
      tag: "Free to join",
      tagColor: "bg-emerald-950/70 border border-emerald-800/50 text-emerald-400",
    },
    {
      number: "02",
      icon: <AiFillEdit className="text-emerald-400 text-xl" />,
      title: "Publish Your Recipe",
      description:
        "Add ingredients, cooking steps, and mouthwatering photos. Free users can publish up to 2 recipes.",
      tag: "2 free recipes",
      tagColor: "bg-zinc-800 border border-zinc-700 text-zinc-300",
    },
    {
      number: "03",
      icon: <FiSearch className="text-emerald-400 text-xl" />,
      title: "Discover Recipes",
      description:
        "Browse thousands of community recipes filtered by cuisine, diet, or prep time.",
      tag: "Smart search",
      tagColor: "bg-zinc-800 border border-zinc-700 text-zinc-300",
    },
    {
      number: "04",
      icon: <GiSelfLove className="text-emerald-400 text-xl" />,
      title: "Save Favorites",
      description:
        "Bookmark your favorite dishes and access them anytime from your personalized collection.",
      tag: "Your collection",
      tagColor: "bg-zinc-800 border border-zinc-700 text-zinc-300",
    },
    {
      number: "05",
      icon: <MdOutlineWorkspacePremium className="text-amber-400 text-xl" />,
      title: "Go Premium",
      description:
        "Upgrade to Premium for unlimited recipe postings and grow your culinary reach.",
      tag: "Unlimited recipes",
      tagColor: "bg-amber-950/70 border border-amber-800/50 text-amber-400",
    },
  ];

  const highlights = [
    { value: "38,000+", label: "Recipes Published" },
    { value: "12,400+", label: "Active Home Chefs" },
    { value: "15+", label: "Cuisine Categories" },
    { value: "4.9★", label: "Community Rating" },
  ];

  return (
    <section className="py-16 px-4 text-white max-w-6xl mx-auto relative overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold px-3 py-1 bg-emerald-950/60 border border-emerald-800/50 rounded-full">
          Platform Overview
        </span>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 tracking-tight">
          How RecipeHub Works
        </h2>

        <p className="text-zinc-400 mt-3 max-w-xl mx-auto text-sm sm:text-base">
          From signup to sharing recipes — everything is simple, fast, and community-driven.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
      >
        {highlights.map((item) => (
          <motion.div
            key={item.label}
            variants={statVariants}
            whileHover={{ y: -4, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 rounded-2xl p-5 text-center shadow-lg transition-colors"
          >
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
              {item.value}
            </p>
            <p className="text-xs text-zinc-400 mt-1 font-medium">
              {item.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Steps */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="flex flex-col gap-4"
      >
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            variants={stepVariants}
            whileHover={{ x: 6 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            className="flex flex-col sm:flex-row gap-4 group"
          >
            {/* Icon */}
            <div className="relative flex-shrink-0">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors shadow-md"
              >
                {step.icon}
              </motion.div>

              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shadow">
                {index + 1}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 group-hover:border-zinc-700 transition-colors shadow-lg">
              <div className="flex justify-between items-center flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-zinc-500">
                    {step.number}
                  </span>

                  <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {step.title}
                  </h3>
                </div>

                <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${step.tagColor}`}>
                  {step.tag}
                </span>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl transition-colors"
      >
        <div>
          <h3 className="text-lg font-bold text-white mb-1">
            Ready to Start Cooking?
          </h3>
          <p className="text-sm text-zinc-400">
            Join thousands of food enthusiasts today — completely free.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto">
          <Link href="/Recipes" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full px-5 py-2.5 text-sm font-medium border border-zinc-700 text-zinc-300 rounded-xl hover:bg-zinc-800 transition-colors"
            >
              Browse Recipes
            </motion.button>
          </Link>

          <Link href="/signup" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full px-5 py-2.5 text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-950/40 transition-colors"
            >
              Get Started Free
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}