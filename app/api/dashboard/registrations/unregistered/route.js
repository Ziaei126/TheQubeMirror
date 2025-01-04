// app/api/unregistered-students/route.js
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
const termId = 11;
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    // Now, fetch **all** students, including follow-up fields
    const unregisteredStudents = await prisma.student.findMany({
        where: {
          AND: [
            { followUp: true },
            {
              registration: {
                none: {
                  term_id: termId,
                },
              },
            },
            {
              registration: {
                some: {
                  term_id: termId - 1,
                },
              },
            },
          ],
        },
        select: {
          id: true,
          name: true,
          lastName: true,
          // If you have other fields like "pic," "DOB," etc., add them
          followUp: true,
          followUpNotes: true,
          followUpAssignee_id: true,
          // If you store parent details in a related model, you might do:
          parent: {
            select: {
              name: true,
              lastName: true,
              phone: true,
              email: true,
            },
          },
          registration: {
            where: { term_id: termId - 1 },
            select: {
              paymentPlan: true,
            }
          }
          // or if "parent" is a field on Student directly, just select it:
          // parent: true,
        },
      });
    
      // If you also need a list of possible "assignees" (users):
      const users = await prisma.user.findMany({
        where: { isStaff: true }, 
        select: { id: true, name: true },
      });

      unregisteredStudents.sort((a, b) =>
        a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase())
      )

    return NextResponse.json({unregisteredStudents, users});
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
