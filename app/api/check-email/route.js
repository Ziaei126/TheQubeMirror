import bcrypt from 'bcrypt';
import prisma from '/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate input fields
    if (!email) {
      return NextResponse.json(
        { error: "Missing Fields", details: "Email is required" },
        { status: 400 }
      );
    }

    // Check if the user exists
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email },
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: "Database Error", details: "Failed to query the database" },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: "Email Not Found", details: "The provided email does not exist" },
        { status: 404 }
      );
    }

    // Return the user email if found
    return NextResponse.json({ email: user.email }, { status: 200 });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}