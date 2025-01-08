import prisma from '/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;
    console.log('API running with email:', email);

    // Validate the email field
    if (!email) {
      return NextResponse.json(
        { error: "Missing Fields", details: "Email is required" },
        { status: 400 }
      );
    }

    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log('User data:', user);

    // Handle user not found
    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { error: "User not Found", details: "Please enter a valid user or consider signing up" },
        { status: 404 }
      );
    }

    // Check if the user's email is verified
    console.log('Email verified status:', user.emailVerified);
    if (user.emailVerified === null) {
      return NextResponse.json(
        { email: true },
        { status: 200 }
      );
    }

    // If email is verified
    return NextResponse.json(
      { email: false },
      { status: 200 }
    );

  } catch (error) {
    // Handle unexpected server errors
    console.error('Error in API:', error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}