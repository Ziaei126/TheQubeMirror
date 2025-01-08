import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import EmailProvider from 'next-auth/providers/email';

export const options = {
  // Use the Prisma Adapter
  adapter: PrismaAdapter(prisma),

  // Configure authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    EmailProvider({
      server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
              user: process.env.EMAIL_SERVER_USER,
              pass: process.env.EMAIL_SERVER_PASSWORD,
          }
      },
      from:process.env.EMAIL_FROM,
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

          if ( user && passwordMatch) {
            user.hashedPassword = ""
            return user
          }
          return null
          
        },
      }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account, trigger }) {
      // For sign in and token update
      if (trigger === "signIn" || trigger === "update") {
        if (account) {
          // OAuth sign-in
          console.log("account: ", account)
          console.log("user: ", user)
          const accessToken = jwt.sign(
            { sub: token.sub, email: token.email },
            process.env.NEXTAUTH_SECRET,
            { expiresIn: '1h' }
          );
          token.accessToken = account.access_token || accessToken
          token.isAdmin = user.isAdmin
          token.isStaff = user.isStaff
        } 
        
      
      }
      
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken
      session.userId = token.sub
      session.isAdmin = token.isAdmin
      session.isStaff = token.isStaff

      return session
    },
  },
  pages: {
    signIn: "/signin"
  }

  // Additional NextAuth configuration...
};

