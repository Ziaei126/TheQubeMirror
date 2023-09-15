import React from 'react'
import { prisma } from '/lib/prisma'
import  Course  from 'app/components/course'


async function Courses() {
  const courses = await prisma.course.findMany({
    where: {
      show: true
    }
  }

  );
  console.log(courses)
  return (
    <>

    <h1 className='text-center text-3xl font-bold m-5'>Courses</h1>
    <hr className="w-10 mx-auto m-5 " />

    <div className='grid grid-cols-1 sm:grid-cols-2 sm:p-1 text-white gap-1 max-w-4xl mx-auto'>
      <div className='bg-pastel-blue p-5'>
        <h2 className='underline text-2xl font-light tracking-wide sm:mb-8 mb-1 sm:mt-8'>Islamic Education</h2>
        <p>Indirect internalization of Islamic beliefs through experiments and hands-on activities delivered by trained passionate teachers</p>

      </div>
      <div className='bg-pastel-orange p-5'>
        <h2 className='underline text-2xl font-light tracking-wide sm:mb-8 mb-1 sm:mt-8'>Life Skills Coaching</h2>
        <p>Clubs and courses in all skills and categories</p>

      </div>

      <div className='bg-yellow-500 p-5'>
        <h2 className='underline text-2xl font-light tracking-wide sm:mb-8 mb-1 sm:mt-8'>Sports Training</h2>
        <p>A variety of sports training provided by qualified coaches</p>

      </div>
      <div className=' bg-gray-400 p-5'>
        <h2 className='underline text-2xl font-light tracking-wide sm:mb-8 mb-1 sm:mt-8'>Languages</h2>
        <p className=''>Language courses for children at different levels.</p>

      </div>

    </div>
    
    <div className='max-w-4xl mx-auto flex flex-col gap-y-5 p-1'>
      {courses.map(course => (
          <Course course={course}/>
      ) )
      }
    
    </div>
    
    </>
  )
}

export default Courses



