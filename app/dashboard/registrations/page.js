import { is } from 'date-fns/locale';
import Table from './table'
import UnregisteredTable from './unreg_table'
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
          // or if "parent" is a field on Student directly, just select it:
          // parent: true,
        },
      });
    
      // If you also need a list of possible "assignees" (users):
      const users = await prisma.user.findMany({
        where: { isStaff: true }, 
        select: { id: true, name: true },
      });

    console.log(users)


    return (
      <div className="container mx-auto p-2">
        <h1 className="text-3xl font-bold text-center mb-8">Register List</h1>
        <Table registrations={students} />

        <h1 className="text-3xl font-bold text-center mt-16 mb-8">Unregistered Students</h1>
        <UnregisteredTable students={unregisteredStudents} users={users} />
      </div>
    );
}
