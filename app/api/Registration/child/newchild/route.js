import { getServerSession } from "next-auth";
import {options} from "@app/api/auth/[...nextauth]/options";
import { prisma } from '/lib/prisma';
import { register } from "@app/api/Registration/register/register";


export async function POST(req, res) {
  try {
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
    const changes = await req.json()
    // Now, update parent associated with the user
    console.log("changes: ",changes)
    const student = await prisma.student.create({
      data: {
        ...changes,
        parent: {
          connect: [{user_id: account.user.id}]
        }
    }
    });
    console.log(student)
    if (!student) {
      return Response.error() //json({ error: 'Parent not found for the associated user.' }, { status: 404 })
    }
    
    
    let application = await register(account.user.id, student.id);
    console.log(application)


    return  Response.json({...student, reg_id: application.id})
  } catch (error) {
    console.log(error)
    return  Response.error() //json({ error: 'internal server error' }, { status: 500 });
  }
  
}