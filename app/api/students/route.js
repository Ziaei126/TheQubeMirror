import prisma from '/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
    const termId = parseInt(process.env.TERM_ID);

    try {
        const registrations = await prisma.registration.findMany({
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

        return NextResponse.json(registrations);
    } catch (error) {
        console.error("Failed to fetch registrations:", error);
        return new NextResponse('Internal Server', { status: 500 });
    }


}