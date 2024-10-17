import prisma from '/lib/prisma';
import { User } from '@app/api/Registration/authenticate/authenticate'
import { gradeCalculator } from '/lib/gradeCalculator'


export async function GET(req, res) {

  const termId = parseInt(process.env.TERM_ID);
  console.log("running")
  const user = await User(req, res)
  console.log("user: ", user)

  try {
    
    if (user === "user not found") {
      // Handle the case where the user is not found
      return Response.error("user not found");
    }
    if (user === "unauthorized") {
      // Handle the case where the user is unauthorized
      return Response.error("unaothorized");
    }

    // Now, find the parent associated with the user
    //console.log("user.id: ", user.id)
    if (user.id) {
      console.log("user.id: ", user.id)
      const registrations = await prisma.registration.findMany({
          where: {
          parent: {
            user_id: user.id,  // Filter by specific parent
          },
          term_id: termId,          // Filter by specific term
          paid: false,              // Only unpaid registrations
        },
        select: {
          id: true,  // Registration ID
          paid: true,  // Paid status
          student: {
            select: {
              name: true,
              lastName: true,
              yearEnteredReception: true,  // We'll calculate the age later
            },
          },
          parent: {
            select: {
              email: true,  // Parent email
            },
          },
          course_choice: true,
        },
      });

      if (!registrations || registrations.length == 0) {
        console.log("registrations not found!!")
        return Response.json([])
      }
  
      const result = registrations.map(registration => ({
          id: registration.id,
          paid: registration.paid,
          studentName: registration.student.name,
          yearGroup: gradeCalculator(registration.student.yearEnteredReception),
          parentEmail: registration.parent.email,
          hasCourseChoice: registration.course_choice !== null,
        }));
  
      return  Response.json(result)
    }
    return Response.json([])
  } catch (error) {
    console.log(error)
    return  Response.error() //json({ error: 'internal server error' }, { status: 500 });
  }
  
}
