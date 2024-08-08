import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { client } from "../../../lib/client";
import bcrypt from "bcryptjs";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        console.log(email, password);

        const existingUserQuery = `*[_type == "user" && email == $email][0]`;
        const existingUser = await client.fetch(existingUserQuery, { email });
        if (!existingUser) {
          throw new Error("Invalid Email or password");
        }

        const isPasswordMatched = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (!isPasswordMatched) {
          throw new Error("Invalid Email or password");
        }

        return existingUser;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
