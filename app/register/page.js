'use client'

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import ParentDetailsForm from 'app/components/Registration/parentDetailsForm'



export default function Register() {
  const { data: session } = useSession();
  const [showInfo, setShowInfo] = useState(true)
  

  
    return (
      <>
      
      <div className="justify-center mx-auto pt-10 bg-cream">
      <h1 className='text-4xl font-bold mb-10 text-center'>Registration</h1>
      {
        showInfo && <Info/>
      }
      <button className=' bg-slate-100' 
      onClick={() => setShowInfo(!showInfo)}>{showInfo ? "collapse" : "open"}</button>
      

      {
        session ? <ParentDetailsForm /> : <p>If you have not signed in, please <Link href="/signin">sign in</Link> first.</p>
      }
        
        
        </div>
      </>
    );
  
 
}

 


const Info = () => (
    
  <div className='bg-pastel-orange border rounded-lg max-w-4xl p-5 mx-auto'>
      <p>Thank you for your interest in The Qube! On this page you will be able to register for The Qube courses.  </p>
      <h2 className='text-2xl font-bold mt-5'>Key information</h2>
      <h3 className='text-l font-bold mt-5 mb-3'>Dates</h3>
      <ul>
        <li>The Spring term starts from <b>14 January to 24 March 2024.</b></li>
        <li>The classes are held every Sunday from 9:45am to 3pm (except for the half-term Sunday on 18th February)</li>
      </ul>

      <h3 className='text-l font-bold mt-5 mb-3'>Cost and location</h3>
      <ul>
        <li>Fee per child is £305 for 10 sessions per term</li>
        <li>There is a discount for existing parents and those who register for more than one child</li>
        <li>Courses take place at Al-Sadiq School, 126 Chevening Road, London, NW6 6TP</li>
      </ul>

      <h3 className='text-l font-bold mt-5 mb-3'>General</h3>
      <ul>
        <li>The Qube classes are available to students from Reception to Year 9</li>
        <li>All sessions are run by professional coaches, teachers, and trainers</li>
        <li>Registrations take place on a first-come-first-serve basis.</li>
        <li>If you are interested in registering more than one child, you need to complete a separate registration for each child.</li>
        <li>The minimum size of each class is 8 students.​</li>

      </ul>
    </div>
)