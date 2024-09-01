const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getStudents(termId) {
    const registrations = await prisma.registration.findMany({
      where: {
        term_id: termId,
      },
      include: {
        student: true, // This includes the student details
      },
    });
  
    // Extract the students from the registrations
    const students = registrations.map(registration => registration.student);
  
    return students;
  }
  
  // Usage
async function main() {
  const someTermId = 10; // replace with your actual term ID
  const studentsInTerm = await getStudents(someTermId);
  console.log(studentsInTerm);
}

main();
//export default getStudents

