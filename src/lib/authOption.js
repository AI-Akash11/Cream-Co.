import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect, collections } from "./dbConnect";
import { loginUser } from "@/actions/server/auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // email: { label: "Email", type: "email" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await loginUser(credentials);

        if (!user.success) {
          return null;
        }

        return user.user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isExist = await dbConnect(collections.users).findOne({
        email: user.email,
        // provider: account?.provider,
      });

      if (isExist) {
        return true;
      }

      const newUser = {
        provider: account.provider,
        name: user.name,
        email: user.email,
        image: user.image,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await dbConnect(collections.users).insertOne(newUser);

      return result.acknowledged;
      // return true;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user._id || user.id;
        
        if (account?.provider === "google") {
          const dbUser = await dbConnect(collections.users).findOne({
            email: user.email,
          });
          token.role = dbUser?.role || "user";
        } else {
          token.role = user.role || "user";
        }
      }
      return token;
    },
  },
};
