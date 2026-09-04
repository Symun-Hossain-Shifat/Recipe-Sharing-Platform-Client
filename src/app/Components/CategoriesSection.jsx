"use client";

import Link from "next/link";
import { Utensils, Flame, Leaf, Cake, Soup, Timer, ArrowRight, Sparkles } from "lucide-react";

export default function CategoriesSection() {
  const categories = [
    {
      id: "quick-easy",
      title: "Quick 15-Min Meals",
      description: "Fast, flavorful dishes perfect for busy weeknights without sacrificing quality.",
      count: "150+ Recipes",
      icon: Timer,
      badge: "Popular",
      color: "from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30",
    },
    {
      id: "italian",
      title: "Italian & Pasta",
      description: "Authentic handmade pasta, wood-fired style pizzas, and rich savory sauces.",
      count: "120+ Recipes",
      icon: Utensils,
      badge: "Classic",
      color: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30",
    },
    {
      id: "healthy-vegan",
      title: "Healthy & Plant-Based",
      description: "Nourishing vegan, vegetarian, and gluten-free recipes packed with nutrients.",
      count: "95+ Recipes",
      icon: Leaf,
      badge: "Fresh",
      color: "from-green-500/20 to-emerald-500/10 text-green-400 border-green-500/30",
    },
    {
      id: "desserts",
      title: "Decadent Desserts",
      description: "Indulgent cakes, pastries, artisanal chocolates, and sweet frozen treats.",
      count: "110+ Recipes",
      icon: Cake,
      badge: "Sweet",
      color: "from-pink-500/20 to-rose-500/10 text-pink-400 border-pink-500/30",
    },
    {
      id: "asian-fusion",
      title: "Asian Fusion & Ramen",
      description: "Aromatic curries, hot stir-fries, savory ramen bowls, and delicate dim sum.",
      count: "135+ Recipes",
      icon: Soup,
      badge: "Trending",
      color: "from-red-500/20 to-amber-500/10 text-red-400 border-red-500/30",
    },
    {
      id: "grill-bbq",
      title: "Sizzling BBQ & Grills",
      description: "Smoky grilled meats, tender marinades, flame-roasted veggies, and rich rubs.",
      count: "80+ Recipes",
      icon: Flame,
      badge: "Chef's Choice",
      color: "from-orange-500/20 to-red-500/10 text-orange-400 border-orange-500/30",
    },
  ];

  return (
    <section className="py-20 bg-black text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Cuisines</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Popular Recipe <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Categories</span>
            </h2>
            <p className="mt-3 text-zinc-400 text-base sm:text-lg max-w-xl">
              Browse through curated culinary collections handpicked by top home chefs and food experts.
            </p>
          </div>

          <Link
            href="/Recipes"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800 text-zinc-200 hover:text-white text-sm font-semibold transition-all duration-300 group self-start md:self-auto"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href="/Recipes"
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-emerald-500/50 hover:bg-zinc-900/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/30"
              >
                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3.5 rounded-xl bg-gradient-to-br ${cat.color} border`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                      {cat.count}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                {/* Card Footer Link Hint */}
                <div className="flex items-center text-xs font-semibold text-zinc-500 group-hover:text-emerald-400 transition-colors pt-4 border-t border-zinc-900 group-hover:border-zinc-800/60">
                  <span>Explore recipes</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
