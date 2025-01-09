import { last } from 'underscore';
import prisma from '/lib/prisma';

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { reg_id, parent_email } = body;
    
    console.log('parent_email: ', parent_email)
    
    // Check for last term registration with paid status

    const reg = await prisma.registration.findUnique({
      where: {
        id: reg_id,
      },
      select: {
        student_id: true
      }
    });

    const lastTermRegistration = await prisma.Registration.findFirst({
      where: {
        AND: {
          student_id: reg.student_id,
        parent_email: parent_email,
        term_id: 10, // Update based on your term logic in the schema
        paid: true,
        paymentPlan: 'year',
        }
        
      },
    });

    console.log(lastTermRegistration)

    // Return eligibility status
    if (lastTermRegistration) {
      console.log(lastTermRegistration)
      return new Response(JSON.stringify({ eligibleForFreeTerm: true }), {
        status: 200,
      });
    }

    return new Response(JSON.stringify({ eligibleForFreeTerm: false }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error checking eligibility:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    });
  }
}
