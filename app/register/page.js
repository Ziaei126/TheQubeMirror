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
import ChooseRegistration from '@app/components/Registration/chooseRegistrationForm';
import Link from 'next/link';

// [
//   'Parent Details',
//   'Child Details',
//   'Class Selection',
//   'Payment'
// ]

export default function Register() {
  const { data: session } = useSession();
  const [showInfo, setShowInfo] = useState(true)
  const [step, setStep] = useState('')
  const [registrations, setRegistrations] = useState([])
  const [regset, setRegset] = useState(false);
  const [email, setEmail] = useState('')
  const [courseSelectToggle, setCourseSelectToggle] = useState(false)
  const [signedIn, setSignedIn] = useState(true);
  const [regFocus, setRegFocus] = useState(0);
  const [yearIndex, setYearIndex] = useState(-1);
  const regOpen = process.env.REGISTRATION_OPEN === 'true';

  const handleNoSignIn = () => {
    setSignedIn((prev) => false)
    setStep('Parent Details')

  }

  const addChild = () => {
    setRegFocus((prev) => prev+1)
    setStep('Child Details')
  }

  const handleRegSelect = (regs) => {
    if (regs) {
      setRegistrations(regs);
      setEmail(regs[0].parentEmail);
      setShowInfo(false)

      setStep('Payment')
    } else {
      setStep('Parent Details')
    }
  }

  const HandleYearGroupChosen = (year_index) => {
    if (year_index > 0 && year_index < 3) { setCourseSelectToggle((prev) => true); console.log('toggled in main page'); }
    setYearIndex(year_index)

  }

  const handleParentFormSubmit = (email) => {
    setEmail(email);
    setShowInfo(false)
    setStep('Child Details');
  }

  const handleChildFormSubmit = (registration_info) => {
    setRegistrations((prev) => [...prev, registration_info]);
    setRegset(true);
  }

  const handleCourseFormSubmit = (reg_id) => {
    setStep('Payment')
  }



  useEffect(() => {

    if (regset) {
      if (registrations[regFocus].yearGroup < 1 || registrations[regFocus].yearGroup > 6) { setStep('Payment') }
      else { setCourseSelectToggle((prev) => true); setStep('Class Selection'); };
      setRegset(false)
    }
  }, [regset]);

  return (
    <>



      <div className="flex flex-col justify-center items-center pt-10 bg-cream">
        <h1 className='text-4xl font-bold mb-10 text-center'>Registration</h1>

        {
          showInfo && <Info />
        }
        <button className='m-2 bg-slate-100 hover:bg-slate-200 text-black font-semibold py-2 px-4 border border-slate-300 rounded shadow'
          onClick={() => setShowInfo(!showInfo)}>{showInfo ? "collapse" : "View key information"}</button>

        { yearIndex == 0 && step == 'Child Details' && < InfoCourse year_index={yearIndex} />}
        { yearIndex == 3 && step == 'Child Details' && < InfoCourse year_index={yearIndex} />}
        { yearIndex < 3 && yearIndex > 0 && step == 'Class Selection' && < InfoCourse year_index={yearIndex} />}
        


        {
          <div className="w-full max-w-lg m-10">
            <ProgressBar stepName={step} courseSelect={courseSelectToggle} />
          </div>
        }

        <div className='p-6 m-4 bg-white rounded-lg shadow-lg text-center'>

          {step == '' && ( !regOpen ? (
            <div className="p-4 bg-gray-100 rounded-md">
            <p className=" text-gray-700 text-center">
              Registration is not open yet! Come back later...
            </p>
            </div>
          ) :
            (session ? (<ChooseRegistration sucsessfulSubmit={handleRegSelect} session={session} />) :
              <div className="p-4 bg-gray-100 rounded-md">
                <p className="mb-4 text-gray-700 text-center">
                  It is recommended that you sign in or sign up before registering. This way, your form will auto-fill, and you will have access to your child's online dashboard.
                </p>
                <div className="flex justify-center space-x-4">
                  {/* Sign In Button */}
                  <button
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-200"
                    onClick={() => signIn()}
                  >
                    Sign in or Sign up
                  </button>
                  {/* Ignore Button */}
                  
                  <button
                    className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 "
                    onClick={handleNoSignIn}
                  >
                    Ignore sign in and continue
                  </button>
                </div>
              </div>
            ))}

          {
            (step == 'Parent Details' && <ParentDetailsForm sucsessfulSubmit={handleParentFormSubmit} session={session} signedIn={signedIn} />)
          }

          {
            (step === 'Child Details' &&
              <ChildDetailsForm sucsessfulSubmit={handleChildFormSubmit} yearGroupChosen={HandleYearGroupChosen} session={session} signedIn={signedIn} email={email} />
            )
          }

          {
            (step === 'Class Selection' && (registrations[regFocus].yearGroup > 0 && registrations[regFocus].yearGroup < 7) &&
              <CourseForm application={registrations[regFocus]} sucsessfulSubmit={handleCourseFormSubmit} />
            )

          }

          {
            (step === 'Payment' &&
              <PaymentForm customer_email={email} regs={registrations} addChild={addChild} />
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

const InfoCourse = ({ year_index }) => {
  return (
    <div className="info-box p-6 m-5 bg-gray-100 rounded-lg shadow-lg max-w-4xl">
      {year_index < 3 && year_index > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Course Information for Year 1-6</h3>
          <p>
            <strong>Course Selection</strong>: All courses fall under 4 main categories: Islamic, Skills Development, Sports
            Activities, and Languages. <Link 
  href='/courses' 
  className="text-blue-500 underline hover:text-blue-700 focus:outline-none" 
  target="_blank" 
  rel="noopener noreferrer"
>
  See full list here.
</Link></p>
            <p>Your registration must include 3 choices per category in order of preference.</p>
            <p>All students must choose a language course, and the choice will stay the same throughout the year.</p>
          
          <p className="mt-4">
            <strong>How do I register?</strong>
          </p>
          <ol className="list-decimal ml-6">
            <li>All courses fall under 4 main categories: Islamic, Skills Development, Sports training, and Languages. You must select one course per category.</li>
            <li>Please nominate 3 different courses per category ordered by your preference. For example, under the Sports category, you may nominate Football as your first choice followed by Badminton and Athletics as your 2nd and 3rd preferences.</li>
            <li>We aim to register your first nomination, although this is not guaranteed as it will depend on the overall course demand. If your first choice is not possible, we will ensure your child is registered for one of the other choices.</li>
            <li>This term, we will assign the places as the registrations happen as all classes have size limits.</li>
            <li>To register, follow the below steps and then proceed to the payment section.</li>
          </ol>
        </div>
      )}

      {year_index == 3 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Course Information for Year 7-9</h3>
          <p>
            Our program is designed to provide a dynamic and engaging learning experience for older kids, fostering an environment where they can deepen their understanding of important Islamic topics while having a blast along the way. At The Qube, we take pride in offering an inclusive environment where Islamic values and concepts are at the core of our curriculum.
          </p>
          <p className="mt-4">
            In The Qube year 7+ Program, we strive to empower young minds with ago-appropriate activitios that encourage critical thinking and personal growth.
          </p>
          <p>
          Here's a glimpse of what your child can expect:
          </p>
          <ul className="list-disc ml-6">
            <li>Exploring Islamic Concepts: Through discussions, interactive sessions, and hands-on activities, we dive into a number of Islamic concepts. Whether it's delving into history, belief, or Akhlaq (ethics), we challenge their curious minds while emphasizing the values and teachings of Ahlul Bayt (AS).</li>
            <li>Building Confidence and Leadership: We encourage students to take the lead in group projects, discussions, and presentations, all while nurturing their understanding of Islamic core concepts and culture. These experiences help them develop essential leadership skills and build confidence in expressing their ideas within the context of their faith.</li>
            <li>Staying Active: Physical activity remains an essential part of our program. Through sports and athletics, we keep the fun alive while promoting a healthy and active lifestyle in harmony with Islamic principles of well-being.</li>
          </ul>
          <p className="mt-4">
            Our aim is to provide your child with a well-rounded educational experience that prepares them for the challenges and opportunities ahead while nurturing their understanding of Islamic values, culture, and core concepts. We look forward to having your child as part of The Qube, where learning is an adventure, and curiosity is celebrated within the context of our faith.
          </p>
        </div>
      )}

      {year_index == 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Course Information for Reception</h3>
          <p>
            The Qube Reception class has been designed to create an environment of positivity where the children are introduced to the foundations of Islamic belief in the simplest forms through observations, storytelling, games, and lots of fun and laughter.
          </p>
          <p className="mt-4">
            Children will be given age-appropriate tasks and activities to allow them to explore and discuss Allah’s creations around them, such as animals. They will investigate the possibility of animals being created differently, concluding that Allah is the best creator and the only creator.
          </p>
          <p className="mt-4">
            They will be introduced to verses of the Quran and Hadith, focusing on Islamic etiquette and behavior while familiarizing themselves with the necessary vocabulary used in Islam.
          </p>
          <p className="mt-4">
            They will also have a session of free play, including arts and crafts activities, and a session of sports and athletics games to get their hearts pumping and keep the fun to the maximum.
          </p>
        </div>
      )}
    </div>
  );
};


