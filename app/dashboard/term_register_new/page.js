import Table from './table'
import { gradeCalculator, } from '/lib/gradeCalculator';
import prisma from '/lib/prisma';
const termId = 11;

export default async function TermRegister() {
        
    const data = await prisma.registration.findMany({
      where: {
        term_id: termId,
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            lastName: true,
            DOB: true,
            gender: true,
            internalPhotoAllowed: true,
            externalPhotoAllowed: true,
            medicalNotes: true,
            yearEnteredReception: true,
            pic: true 
          }
        },  // Include student details
        parent: true,
        course_choice: {
          include: {
            islamic: true,
            skill: true,
            sport: true,
            language: true,
          },
        },
      },
    });

    //console.log("data: ", data)

    //const registrations = data.filter(({ confirmed }) => confirmed);
    const registrations = data;
    const students = registrations.map(registration => ({
        student: registration.student,
        grade: gradeCalculator(registration.student.yearEnteredReception),  // Calculate the student's age
        courses: {
          Islamic1: registration.course_choice?.Islamic1,
          Skill1: registration.course_choice?.Skill1,
          Language1: registration.course_choice?.Language1,
          Sport1: registration.course_choice?.Sport1,
        },
        parent: registration.parent,
        confirmed: registration.confirmed,
        reg_id: registration.id
      
      }));

      


    return (
      <div className="container mx-auto p-2">
        <h1 className="text-3xl font-bold text-center mb-8">Register List</h1>
        <Table registrations={students} />
      </div>
    );
}
