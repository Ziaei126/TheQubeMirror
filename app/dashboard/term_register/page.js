import Table from './table'
import { gradeCalculator, } from '/lib/gradeCalculator';
import prisma from '/lib/prisma';
const termId = parseInt(process.env.TERM_ID);

export default async function TermRegister() {
        
    const data = await prisma.registration.findMany({
      where: {
        term_id: termId,
      },
      include: {
        student: true,  // Include student details
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

    const registrations = data.filter(({ paid }) => paid);
    //const registrations = data;
    const students = registrations.map(registration => ({
        student: registration.student,
        grade: gradeCalculator(registration.student.yearEnteredReception),  // Calculate the student's age
        courses: {
          islamic: registration.course_choice?.islamic?.course_name,
          skill: registration.course_choice?.skill?.course_name,
          language: registration.course_choice?.language?.course_name,
          sport: registration.course_choice?.sport?.course_name,
        },
        parent_name: registration.parent.name + " " + registration.parent.lastName,
      }));


    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Register List</h1>
        <Table registrations={students} />
      </div>
    );
}
