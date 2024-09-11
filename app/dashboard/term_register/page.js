import Table from './table'
import { gradeCalculator, } from '/lib/gradeCalculator';

const termId = parseInt(process.env.TERM_ID);

export default async function TermRegister() {
        
    const data = await prisma.registration.findMany({
      where: {
        term_id: termId,
      },
      include: {
        student: true,  // Include student details
        course_choice: true,
        parent: true,
      },
    });

    //console.log("data: ", data)

    const registrations = data.filter(({ paid }) => paid);
    
    const students = registrations.map(registration => ({
        student: registration.student,
        grade: gradeCalculator(registration.student.yearEnteredReception),  // Calculate the student's age
        courses: {
          islamic: registration.course_choice?.Islamic1,
          skill: registration.course_choice?.Skill1,
          language: registration.course_choice?.Language1,
          sport: registration.course_choice?.Sport1,
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
