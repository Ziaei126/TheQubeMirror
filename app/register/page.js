'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import ParentDetailsForm from 'app/components/Registration/parentDetailsForm'
import ChildDetailsForm from 'app/components/Registration/childDetailsForm'
import PaymentForm from 'app/components/Registration/paymentForm'
import CourseForm from '@app/components/Registration/courseSelectionForm';
import {NextUIProvider} from "@nextui-org/react";
import {Slider} from "@nextui-org/react";






export default function Register() {
  const { data: session } = useSession();
  const [showInfo, setShowInfo] = useState(true)
  const [step, setStep] = useState(1)
  const [registration, setRegistration] = useState({})


  
  const handleParentFormSubmit = () => {
    console.log(step)
    setStep(step+1)
  }

  const handleChildFormSubmit = (registration_info) => {
    setRegistration(registration_info)
    (registration.ageGroup < 1 || registration.ageGroup > 6 ) ? setStep(step+2) : setStep(step+1);
  }

  const handleCourseFormSubmit = () => {
    setStep(step+1)
  }

  useEffect(() => {
    console.log("step: ", step);
    console.log("registration" ,registration)
  }, [step, registration]);
  
    return (

      <NextUIProvider>
      
      
      <div className="flex flex-col justify-center items-center pt-10 bg-cream">
      <h1 className='text-4xl font-bold mb-10 text-center'>Registration</h1>
      
  
      {
        showInfo && <Info/>
      }
      <button className='m-2 bg-slate-100 hover:bg-slate-200 text-black font-semibold py-2 px-4 border border-slate-300 rounded shadow' 
      onClick={() => setShowInfo(!showInfo)}>{showInfo ? "collapse" : "View key information"}</button>
      <Slider 
       
       aria-label="Form Progress"
      size="lg"
      step={1}
      maxValue={4}
      minValue={1}
      value={step}
      disableThumbScale
      showSteps
      marks={[
        {
          value: 1,
          label: "Parent Details",
        },
        {
          value: 2,
          label: "Child Details",
        },
        {
          value: 3,
          label: "Course Selection",
        },
        {
          value: 4,
          label: "Payment",
        },
      ]}
    
      hideValue

      classNames={{
        base: "max-w-lg m-5",
        slider: [
          "data-[hover=true]:cursor-default"
        ],

        thumb: [
          "data-[hover=true]:cursor-default",
          "data-[focused]:cursor-default"
          
        ],
      }}
    />
      
      

      {
       session ? (step == 1 && <ParentDetailsForm sucsessfulSubmit={handleParentFormSubmit} />) : <p>If you have not signed in, please <Link href="/signin">sign in</Link> first.</p>
      }

{
  session && step === 2 && (
    <ChildDetailsForm sucsessfulSubmit={handleChildFormSubmit} />
  )
}

{
  session && step === 3 && ( (registration.yearGroup > 0 && registration.yearGroup < 7) ? 
    <CourseForm application={registration} sucsessfulSubmit={handleCourseFormSubmit} /> : () => {console.log("I have been triggered")}
  )

}

{
  session && step === 4 && (
    <PaymentForm sucsessfulSubmit={handlePaymentFormSubmit} />
  )
}
        

        
        
        </div>
      </NextUIProvider>
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


