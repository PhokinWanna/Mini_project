// // utils/authOptions.ts
// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import prisma from "./db";

// export const authOptions: NextAuthOptions = {
//     session: {
//         strategy: "jwt", // Using JWT for sessions
//     },
//     providers: [
//         CredentialsProvider({
//             name: "Credentials",
//             credentials: {
//                 email: { label: "Email", type: "text" },
//                 password: { label: "Password", type: "password" },
//             },
//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials.password) {
//                     throw new Error("Invalid credentials");
//                 }

//                 const user = await prisma.user.findUnique({
//                     where: { email: credentials.email },
//                 });

//                 if (user && user.password === credentials.password) {
//                     return {
//                         id: user.id.toString(),  // Make sure `id` is passed as a string
//                         name: user.name,
//                         email: user.email,
//                     };
//                 }

//                 return null;  // Return null if authentication fails
//             },
//         }),
//     ],
//     callbacks: {
//         async session({ session, token }) {
//             if (token?.id) {
//                 session.user = session.user || {};  // Make sure `session.user` is defined
//                 session.user.id = token.id;  // Attach the `id` to the session user
//             }
//             return session;
//         },
//         async jwt({ token, user }) {
//             if (user?.id) {
//                 token.id = user.id;  // Attach the `id` to the JWT token
//             }
//             return token;
//         },
//     },
// };
