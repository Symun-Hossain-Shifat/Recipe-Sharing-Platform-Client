import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { GetUserInserver } from '@/lib/GetUser/Getuserinfo'
import { Getspecificrecipes } from '@/lib/GetApiData/recipe';

export async function POST(req) {
  try {
    const formData = await req.formData();
      const id = formData.get("recipeId");
    const headersList = await headers()
    const origin = headersList.get('origin') 
    const User = await GetUserInserver() 
    console.log(User?.email)
    const Data = await Getspecificrecipes(id) 
    const result = Data[0]
    console.log(result)
    // console.log('Hello')
    const session = await stripe.checkout.sessions.create({ 
       customer_email : User?.email , 
     
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: 'price_1TmX3MPaNvdwLRIro7VrqEMz',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`, 
      cancel_url: `${origin}/plans`,

        metadata: {
          paymentType : 'recipe' ,
          recipeId: result._id.toString(),
          name : result.authorName, 
          email : User?.email ,
          recipeName: result.recipeName,
           category : result.category ,
            cuisineType: result.cuisineType,
            difficultyLevel: result.difficultyLevel ,
            preparationTime: result.preparationTime ,
        },
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
} 
