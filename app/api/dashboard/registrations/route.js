import prisma from '/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { studentId, followUp } = body;
    const followUpNotes = body.followUpNotes || null;
    const followUpAssignee_id = body.followUpAssignee_id || null;
    

    // Validate input
    if (!studentId) {
      return new NextResponse('Student ID is required', { status: 400 });
    }

    // Update the student record
    if (!followUp) {
      const updatedStudent = await prisma.student.update({
        where: { id: studentId },
        data: {
          followUp: false,
        },
      });

      return NextResponse.json(updatedStudent);
    }

    const updatedStudent = await prisma.student.update({
      where: { id: studentId },
      data: {
        followUp,
        followUpNotes,
        followUpAssignee_id,
      },
    });

    return NextResponse.json(updatedStudent);
  } catch (error) {
    console.error('Error updating student follow-up:', error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}