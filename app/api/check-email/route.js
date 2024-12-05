import bcrypt from 'bcrypt'
import prisma from '/lib/prisma'
import {NextResponse} from 'next/server'


export async function POST(request) {
    const body = await request.json();
    const {email} = body;

    if( !email ) {
        return new NextResponse("Missing Fields", {status: 400})
    }

    const exist = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(!exist) {
        throw new Error("Email Does not exist")
    }

    return NextResponse.json({email: exist.email})

}