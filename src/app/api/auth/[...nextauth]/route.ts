import NextAuth from "next-auth/next";
import { options } from "./options";

const handler = NextAuth(options);

export { handler as GET, handler as POST };

// adapter: TypeORMLegacyAdapter({
//   type: 'mysql',
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   host: process.env.DATABASE_HOST,
//   database: process.env.DATABASE_DB,
//   synchronize: false
// }),
