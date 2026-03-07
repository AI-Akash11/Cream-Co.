import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect, collections } from "./dbConnect";
import { loginUser } from "@/actions/server/auth";

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
    // ...add more providers here
  ],
};
