import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";


export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {}, 
      async authorize(credentials) {
        try {
          console.log(credentials);
        } catch (err) {
          return null;
        }
      },
    }),
  ],
};


const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}