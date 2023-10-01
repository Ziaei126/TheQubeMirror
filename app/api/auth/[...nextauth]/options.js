import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import { GithubProfile } from 'next-auth/providers/github';
import { prisma } from '/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GooglePovider from 'next-auth/providers/google'
import bcrypt from 'bcrypt'

export const options = {
    adapter: PrismaAdapter(prisma),
    providers : [
        GithubProvider({
            //works the same with any Oauth provider
            profile(profile) {
                //console.log(profile)
                return {
                    ...profile,
                    role: profile.role ?? "user",
                    id: profile.id.toString(),
                    image: profile.avatar_url,

                }
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            secret: process.env.NEXT_AUTH_SECRET
        }),
        GooglePovider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                }

            },
            async authorize(credentials) {
                console.log('authorising///')
                if(!credentials.username || !credentials.password) {
                    console.log("error due to not providing details")
                    throw new Error("Please enter and email and Password")
                }
                
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.username
                        }
                    })
                    

                
                

                if (!user || !user?.hashedPassword) {
                    console.log("passowrd not saved")

                    throw new Error("No user found")

                }
                
                    const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)
                
                console.log(passwordMatch)    
                
                
                if (!passwordMatch) {
                    console.log("password error")
                    throw new Error('Incorrect passowrd')
                }
                console.log('user found')
                return user;


            }
        }) 
    ],
    session: {
        strategy: "jwt"
    },
    
    callbacks: {
        
        async jwt({token, user}) {
            const userDB = await prisma.user.findUnique({
                where: {
                    email: user.email
                }
            })

            if (userDB) token.role = userDB.role
            else token.role = user.role
            return token
        },

        async session({session, token}) {
            if (session?.user) session.user.role = token.role
            return session
        },

        async signIn({profile}) {
            console.log("This is a profile: ",profile)
            try {

                const userExist = await prisma.user.findUnique({
                    where: {
                        email : profile.email
                    }
                    })
                if (!userExist) {
                    const user = await prisma.user.create({
                        data: {
                            name: profile.name,
                            email: profile.email
                        }
                    })
                }

            } catch (err) {

                console.log(err);

            }
        }
    }
    */

}

