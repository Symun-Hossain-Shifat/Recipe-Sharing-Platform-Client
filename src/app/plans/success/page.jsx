import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PostPayment, PostRecipePayment } from "@/lib/PostData/Payment";
import { EditUserInfo } from "@/lib/EditData/User";

import { GetUserInserver } from "@/lib/GetUser/Getuserinfo";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams; 
  const User = await GetUserInserver() 
  const UserId = User?._id
  
  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const {
    status,
    metadata,
    customer_details: { email: customerEmail },
    payment_intent,
    amount_total,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    if(metadata.paymentType === 'premium'){
    const Data = {
      email: customerEmail,
      UserId : UserId , 
      amount : amount_total ,
     
    transactionId : payment_intent?.id  ,
      paymentStatus : 'Paid' ,
      PlanID: metadata.planid, 
      AuthorName : metadata.name 
    };
    const response = await EditUserInfo({ isBlocked : User?.isBlocked , isPremium: "Premium" , name : User?.name , image : User?.image }, customerEmail); 
    
    console.log(Data)
   const result = await PostPayment(Data) 
   console.log(result)
    const membershipRef =
      payment_intent?.id?.slice(-6).toUpperCase() ?? "------";

    const amount = amount_total
      ? `$${(amount_total / 100).toFixed(2)}`
      : "—";

    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg bg-white border border-gray-200 rounded-3xl p-8 md:p-10 text-center shadow-2xl">

          {/* Success Animation */}
          <div className="relative inline-flex items-center justify-center mb-7">
            <span className="absolute w-24 h-24 rounded-full bg-green-400 animate-ping opacity-20" />

            <div className="relative w-20 h-20 rounded-full bg-green-50 border border-green-300 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Header */}
          <p className="text-[11px] tracking-[0.3em] uppercase text-orange-500 mb-2">
            Premium Activated
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Welcome to RecipeHub Premium 🎉
          </h1>

          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Your premium membership has been successfully activated.
            A confirmation has been sent to{" "}
            <span className="text-gray-900 font-medium">
              {customerEmail}
            </span>
          </p>

          {/* Membership Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              {
                label: "Plan",
                value: "Premium",
              },
              {
                label: "Amount",
                value: amount,
              },
              {
                label: "Status",
                value: "Active",
                active: true,
              },
            ].map(({ label, value, active }) => (
              <div
                key={label}
                className="bg-gray-50 border border-gray-200 rounded-xl p-3"
              >
                <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                  {label}
                </p>

                <p
                  className={`text-sm font-semibold ${
                    active
                      ? "text-green-600 flex items-center justify-center gap-1"
                      : "text-gray-900"
                  }`}
                >
                  {active && (
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                  )}
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Premium Benefits */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 mb-5 text-left">
            <h3 className="text-gray-900 font-semibold mb-4">
              Premium Benefits Unlocked 🚀
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>✓ Create & Share Unlimited Recipes</li>
              <li>✓ Premium Member Badge</li>
              <li>✓ Enhanced Recipe Visibility</li>
              <li>✓ Priority Customer Support</li>
              <li>✓ Early Access to New Features</li>
            </ul>
          </div>

          {/* Details */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden mb-6">
            {[
              {
                label: "Premium Account",
                value: customerEmail,
              },
              {
                label: "Membership ID",
                value: membershipRef,
              },
              {
                label: "Activation Date",
                value: date,
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center px-4 py-3 border-b border-gray-200 last:border-b-0"
              >
                <span className="text-xs text-gray-500">
                  {label}
                </span>

                <span className="text-xs text-gray-800 truncate max-w-[180px]">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/Recipes"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-xl transition-all text-center"
            >
              Explore Recipes
            </Link>

            <Link
              href={`/Dashboard/${User?.role}`}
              className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all text-center"
            >
              Go to Dashboard
            </Link>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-500 mt-6">
            Need help? Contact{" "}
            <a
              href="mailto:support@recipehub.com"
              className="text-orange-500 hover:underline"
            >
              support@recipehub.com
            </a>
          </p>
        </div>
      </main>
    );
  } if (metadata.paymentType === "recipe") { 
    // console.log(metadata)
  const Data = {
    email: customerEmail,
      UserId : UserId , 
      recipeName: metadata.recipeName,
      category : metadata.category ,
       cuisineType: metadata.cuisineType,
      difficultyLevel: metadata.difficultyLevel ,
      preparationTime: metadata.preparationTime ,
       AuthorName : metadata.name ,
    
    amount: amount_total,
    transactionId: payment_intent?.id,
    paymentStatus: "Paid",
    
   
  };

  await PostRecipePayment(Data);

  const transactionRef =
    payment_intent?.id?.slice(-8).toUpperCase() ?? "--------";

  const amount = amount_total
    ? `$${(amount_total / 100).toFixed(2)}`
    : "—";

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-2xl">

        {/* Success Animation */}
        <div className="relative flex justify-center mb-7">
          <span className="absolute w-24 h-24 rounded-full bg-green-400 animate-ping opacity-20" />

          <div className="relative w-20 h-20 rounded-full bg-green-50 border border-green-300 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Header */}

        <p className="text-[11px] tracking-[0.3em] uppercase text-orange-500 text-center mb-2">
          Recipe Purchased Successfully
        </p>

        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-3">
          Enjoy Your Premium Recipe 🍽️
        </h1>

        <p className="text-gray-600 text-sm leading-relaxed text-center mb-8">
          Your payment has been completed successfully.
          This premium recipe has been added to your account and can now be
          accessed anytime.
        </p>

        {/* Stats */}

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            {
              label: "Recipe",
              value: "Unlocked",
            },
            {
              label: "Amount",
              value: amount,
            },
            {
              label: "Status",
              value: "Paid",
              active: true,
            },
          ].map(({ label, value, active }) => (
            <div
              key={label}
              className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center"
            >
              <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">
                {label}
              </p>

              <p
                className={`text-sm font-semibold ${
                  active
                    ? "text-green-600 flex items-center justify-center gap-1"
                    : "text-gray-900"
                }`}
              >
                {active && (
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                )}

                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits */}

        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 mb-6">
          <h3 className="text-gray-900 font-semibold mb-4">
            What You Unlocked 🍳
          </h3>

          <ul className="space-y-3 text-sm text-gray-600">
            <li>✓ Full Recipe Access</li>
            <li>✓ Complete Ingredients List</li>
            <li>✓ Step-by-Step Cooking Instructions</li>
            <li>✓ Lifetime Access from Your Profile</li>
            <li>✓ Revisit Anytime Without Repurchasing</li>
          </ul>
        </div>

        {/* Purchase Details */}

        <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden mb-6">
          {[
            {
              label: "Purchased By",
              value: customerEmail,
            },
            {
              label: "Transaction ID",
              value: transactionRef,
            },
            {
              label: "Purchase Date",
              value: date,
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between items-center px-4 py-3 border-b border-gray-200 last:border-b-0"
            >
              <span className="text-xs text-gray-500">
                {label}
              </span>

              <span className="text-xs font-medium text-gray-800 truncate max-w-[180px]">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/Recipes/${metadata.recipeId}`}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-xl transition text-center"
          >
            View Recipe
          </Link>

          <Link
            href="/Recipes"
            className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl transition text-center"
          >
            Browse Recipes
          </Link>
        </div>

        {/* Footer */}

        <p className="text-xs text-gray-500 text-center mt-6">
          Thank you for supporting RecipeHub ❤️
          <br />
          Happy Cooking!
        </p>

      </div>
    </main>
  );
}
  }  

  
 
 
 



  return redirect("/");
}