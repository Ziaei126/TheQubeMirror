'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import ParentDetailsForm from '@app/components/Registration/parentDetailsForm';
import ChildDetailsForm from '@app/components/Registration/childDetailsForm'
import PaymentForm from '@app/components/Registration/paymentForm'
import CourseForm from '@app/components/Registration/courseSelectionForm';
import ProgressBar from '@app/components/Registration/progressbar';
import Link from 'next/link';

export default function Register() {
  const { data: session } = useSession();
  const [showInfo, setShowInfo] = useState(true)
  const [step, setStep] = useState(1)
  const [registration, setRegistration] = useState({})
  const [regset, setRegset] = useState(false);
  const [parent_email, setParent_email] = useState('')
  


  
  const handleParentFormSubmit = (email) => {
    setParent_email(email);
    setShowInfo(false)
    setStep(step+1);
  }

  const handleChildFormSubmit = (registration_info) => {
    setRegset(true);
    setRegistration(registration_info);
  }

  const handleCourseFormSubmit = (reg_id) => {
    setStep(step+1)
  }

  

  useEffect(() => {
    
    if (regset) {
    (registration.yearGroup < 1 || registration.yearGroup > 6 ) ? setStep(step+2) : setStep(step+1);
      setRegset(false)
  }
  }, [step, registration]);
  
    return (
<>
      
      
      
      <div className="flex flex-col justify-center items-center pt-10 bg-cream">
      <h1 className='text-4xl font-bold mb-10 text-center'>Registration</h1>

      {
  showInfo && <Info/>
}
<button className='m-2 bg-slate-100 hover:bg-slate-200 text-black font-semibold py-2 px-4 border border-slate-300 rounded shadow' 
onClick={() => setShowInfo(!showInfo)}>{showInfo ? "collapse" : "View key information"}</button>

      
      {
        <div className="w-full max-w-lg m-10">
        <ProgressBar step={step-1} />
        </div>
    }
      
      <div className='p-6 m-4 bg-white rounded-lg shadow-lg text-center'>

      {
       session ? (step == 1 && <ParentDetailsForm sucsessfulSubmit={handleParentFormSubmit} />) : <p>If you have not signed in, please <button className={'underline hover:text-blue-400'} onClick={() => signIn()}>sign in or sign up</button> first.</p>
      }

{
  session && step === 2 && (
    <ChildDetailsForm sucsessfulSubmit={handleChildFormSubmit} />
  )
}

{
  session && step === 3 && ( (registration.yearGroup > 0 && registration.yearGroup < 7) && 
    <CourseForm application={registration} sucsessfulSubmit={handleCourseFormSubmit} />
  )

}

{
  session && step === 4 && (
    <PaymentForm customer_email={parent_email} reg={registration}/>
  )
}
</div>
       


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


