import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

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
  
          const user = await prisma.User.findUnique({
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


          // Generate a JWT token for the user
          if ( user && passwordMatch) {
            user.hashedPassword = ""
            const accessToken = jwt.sign(
              { sub: user.id, email: user.email },
              process.env.NEXTAUTH_SECRET, // You should have a JWT_SECRET in your .env
              { expiresIn: '1h' } // Token expires in 1 hour, adjust as needed
            );
            return {
              ...user,
              accessToken
            };
          }

          return null
          
        },
      }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        console.log("account: ",account)
        console.log("user: ", user)
        console.log("token: ", token)
        token.accessToken = account.access_token || user.accessToken
        token.isAdmin = user.isAdmin
        token.isStaff = user.isStaff
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
    session.accessToken = token.accessToken
    session.userId = token.sub

  
    return session
    },
  },
  pages: {
    signIn: "/signin"
  }

  // Additional NextAuth configuration...
};

