import prisma from '/lib/prisma';
import { getServerSession } from "next-auth";
import {options} from "@app/api/auth/[...nextauth]/options";


export async function User(req, res) {
    
    
    const session = await getServerSession(req,
    {
      ...res,
      getHeader: (name) => res.headers?.get(name),
      setHeader: (name, value) => res.headers?.set(name, value),
    }, options)

    
    if (!session || !session.accessToken) {
      return "unaothorized" // json({ error: 'Unauthorised' }, { status: 401 }); res.status(401).send(response.text);
    }
    
      // Find the account using the access token
      const user = await prisma.user.findFirst({
        where: {
          id: session.userId,
        }
      });
      
      if (!user ) {
        // Handle the case where the account or user is not found
        console.log("user not found")
        return "user not found" // json({ error: 'User not found for the given access token.' }, { status: 404 }) 
      }

      return user
    }