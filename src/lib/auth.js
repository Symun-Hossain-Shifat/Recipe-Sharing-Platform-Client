import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

// connect once
await client.connect();

const db = client.db("RecipyHubproject");

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        defaultValue: 'User' ,
      },
      isPremium : {
         defaultValue  : false 
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