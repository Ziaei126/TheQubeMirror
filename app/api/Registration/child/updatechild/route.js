import { getServerSession } from "next-auth";
import {options} from "@app/api/auth/[...nextauth]/options";
import { prisma } from '/lib/prisma';
import { register } from "@app/api/Registration/register/register";
import { User } from '@app/api/Registration/authenticate/authenticate'


export async function POST(req, res) {
  console.log("running")
  
  try {
    const user = User(req, res)
    console.log("here is user: ", user)
    if (user === "user not found") {
      // Handle the case where the user is not found
      return Response.error("user not found");
    }

    if (user === "unauthorized") {
      // Handle the case where the user is unauthorized
      return Response.error("unaothorized");
    }
    const {id,changes} = await req.json()
    // Now, update parent associated with the user
    
    const student = await prisma.student.update({
      where: {
        id: id, // Assuming the email field in Parent model is used to store user ID
      },
      data: changes
    });
    console.log(student)
    if (!student) {
      return Response.error() //json({ error: 'student not found for the associated user.' }, { status: 404 })
    }
    let application = await register(user.id, student.id);
    console.log(application);
    return  Response.json({...student, reg_id: application.id})
  } catch (error) {
    console.log(error)
    return  Response.error() //json({ error: 'internal server error' }, { status: 500 });
  }
  
}
