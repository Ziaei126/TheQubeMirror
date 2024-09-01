import prisma from '/lib/prisma';

export async function POST(request, res) {

  const data = await request.json()
  console.log(data)
  const age = data.yearGroup
  console.log('year Group:', age)
  try {
    const coursesFromServer = await prisma.course.findMany({
      where: {
        AND: [
          {
            is_closed: false,
          },
          {
            maxAge: { gte: age } // Greater than or equal to the specified age
          },
          {
            minAge: { lte: age } // Less than or equal to the specified age
          }
        ]
      }
    });

    console.log(
      "courses:", coursesFromServer
    )

    const categorizeCourses = (courses) => {
      return courses.reduce((acc, course) => {
        // Initialize the category array if it doesn't exist
        if (!acc[course.catagory]) {
          acc[course.catagory] = [];
        }
        // Add the course name to the appropriate category
        acc[course.catagory].push(course.course_name);
        return acc;
      }, {});
    };

    // Transform the courses
    const categorizedCourses = categorizeCourses(coursesFromServer);

    // For the purpose of this example, we're using static data

    console.log("catagorised: ", categorizedCourses)
    return Response.json(categorizedCourses);
  }
  catch {
    console.log("there was an error")
    return Response.error()
  }
}