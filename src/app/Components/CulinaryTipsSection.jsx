"use client";

import { useState } from "react";
import { ChefHat, Lightbulb, Clock, BookOpen, CheckCircle2, ChevronRight, Award } from "lucide-react";

export default function CulinaryTipsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tips = [
    {
      id: "sear-technique",
      title: "The Golden Rule of Pan-Searing",
      category: "Technique",
      time: "3 min read",
      level: "Intermediate",
      summary: "Achieve restaurant-quality crusts on proteins and veggies without sticking.",
      keyTakeaways: [
        "Preheat stainless steel pans dry until water drops dance (Leidenfrost effect).",
        "Pat all meat completely dry with paper towels before seasoning.",
        "Avoid crowding the pan to allow steam to escape rather than boiling."
      ],
      proTip: "Never flip protein too early; when the sear is ready, it naturally releases from the pan surface."
    },
    {
      id: "herb-storage",
      title: "Keep Fresh Herbs Crisp for Weeks",
      category: "Food Prep",
      time: "2 min read",
      level: "Beginner",
      summary: "Stop wasting tender herbs like cilantro, parsley, and basil with smart storage.",
      keyTakeaways: [
        "Trim stems and place tender herbs in a small glass jar with 1 inch of water.",
        "Cover loosely with a reusable silicone bag or plastic wrapping in the fridge.",
        "Keep basil at room temperature away from direct sunlight."
      ],
      proTip: "Freeze woodier herbs (rosemary, thyme) in olive oil using ice cube trays for instant cooking bases."
    },
    {
      id: "flavor-balancing",
      title: "Fixing Common Taste Imbalances",
      category: "Seasoning",
      time: "4 min read",
      level: "All Levels",
      summary: "How to rescue dishes that turn out too salty, acidic, spicy, or sweet.",
      keyTakeaways: [
        "Too salty? Add a raw potato slice or splash of cream/acid to balance.",
        "Too acidic? Balance with a tiny pinch of baking soda or honey.",
        "Too spicy? Dairy (yogurt, coconut milk) or peanut butter neutralizes capsaicin."
      ],
      proTip: "Always taste at room temperature near the end of cooking — cold dulls flavors, heat intensifies saltiness."
    },
    {
      id: "knife-skills",
      title: "Effortless Herb Chiffonade & Mincing",
      category: "Knife Work",
      time: "3 min read",
      level: "Beginner",
      summary: "Chop herbs without bruising the leaves or turning them into dark mush.",
      keyTakeaways: [
        "Stack leaves flat, roll them tightly like a cigar, and slice crosswise thinly.",
        "Keep your chef's knife blade razor sharp so it cuts rather than crushes cell walls.",
        "Slice once through; repeatedly rocking the knife over chopped herbs causes browning."
      ],
      proTip: "Dry herbs completely after washing before touching them with a knife blade."
    }
  ];

  return (
    <section className="py-20 bg-black text-white relative border-t border-zinc-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <ChefHat className="w-3.5 h-3.5" />
            <span>Chef's Academy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Culinary Tips & <span className="bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">Kitchen Hacks</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-base sm:text-lg">
            Master fundamental cooking secrets and techniques shared by passionate home cooks and professional chefs.
          </p>
        </div>

        {/* Responsive Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Buttons / List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {tips.map((tip, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={tip.id}
                  onClick={() => setActiveTab(idx)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 flex items-start justify-between group ${
                    isSelected
                      ? "bg-zinc-900 border-emerald-500/60 shadow-lg shadow-emerald-950/20 text-white"
                      : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                        isSelected ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-zinc-900 text-zinc-500"
                      }`}>
                        {tip.category}
                      </span>
                      <span className="text-xs text-zinc-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {tip.time}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {tip.title}
                    </h3>
                  </div>

                  <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                    isSelected ? "translate-x-1 text-emerald-400" : "text-zinc-600 group-hover:text-zinc-400"
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Featured Tip Active Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 relative flex flex-col justify-between min-h-[420px]">
            <div>
              {/* Card Meta */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                      {tips[activeTab].category} Guide
                    </span>
                    <h4 className="text-lg font-bold text-white">
                      {tips[activeTab].title}
                    </h4>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-300">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{tips[activeTab].level}</span>
                </div>
              </div>

              {/* Summary */}
              <p className="my-6 text-zinc-300 text-base leading-relaxed italic border-l-2 border-emerald-500 pl-4 py-1 bg-zinc-950/40 rounded-r-xl">
                "{tips[activeTab].summary}"
              </p>

              {/* Key Takeaways Checklist */}
              <div className="space-y-3 mb-8">
                <h5 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  Key Action Steps
                </h5>
                {tips[activeTab].keyTakeaways.map((step, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-zinc-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tip Highlight Footer Box */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm flex items-start gap-3">
              <ChefHat className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-400 uppercase text-[11px] tracking-wider block mb-0.5">Chef's Secret Pro Tip</span>
                <p className="text-emerald-100/90">{tips[activeTab].proTip}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
