import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

console.log({
    clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SERET
})

const handler = NextAuth({
    providers: [
       GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SERET,
       }) 
    ],
    async session({session}) {

    },
    async signIn({porfile}) {
        try {

            

        } catch {

        }

    }
})

export {handler as GET, handler as POST};