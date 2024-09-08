// Courses page component
import React from 'react';
import prisma from '/lib/prisma';
import Course from '@app/components/course';

async function Courses() {
  const courses = await prisma.Course.findMany({
    where: {
      show: true,
      is_closed: false
    },
    orderBy: {
      catagory: 'asc', // Sort courses by catagory
    }
  });

  // Group courses by catagory
  const groupedCourses = courses.reduce((acc, course) => {
    if (!acc[course.catagory]) {
      acc[course.catagory] = [];
    }
    acc[course.catagory].push(course);
    return acc;
  }, {});

  return (
    <>
      <h1 className="text-4xl font-bold mb-10 text-center">Courses</h1>
      <hr className="w-10 mx-auto m-5" />

      {/* Navigation to course categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:p-1 text-white gap-1 max-w-4xl mx-auto">
        <a href="#Islamic" className="bg-pastel-blue p-5">
          <h2 className="underline text-2xl font-light tracking-wide sm:mb-8 mb-1 sm:mt-8">Islamic Education</h2>
          <p>Indirect internalization of Islamic beliefs through experiments and hands-on activities delivered by trained passionate teachers.</p>
        </a>

        <a href="#Skill" className="bg-pastel-orange p-5">
          <h2 className="underline text-2xl font-light tracking-wide sm:mb-8 mb-1 sm:mt-8">Life Skills Coaching</h2>
          <p>Clubs and courses in all skills and categories.</p>
        </a>

        <a href="#Sport" className="bg-yellow-500 p-5">
          <h2 className="underline text-2xl font-light tracking-wide sm:mb-8 mb-1 sm:mt-8">Sports Training</h2>
          <p>A variety of sports training provided by qualified coaches.</p>
        </a>

        <a href="#Language" className="bg-gray-400 p-5">
          <h2 className="underline text-2xl font-light tracking-wide sm:mb-8 mb-1 sm:mt-8">Languages</h2>
          <p>Language courses for children at different levels.</p>
        </a>
      </div>

      {/* Display courses grouped by catagory */}
      <div className="max-w-4xl mx-auto flex flex-col gap-y-5 p-1 ">
        {Object.keys(groupedCourses).map((catagory) => (
          <div key={catagory} id={catagory.replace(/\s+/g, "-")} className="flex flex-col gap-y-2">
            <h2 className="text-3xl font-bold mb-5">{catagory}</h2>
            {groupedCourses[catagory].map((course) => (
              <Course key={course.id} course={course} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Courses;