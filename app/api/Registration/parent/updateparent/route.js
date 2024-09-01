import prisma from '/lib/prisma';
import { User } from '@app/api/Registration/authenticate/authenticate'



export async function POST(req, res) {
  console.log("running")
  const user = await User(req, res)
  
  try {
    
    if (user === "user not found") {
      // Handle the case where the user is not found
      return Response.error("user not found");
    }

    if (user === "unauthorized") {
      // Handle the case where the user is unauthorized
      return Response.error("unaothorized");
    }
    const changes = await req.json()
    // Now, update parent associated with the user
    
    const parent = await prisma.parent.update({
      where: {
        user_id: user.id, // Assuming the email field in Parent model is used to store user ID
      },
      data: changes
    });
    console.log(parent)
    if (!parent) {
      return Response.error() //json({ error: 'Parent not found for the associated user.' }, { status: 404 })
    }
    return  Response.json(parent)
  } catch (error) {
    console.log(error)
    return  Response.error() //json({ error: 'internal server error' }, { status: 500 });
  }
  
}