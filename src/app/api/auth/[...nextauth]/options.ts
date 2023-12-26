import type {
  Awaitable,
  NextAuthOptions,
  RequestInternal,
  User,
} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "~/trpc/server";

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Your Email@any.any",
        },
        password: {
          label: "Password",
          type: "text",
          placeholder: "Your Super Secure Password",
        },
      },
      async authorize(credentials) {
        const email: string = credentials?.email as string;
        const password: string = credentials?.email as string;

        try {
          console.log("user");
          const user = await api.user.loginUser.query({
            email: email,
            password: password,
          });
          console.log(user);
          if (
            user &&
            user.email === credentials?.email &&
            user.password === credentials?.password
          ) {
            console.log({ email: user.email, password: user.password });
            return Promise.resolve(user);
          }
          return Promise.resolve(null);
        } catch (error) {
          console.error("Error fetching user:", error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
};
