import { getServerSession } from "next-auth";
import {options} from "app/api/auth/[...nextauth]/options";
import { prisma } from '/lib/prisma';
import {NextResponse} from 'next/server'

export async function GET(req, res) {
  console.log("running")
  
  try {
  const session = await getServerSession(req,
    {
      ...res,
      getHeader: (name) => res.headers?.get(name),
      setHeader: (name, value) => res.headers?.set(name, value),
    }, options)
  
  
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
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
      return NextResponse.json({ error: 'User not found for the given access token.' }, { status: 404 }) 
    }
  
    // Now, find the parent associated with the user
    const parent = await prisma.parent.findUnique({
      where: {
        user_id: account.user.id, // Assuming the email field in Parent model is used to store user ID
      },
    });
    console.log(parent)
    if (!parent) {
      return NextResponse.json({ error: 'Parent not found for the associated user.' }, { status: 404 })
    }
    return  NextResponse.json({ status: 404 }, {data: parent})
  } catch (error) {
    console.log(error)
    return  NextResponse.json({ error: 'internal server error' }, { status: 500 });
  }
  
}


