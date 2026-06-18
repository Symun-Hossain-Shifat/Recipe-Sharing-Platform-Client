const stats = [
  { id: 1, value: "12,400+", label: "Active Users" },
  { id: 2, value: "4.8 / 5", label: "Average Rating" },
  { id: 3, value: "38,000+", label: "Recipes Shared" },
];

const reviews = [
  {
    id: 1,
    rating: 5,
    text: "RecipeHub has made cooking so much more fun. I discover something new every day and the community is absolutely amazing!",
    name: "Sadia Ahmed",
    role: "Home Cook · Dhaka",
    initials: "SA",
    plan: "Premium",
    featured: true,
    avatarColor: "bg-violet-100 text-violet-700",
  },
  {
    id: 2,
    rating: 5,
    text: "After getting Premium membership I can share unlimited recipes. It is the perfect platform for my food blog!",
    name: "Rahim Khan",
    role: "Food Blogger · Chittagong",
    initials: "RK",
    plan: "Premium",
    featured: false,
    avatarColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 3,
    rating: 4,
    text: "Filtering by prep time makes finding quick recipes super easy. As a working mom this feature is an absolute life-saver!",
    name: "Nusrat Islam",
    role: "Working Mom · Sylhet",
    initials: "NI",
    plan: "Free",
    featured: false,
    avatarColor: "bg-orange-100 text-orange-700",
  },
  {
    id: 4,
    rating: 5,
    text: "Saving favourite recipes is brilliant. I can access them any time I want. The UI is clean, simple, and very easy to use.",
    name: "Marium Begum",
    role: "Housewife · Rajshahi",
    initials: "MB",
    plan: "Free",
    featured: false,
    avatarColor: "bg-pink-100 text-pink-700",
  },
  {
    id: 5,
    rating: 5,
    text: "Filtering by cuisine lets me find Bangladeshi, Italian, Thai recipes all in one place. Incredible experience overall!",
    name: "Tanvir Hasan",
    role: "Chef · Cumilla",
    initials: "TH",
    plan: "Premium",
    featured: false,
    avatarColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 6,
    rating: 4,
    text: "Updating my profile was very easy. I can present myself to the community and recipe sharing has become truly enjoyable.",
    name: "Zara Akter",
    role: "Student · Khulna",
    initials: "ZA",
    plan: "Free",
    featured: false,
    avatarColor: "bg-green-100 text-green-700",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={index < rating ? "text-amber-400" : "text-gray-200"}
        >
          ★
        </span>
      ))}
      <span className="ml-1 text-xs text-gray-400">{rating}.0</span>
    </div>
  );
}

function PlanBadge({ plan }) {
  const isPremium = plan === "Premium";

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium mt-1 ${
        isPremium
          ? "bg-violet-100 text-violet-700"
          : "bg-emerald-100 text-emerald-700"
      }`}
    >
      {isPremium ? "👑 Premium" : "🟢 Free"}
    </span>
  );
}

function ReviewCard({ review }) {
  return (
    <div
      className={`bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full ${
        review.featured
          ? "border-2 border-orange-400"
          : "border border-gray-100"
      }`}
    >
      {/* Fixed Badge Area */}
      <div className="h-8 mb-3">
        {review.featured && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600">
            ⭐ Top Review
          </span>
        )}
      </div>

      {/* Rating */}
      <StarRating rating={review.rating} />

      {/* Text (Fixed Height) */}
      <div className="h-28 mt-3 overflow-hidden">
        <p className="text-sm text-gray-600 leading-relaxed">
          "{review.text}"
        </p>
      </div>

      {/* Footer (Always Bottom) */}
      <div className="mt-auto border-t pt-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${review.avatarColor}`}
          >
            {review.initials}
          </div>

          <div>
            <h4 className="font-medium text-gray-900">
              {review.name}
            </h4>

            <p className="text-xs text-gray-500">
              {review.role}
            </p>

            <PlanBadge plan={review.plan} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="text-orange-500 text-sm font-semibold uppercase tracking-wider">
          Community Love
        </span>

        <h2 className="text-4xl font-bold text-gray-900 mt-3">
          What Our Food Lovers Say
        </h2>

        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Thousands of food enthusiasts use RecipeHub every day to
          discover, save, and share amazing recipes.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-orange-50 rounded-2xl p-6 text-center"
          >
            <h3 className="text-3xl font-bold text-orange-600">
              {stat.value}
            </h3>
            <p className="text-gray-600 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-12">
        <div className="text-amber-400 text-xl mb-2">★★★★★</div>
        <p className="font-medium text-gray-800">
          4.8 out of 5 rating
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Based on 3,200+ reviews from real RecipeHub users
        </p>
      </div>
    </section>
  );
}