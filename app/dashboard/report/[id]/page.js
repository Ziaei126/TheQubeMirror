import Print from "./printable";
const termId = 10;
export default async function Hello({params}) {
    // Fetch the registration data
  const data = await prisma.registration.findFirst({
    where: {
      student_id: params.id,
      term_id: termId,
      paid: true,
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          lastName: true,
          pic: true,
          yearEnteredReception: true
        },
      },
      parent: true,
      course_choice: {
        include: {
          islamic: true,
          skill: true,
          sport: true,
          language: true,
        },
      },
      endOfTermReports: true,
    },
  });

  const { student, course_choice, endOfTermReports } = data;
  const report = endOfTermReports[0];
  const courses = {
    skill: course_choice?.skill?.course_name,
    islamic: course_choice?.islamic?.course_name,
    sport: course_choice?.sport?.course_name,
    language: course_choice?.language?.course_name,
  }

  console.log('Props sent to Report:', { student, course_choice, report });
    
    return (
        <div>
            <Print student={student} courses={courses} report={report}/>
        </div>
    )
}

