import { getServerSession } from "next-auth";
import {options} from "@app/api/auth/[...nextauth]/options";
import { prisma } from '/lib/prisma';
import { register } from "@app/api/Registration/register/register";
import { User } from '@app/api/Registration/authenticate/authenticate'


export async function POST(req, res) {
  try {
    const user = await User(req, res)
    if (user === "user not found") {
      // Handle the case where the user is not found
      return Response.error("user not found");
    }

    if (user === "unauthorized") {
      // Handle the case where the user is unauthorized
      return Response.error("unaothorized");
    }

    const {id, changes} = await req.json()
    // Now, update parent associated with the user
    console.log("changes: ",changes)
    const student = await prisma.student.update({
      where: {
        id: id
      },
      data: changes
    });
    console.log(student)
    if (!student) {
      return Response.error() //json({ error: 'Parent not found for the associated user.' }, { status: 404 })
    }
    
    
    let application = await register(user.id, student.id);
    console.log(application)


    return  Response.json({...student, reg_id: application.id})
  } catch (error) {
    console.log(error)
    return  Response.error() //json({ error: 'internal server error' }, { status: 500 });
  }
  
}