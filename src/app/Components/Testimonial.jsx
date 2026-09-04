"use client";

import React from "react";
import { motion } from "framer-motion";

import { FaRegStar } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { TbFreeRights } from "react-icons/tb";

export const sectionVariant = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const headingVariant = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const cardVariant = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 16,
    },
  },
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={
            index < rating
              ? "text-amber-400"
              : "text-zinc-700"
          }
        >
          <FaRegStar className="text-xs sm:text-sm" />
        </span>
      ))}

      <span className="ml-1.5 text-xs font-mono text-zinc-400">
        {rating}.0
      </span>
    </div>
  );
}

function PlanBadge({ plan }) {
  const isPremium = plan === "Premium";

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold mt-1 ${
        isPremium
          ? "bg-amber-950/70 border border-amber-800/50 text-amber-400"
          : "bg-zinc-800 border border-zinc-700 text-zinc-300"
      }`}
    >
      {isPremium ? (
        <>
          <MdWorkspacePremium className="text-amber-400 text-xs" />
          Premium
        </>
      ) : (
        <>
          <TbFreeRights className="text-zinc-400 text-xs" />
          Free User
        </>
      )}
    </span>
  );
}

function ReviewCard({ review }) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{
        y: -6,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 18,
      }}
      className={`bg-zinc-900 rounded-2xl p-6 shadow-xl flex flex-col h-full ${
        review.featured
          ? "border-2 border-emerald-500/80 bg-zinc-900/95"
          : "border border-zinc-800"
      }`}
    >
      {/* Badge */}
      <div className="h-7 mb-2 flex items-center justify-between">
        {review.featured ? (
          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/80 border border-emerald-800/60 text-emerald-400">
            <FaRegStar className="text-xs" />
            Featured Review
          </span>
        ) : (
          <span />
        )}
      </div>

      {/* Rating */}
      <StarRating rating={review.rating} />

      {/* Review Text */}
      <div className="my-4 flex-1">
        <p className="text-sm text-zinc-300 leading-relaxed italic">
          "{review.text}"
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-zinc-800/80 pt-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm bg-zinc-800 border border-zinc-700 ${review.avatarColor}`}>
            {review.initials}
          </div>

          <div>
            <h4 className="font-semibold text-sm text-white">
              {review.name}
            </h4>

            <p className="text-xs text-zinc-400">
              {review.role}
            </p>

            <PlanBadge plan={review.plan} />
          </div>
        </div>
      </div>
    </motion.div>
  );
} 

export default function TestimonialsSection() {
  const reviews = [
    {
      id: 1,
      rating: 5,
      text: "RecipeHub has made cooking so much more fun! I discover something new every day and the community is helpful.",
      name: "Sadia Ahmed",
      role: "Home Chef · Dhaka",
      initials: "SA",
      plan: "Premium",
      featured: true,
      avatarColor: "text-emerald-400",
    },
    {
      id: 2,
      rating: 5,
      text: "With Premium membership I can share unlimited recipes. It is the perfect platform for growing my culinary audience!",
      name: "Rahim Khan",
      role: "Food Blogger · Chittagong",
      initials: "RK",
      plan: "Premium",
      featured: false,
      avatarColor: "text-amber-400",
    },
    {
      id: 3,
      rating: 4,
      text: "Filtering by prep time makes finding quick recipes super easy. As a working parent this feature is an absolute life-saver!",
      name: "Nusrat Islam",
      role: "Working Parent · Sylhet",
      initials: "NI",
      plan: "Free",
      featured: false,
      avatarColor: "text-blue-400",
    },
    {
      id: 4,
      rating: 5,
      text: "Saving favorite recipes is brilliant. I can access them anytime I want. The dark user interface is super clean and sleek.",
      name: "Marium Begum",
      role: "Recipe Collector · Rajshahi",
      initials: "MB",
      plan: "Free",
      featured: false,
      avatarColor: "text-purple-400",
    },
    {
      id: 5,
      rating: 5,
      text: "Filtering by cuisine lets me find Bangladeshi, Italian, and Thai recipes all in one place. Incredible experience overall!",
      name: "Tanvir Hasan",
      role: "Executive Chef · Cumilla",
      initials: "TH",
      plan: "Premium",
      featured: false,
      avatarColor: "text-emerald-400",
    },
    {
      id: 6,
      rating: 4,
      text: "Updating my profile was very seamless. Managing my uploaded recipes and seeing community feedback is truly rewarding.",
      name: "Zara Akter",
      role: "Culinary Student · Khulna",
      initials: "ZA",
      plan: "Free",
      featured: false,
      avatarColor: "text-pink-400",
    },
  ];

  return (
    <motion.section
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative overflow-hidden max-w-7xl mx-auto px-4 py-16 text-white"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <motion.div
        variants={headingVariant}
        className="text-center mb-12 relative z-10"
      >
        <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold px-3 py-1 bg-emerald-950/60 border border-emerald-800/50 rounded-full">
          Community Feedback
        </span>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 tracking-tight">
          What Our Food Lovers Say
        </h2>

        <p className="text-zinc-400 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
          Thousands of food enthusiasts use RecipeHub every day to discover,
          save, and share amazing recipes around the globe.
        </p>
      </motion.div>

      {/* Review Grid */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
      >
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </motion.div>

      {/* Footer Rating Summary */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          delay: 0.3,
          duration: 0.5,
        }}
        className="text-center mt-12 relative z-10"
      >
        <div className="text-amber-400 text-lg flex justify-center gap-1 mb-2">
          {[...Array(5)].map((_, index) => (
            <FaRegStar key={index} />
          ))}
        </div>

        <p className="font-bold text-white text-base">
          4.9 out of 5 Rating
        </p>

        <p className="text-xs text-zinc-400 mt-1">
          Based on 3,200+ reviews from active RecipeHub chefs and food lovers
        </p>
      </motion.div>
    </motion.section>
  );
}