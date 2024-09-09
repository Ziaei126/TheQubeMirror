import prisma from '/lib/prisma';
import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

const termId = parseInt(process.env.TERM_ID);

const getCachedRegistrations = unstable_cache(
  async () => {
    return await prisma.registration.findMany({
      where: {
        term_id: termId,
      },
      include: {
        student: true,  // Include student details
        islamic: true,  // Include the Islamic course
        skill: true,    // Include the Skill course
        language: true, // Include the Language course
        sport: true,    // Include the Sport course
      },
    });
  },
  { tags: ['term_register'] }
);

export async function GET(req) {
  try {
    // You need to await the result of the cached function
    const registrations = await getCachedRegistrations();
    
    // Log the registrations for debugging
    console.log(registrations);

    // Return a JSON response with the registrations
    return NextResponse.json(registrations);
  } catch (error) {
    console.error("Failed to fetch registrations:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}