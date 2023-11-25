import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcrypt'

export const options = {
  // Use the Prisma Adapter
  adapter: PrismaAdapter(prisma),

  // Configure authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
        name: "credentials",
        credentials: {
          username: {
            label: "Username:",
            type: "text",
            placeholder: "your-username",
          },
          password: {
            label: "Password:",
            type: "password",
          },
        },
        async authorize(credentials) {
          console.log(credentials)
          if (!credentials.username || !credentials.password) {
            throw new Error("Please enter an email and password");
          }
  
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.username,
            },
          });
  
          if (!user || !user.hashedPassword) {
            throw new Error("No user found with that email");
          }
  
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );
  
          if (!passwordMatch) {
            throw new Error("Incorrect password");
          }
  
          return user;
        },
      }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        console.log("account",account)
        console.log("profile", profile)
        console.log(
          "token", token
        )
        token.accessToken = account.access_token
        token.accountId = account.providerAccountId
        token.id = profile.id
      }
      return token
    },
    async session({ session, user, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
    session.accessToken = token.accessToken
    session.accountId = token.accountId
    session.user.id = token.id
    
    return session
    },
  },

  // Additional NextAuth configuration...
};

