import prisma from '/lib/prisma';
import { revalidatePath } from 'next/cache'


export async function register(parent_email, student_id) {
  const term = parseInt(process.env.TERM_ID);

  const application = await prisma.Registration.create({
    data: {
      parent_email: parent_email,
      student_id: student_id,
      term_id: term,
    }
  })
    if (!application) {
      console.log("application not created!!")
      return application
    }
    revalidatePath('/dashboard/term_register')
    return  application
  } 
  

