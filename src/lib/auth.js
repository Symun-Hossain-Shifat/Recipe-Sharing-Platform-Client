import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);

// connect once
await client.connect();

const db = client.db("RecipyHubproject");

export const auth = betterAuth({
  database: mongodbAdapter(db), 
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID  ,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET 
        }, 
    },

  emailAndPassword: {
    enabled: true,
  },
  session : {
    cookieCache : {
      enabled : true ,
      strategy  : 'jwt' ,
      maxAge  : 7 * 24 * 60 * 60
    }
  },
  plugins : [
    jwt()
  ],
  user: {
    additionalFields: {
      role: {
        defaultValue: 'User' ,
      },
      isPremium : {
         defaultValue  : 'Free'
      },
      isBlocked : {
        defaultValue : false 
      } ,
      createdAt : {
        defaultValue : new Date()
      },
      updatedAt : {
        defaultValue : 'Never Updated'
      }
    }, 
  }
});