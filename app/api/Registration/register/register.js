import prisma from '/lib/prisma';
import { revalidateTag } from 'next/cache'


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
    revalidateTag('term_register')
    return  application
  } 
  

