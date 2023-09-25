import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import { GithubProfile } from 'next-auth/providers/github';

export const options = {
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
        
        CredentialsProvider({
            name: "Credentials",
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
                // this is where you need to retrieve user data
                // to verify with credentials
                // Docs: configuration/providers/credentials
                const user = {id: "42", name: "Dave", password: "nextauth", role: "admin"}

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        }) 
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) token.role = user.role
            return token
        },

        async session({session, token}) {
            if (session?.user) session.user.role = token.role
            return session
        }
    }
    

}

