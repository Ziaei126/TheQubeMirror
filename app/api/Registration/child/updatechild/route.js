import { getServerSession } from "next-auth";
import {options} from "@app/api/auth/[...nextauth]/options";
import { prisma } from '/lib/prisma';
import { getToken } from "next-auth/jwt";
import { register } from "@app/api/Registration/register/register";


export async function POST(req, res) {
  console.log("running")
  
  try {

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const session = await getServerSession(req,
    {
      ...res,
      getHeader: (name) => res.headers?.get(name),
      setHeader: (name, value) => res.headers?.set(name, value),
    }, options)
  
  
  if (!session || !session.accessToken) {
    return Response.error("unaothorized")// json({ error: 'Unauthorised' }, { status: 401 }); res.status(401).send(response.text);
  }
  const accountId = session.accountId
  console.log(accountId)
    // Find the account using the access token
    const account = await prisma.account.findFirst({
      where: {
        providerAccountId: accountId,
      },
      include: {
        user: true, // Include the associated user
      },
    });
    
    if (!account || !account.user) {
      // Handle the case where the account or user is not found
      console.log("user not found")
      return Response.error()  // json({ error: 'User not found for the given access token.' }, { status: 404 }) 
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
    let application = await register(account.user.id, student.id);
    console.log(application);
    return  Response.json({...student, reg_id: application.id})
  } catch (error) {
    console.log(error)
    return  Response.error() //json({ error: 'internal server error' }, { status: 500 });
  }
  
}
