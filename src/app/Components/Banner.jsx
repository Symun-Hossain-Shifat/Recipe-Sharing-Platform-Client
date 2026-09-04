import Image from 'next/image';
import Link from 'next/link';
import Banner from '@/assets/Banner1.jpg';

export default async function BannerPage() {
  return (
    <section className="relative overflow-hidden my-6 sm:my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Glow background accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center shadow-2xl">

        {/* Left — Content */}
        <div className="flex flex-col items-start">

          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-emerald-950/80 text-emerald-400 text-xs font-semibold px-4 py-1.5 rounded-full border border-emerald-800/60 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Trending Culinary Platform
          </span>

          <h1 className="text-white font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] mb-6">
            Discover & Share{' '}
            <span className="text-emerald-400 underline decoration-emerald-500/40 underline-offset-8">Delicious Recipes</span>{' '}
            Worldwide
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
            Explore thousands of authentic recipes created by passionate food lovers. 
            Whether you are a beginner or a professional chef, RecipeHub gives you the tools to cook, share, and enjoy.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-10 w-full sm:w-auto">
            <Link 
              href="/Recipes" 
              className="w-full sm:w-auto text-center bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-950/50 transition-all"
            >
              Explore Recipes 🧭
            </Link>
            <Link 
              href="/plans" 
              className="w-full sm:w-auto text-center bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-200 border border-zinc-700 font-medium text-sm px-7 py-3.5 rounded-xl transition-all"
            >
              View Membership Plans
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80 w-full">
            {[
              { num: '12K+', label: 'Recipes Shared' },
              { num: '8K+',  label: 'Home Chefs' },
              { num: '4.9★', label: 'Community Rating' },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="text-white font-bold text-xl sm:text-2xl">{num}</p>
                <p className="text-zinc-500 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Image with floating cards */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-full max-w-md">
            <div className="overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl">
              <Image
                src={Banner}
                alt="RecipeHub Banner"
                width={500}
                height={500}
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>

            {/* Floating card — top right */}
            <div className="absolute -top-4 -right-2 sm:right-2 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-xl">
              <span className="text-2xl">🍝</span>
              <div>
                <p className="text-white text-xs font-bold">Featured Dish</p>
                <p className="text-zinc-400 text-[11px]">Spaghetti Carbonara</p>
              </div>
            </div>

            {/* Floating card — bottom left */}
            <div className="absolute -bottom-4 -left-2 sm:left-2 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-xl px-4 py-2.5 flex items-center gap-3 shadow-xl">
              <span className="text-2xl">❤️</span>
              <div>
                <p className="text-white text-xs font-bold">2.4K Saves</p>
                <p className="text-zinc-400 text-[11px]">Popular this week</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}