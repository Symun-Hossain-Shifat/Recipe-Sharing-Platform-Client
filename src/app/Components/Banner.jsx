import Image from 'next/image';
import Banner from '@/assets/Banner1.jpg';

export default function BannerPage() {
  return (
    <section className="relative overflow-hidden my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Background decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full -translate-y-1/2 translate-x-1/3 -z-10" />
      <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-yellow-50 rounded-full translate-y-1/3 -z-10" />

      <div className="bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 border border-orange-100 rounded-3xl px-6 sm:px-12 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Left — Content */}
        <div className="flex flex-col items-start z-10">

          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-medium px-3 py-1.5 rounded-full border border-orange-200 mb-5">
            🔥 Trending Recipes This Week
          </span>

          <h1 className="text-[#0B2545] font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-5">
            Discover & Share{' '}
            <span className="text-[#FF7A60]">Delicious Recipes</span>{' '}
            with RecipeHub
          </h1>

          <p className="text-[#4A6080] text-base sm:text-lg max-w-md mb-8 leading-relaxed">
            Explore thousands of homemade recipes from around the world. Whether
            you &apos;re a beginner or a pro chef, RecipeHub helps you find,
            share, and save your favorites.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            <button className="bg-[#FF7A60] hover:bg-[#ff6546] active:scale-95 text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow-sm transition-all duration-200">
              + Share Your Recipe
            </button>
            <button className="bg-white hover:bg-gray-50 active:scale-95 text-[#0B2545] border border-gray-200 font-medium text-sm px-6 py-3.5 rounded-full transition-all duration-200">
              🧭 Explore Recipes
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-6 border-t border-orange-100 w-full">
            {[
              { num: '12K+', label: 'Recipes Shared' },
              { num: '8K+',  label: 'Home Chefs' },
              { num: '4.9★', label: 'Avg. Rating' },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="text-[#0B2545] font-bold text-xl">{num}</p>
                <p className="text-[#7A94B0] text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Image with floating cards */}
        <div className="relative flex justify-center items-center z-10">
          <div className="relative w-full max-w-sm">
            <Image
              src={Banner}
              alt="RecipeHub Banner"
              width={500}
              height={500}
              className="rounded-2xl w-full h-auto object-cover"
              priority
            />

            {/* Floating card — top right */}
            <div className="absolute -top-4 -right-4 sm:right-0 bg-white border border-orange-100 rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm">
              <span className="text-xl">🍝</span>
              <div>
                <p className="text-[#0B2545] text-xs font-semibold leading-tight">New Recipe</p>
                <p className="text-[#7A94B0] text-[10px]">Spaghetti Carbonara</p>
              </div>
            </div>

            {/* Floating card — bottom left */}
            <div className="absolute -bottom-4 -left-4 sm:left-0 bg-white border border-orange-100 rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm">
              <span className="text-xl">❤️</span>
              <div>
                <p className="text-[#0B2545] text-xs font-semibold leading-tight">2.4K Saves</p>
                <p className="text-[#7A94B0] text-[10px]">This month</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}