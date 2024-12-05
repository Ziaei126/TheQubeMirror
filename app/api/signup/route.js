import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    console.log('details: ', { name, email, password });
    if (!name || !email || !password) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    console.log('Checking if user exists');
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      // Email already exists
      return NextResponse.json(
        {
          error: true,
          message: 'Email already exists',
          actions: {
            signIn: '/signin', // Link to the sign-in page
            resetPassword: '/reset-password', // Link to reset password page
          },
        },
        { status: 409 } // Conflict status code
      );
    }

    console.log('Creating new user');
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        hashedPassword: hashedPassword,
      },
    });

    // Avoid sending hashed password back to the client
    user.hashedPassword = '';

    return NextResponse.json(user, { status: 201 }); // Success - user created
  } catch (error) {
    console.error('Error in user registration:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}