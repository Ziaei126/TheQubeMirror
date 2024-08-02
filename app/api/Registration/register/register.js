import { prisma } from '/lib/prisma';


export async function register(parent_id, student_id) {

  const application = await prisma.Registration.create({
    data: {
      parent_id: parent_id,
      student_id: student_id
    }
  })
    if (!application) {
      console.log("application not created!!")
      return application
    }
    return  application
  } 
  

