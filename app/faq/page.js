import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function FAQ() {
  return (
    <>
    <div className='max-w-6xl mx-auto p-5'>
    <h1 className='text-center'>FAQ</h1>
    
    <QA
      question="What's an example timetable for a day?"
      answer="Below is an example timetable for a typical day, the final timetable will be sent after the registrations are finished."
     >
        <Image src='/assets/example_time_table.webp' width={1000} height={1000} className='mx-auto w-auto'/>
        </QA>

        <QA
      question="Are there classes during half term?"
      answer="The Qube classes will be off during the half term for one week, you will receive the exact calendar in the parents handbook."
     />

<QA
      question="Why are you only offering classes for year 1–6 ?"
      answer="Identity building starts from an early age. Our aim is to focus on the first couple of age groups for the start of our activities, expanding to other age groups in the coming years. We want to take one step at a time to be able to offer a very high quality level of education from the start."
     />

<QA
      question="How is The Qube different from other religious education providers?"
      answer={
        <>
          We are very much data and evidence driven as a group and Our core focus at The Qube is on building a strong Islamic identity for the youth in our community. About 18 months ago we carried out a research with parents and experts across Europe and identified challenges and opportunities moving forward. You can take a look at our findings <Link href='https://www.wearetheqube.com/_files/ugd/b2649a_9ac6683b908947c48e20cee36878a722.pdf' className="underline hover:no-underline">here</Link>. We will also bring professional coaches, trainers and teachers to deliver on our promise of high-quality education.
        </>
      }
     />

<QA
      question="Is The Qube a business?"
      answer="The Qube is a community initiative and is registered as a none-profit community initiative company (CIC)."
     />

<QA
      question="How much is the fee for the courses?"
      answer="The fee is £305 per term for each child. This fee is charged to pay for the venue, teachers and the teaching materials. "
     />

<QA
      question="Can we just register for one of the three sessions on Sundays?"
      answer="We strongly believe in building rounded individuals by focusing on religious activities, sports, and skills all at the same time. The sessions are therefore up for grabs as a whole and not individually."
     />

<QA
      question="Why should I choose three preferences per category?"
      answer="We will assign the students to the courses as they register. If the course is full by the time you register or if it does not reach the minimum required, the students will be assigned their second or third choices."
     />

<QA
      question="Can students change between courses after registration and/or start of the courses?"
      answer="After the first session, the parents can request a change in the courses that their child/children are attending, however acceptance of the request will be subject to availability and other conditions."
     />
    
    <QA
      question="Will there be food and refreshments?"
      answer="Not at the moment. Children are advised to bring their own food and refreshments. We’re open to one of the parents opening a small shop to sell snack and food. If you’re interested, please contact us on admin [at] wearetheqube.com"
     />

<QA
      question="Can I get a refund after registering for classes?"
      answer="No, this is because we have limited time before the start of the term. We also have limited spaces for this term, so once you register you cannot cancel before or during the term. We will only refund fees if we have to cancel classes or fail to deliver on one of your preferred choices."
     />
    </div>
    </>
  )
}

export default FAQ

const QA = ({question, answer, children}) => {
  return (
    <div className='my-5 leading-relaxed text-xl'>
      <h3 className='font-bold'>{question}</h3>
      <p className='font-light'>{answer}</p>
      {children}
    </div>
  )
}