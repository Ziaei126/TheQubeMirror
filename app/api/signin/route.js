import prisma from '/lib/prisma'
import {NextResponse} from 'next/server'




export async function POST(request) {
    const body = await request.json();
    const {email} = body;
    console.log(email)

    if(!email) {
        return new NextResponse("Missing Fields", {status: 400})
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    console.log(user)

    if(!user) {
        return new NextResponse("User not found", {status: 400})
    }
    
    console.log(user.emailVerified)

    if (user.emailVerified === null) {
        return new NextResponse(JSON.stringify({email: true}), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    return new NextResponse(JSON.stringify({email: false}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })



}