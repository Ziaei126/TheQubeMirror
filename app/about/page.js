import Explanation from '@app/components/explanation'
import React from 'react'

function About() {
  return (
    <section className=" bg-cream flex flex-col justify-center p-5">
    <h1 className='text-4xl font-bold mb-10 text-center'> About The Qube </h1>
    <Explanation description={"The Qube is a passion project that aims to create a safe space for children and their families to learn, have fun and thrive with others who share their faith and Islamic values and consequently develop their Muslim identities.\n\nThe Qube was born from our vision to build a lasting, self-sufficient community that not only educates but inspires and empowers young Muslims to explore their talents, follow their passions and nurture their sense of self.\n\nThe Qube is a combination of a supplementary school and a community center for parents to cater to the whole family as we believe that healthy effective development is optimum when the whole family is on the same boat and advances in with a holistic approach."} img="/assets/pilot.webp" inverted/>
    </section>
  )
}

export default About