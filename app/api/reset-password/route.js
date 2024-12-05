import bcrypt from 'bcrypt'
import prisma from '/lib/prisma'
import {NextResponse} from 'next/server'




export async function POST(request) {
    const body = await request.json();
    const {email, password} = body;

    if(!email || !password) {
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
        where: {email},
        data: { hashedPassword }
    })

    user.hashedPassword = ''

    return NextResponse.json(user)

}