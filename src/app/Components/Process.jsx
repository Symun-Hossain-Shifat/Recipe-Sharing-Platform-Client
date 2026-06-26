import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { GiSelfLove } from "react-icons/gi";
import { MdOutlineWorkspacePremium } from "react-icons/md";

export default function Processpage() {
  const steps = [
    {
      number: "01",
      icon: <FaRegUser size={30} /> ,
      title: "Create your account",
      description:
        "Sign up for free in seconds. Set up your profile and join RecipeHub instantly.",
      tag: "Free to join",
      tagColor: "bg-emerald-50 text-emerald-700",
    },
    {
      number: "02",
      icon:<AiFillEdit size={30} />,
      title: "Publish your recipe",
      description:
        "Add ingredients, steps, photos. Free users can publish up to 2 recipes.",
      tag: "2 free recipes",
      tagColor: "bg-blue-50 text-blue-700",
    },
    {
      number: "03",
      icon: <FiSearch size={30} />,
      title: "Discover recipes",
      description:
        "Browse thousands of recipes and filter by cuisine, category, or time.",
      tag: "Smart search",
      tagColor: "bg-violet-50 text-violet-700",
    },
    {
      number: "04",
      icon:<GiSelfLove size={30} />,
      title: "Save favourites",
      description:
        "Save your favorite recipes and access them anytime from your profile.",
      tag: "Your collection",
      tagColor: "bg-rose-50 text-rose-700",
    },
    {
      number: "05",
      icon: <MdOutlineWorkspacePremium size={30} />,
      title: "Go premium",
      description:
        "Upgrade to Premium for unlimited recipe posting and grow your presence.",
      tag: "Unlimited recipes",
      tagColor: "bg-amber-50 text-amber-700",
    },
  ];

  const highlights = [
    { value: "38,000+", label: "Recipes published" },
    { value: "12,400+", label: "Active cooks" },
    { value: "15+", label: "Cuisine types" },
    { value: "4.8★", label: "User rating" },
  ];

  return (
    <section className="py-20 px-4 text-black dark:text-white max-w-6xl mx-auto">

      {/* Header */}
      <div className="text-center mb-14">
        <span className="text-xs uppercase tracking-widest text-gray-600 ">
          Platform overview
        </span>

        <h2 className="text-4xl font-semibold text-gray-600 mt-2">
          How RecipeHub works
        </h2>

        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          From signup to sharing recipes — everything is simple, fast and community-driven.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
        {highlights.map((item) => (
          <div
            key={item.label}
            className="bg-orange-50 dark:bg-black dark:text-white border border-orange-100 rounded-2xl p-5 text-center"
          >
            <p className="text-2xl font-bold text-orange-600">
              {item.value}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-6">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="flex gap-5 group"
          >

            {/* Icon */}
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-black  border border-gray-100 flex items-center justify-center group-hover:border-orange-200 transition">
                {step.icon}
              </div>

              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center">
                {index + 1}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 bg-white dark:bg-black border border-gray-100 rounded-2xl p-5 hover:border-orange-200 transition">

              <div className="flex justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono  text-gray-300">
                    {step.number}
                  </span>

                  <h3 className="text-base font-semibold  text-gray-700">
                    {step.title}
                  </h3>
                </div>

                <span className={`text-[10px] px-2 py-1 rounded-full ${step.tagColor}`}>
                  {step.tag}
                </span>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed">
                {step.description}
              </p>

            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-14 bg-orange-50 dark:bg-black dark:text-white border border-orange-100 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            Ready to start cooking?
          </h3>
          <p className="text-sm text-gray-500">
            Join free today — no credit card required.
          </p>
        </div>

        <div className="flex gap-3">
            <Link href={'/signup'}>
            <button className="px-5 py-2.5 text-sm border border-orange-200 text-orange-600 rounded-xl hover:bg-orange-100 transition">
            See recipes
          </button>
            </Link>
          
         <Link href={'/signup'}>
          <button className="px-5 py-2.5 text-sm bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition">
            Get started
          </button>
         </Link>
         
        </div>

      </div>

    </section>
  );
}