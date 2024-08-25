import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { options } from "@app/api/auth/[...nextauth]/options";
import { prisma } from '/lib/prisma';
import { User } from '@app/api/Registration/authenticate/authenticate'


export async function GET(req, res) {

 
  try {
    const user = await User(req, res)
    console.log(user)
    if (user === "user not found") {
      // Handle the case where the user is not found
      return Response.error("user not found");
    }

    if (user === "unauthorized") {
      // Handle the case where the user is unauthorized
      return Response.error("unaothorized");}

  
    // Now, find the parent associated with the user
    const parent = await prisma.parent.findUnique({
      where: {
        user_id: user.id, // Assuming the email field in Parent model is used to store user ID
      },
    });
    console.log(parent)
    if (!parent) {
      console.log("parent not found!!")
      return Response.json(false) //json({ error: 'Parent not found for the associated user.' }, { status: 404 })
    }

    return  Response.json(parent)
  } catch (error) {
    console.log(error)
    return  Response.error() //json({ error: 'internal server error' }, { status: 500 });
  }
  
}


