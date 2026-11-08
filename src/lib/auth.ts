import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

if (!process.env.BETTER_AUTH_DB_URI) {
  throw new Error("BETTER_AUTH_DB_URI is missing in environment variables");
}

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI);
const db = client.db("bazardor");

export const auth = betterAuth({
  trustedOrigins: [
    "http://localhost:3000",
    "https://bazardor1914-cbtnzhesu-farsy1.vercel.app",
    "https://*.vercel.app",
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});