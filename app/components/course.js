"use client"

import { useState } from "react";
import Image from "next/image";


export default function Course({course}) {

    const [isClicked, setIsClicked] = useState(false)
      return (
        <div>
          <div className='flex flex-col border sm:flex-row'>
            { course.image && <Image src={course.image} height="300" width="300" alt={course.name} 
            className="w-full max-h-64 sm:max-h-none sm:w-auto object-cover "/>}
            
            <div className={`p-3  w-full ${course.image || "flex flex-col items-center"}`}>
              <h3 className="text-lg font-bold">{`${course.minAge} - ${course.maxAge}`}</h3>
              <h2 className="text-2xl mt-3 mb-2 font-extrabold">{course.course_name}</h2>
              <p>{course.description}</p>
            </div>
          </div>
          <button className='bg-pastel-blue-dark w-full flex justify-between p-3 items-center text-2xl font-bold' onClick={() => setIsClicked(prev => !prev)}>
            <div>{isClicked ? "" : "more information"}</div>
            <div className="text-4xl">{isClicked ? "-" : "+"}</div>
          </button>
          <div className={`bg-pastel-blue-light p-5 ${isClicked ? "" : "hidden"}`}>
            <h3 className="text-xl font-bold">Learning Outcomes</h3>
            <p className="">{course.learning_outcomes}</p>
            <h3 className="text-xl font-bold mt-5">More Information</h3>
            <p>{course.more_info}</p>

          </div>
          
  
  
        </div>
  
      )
  }
  
 