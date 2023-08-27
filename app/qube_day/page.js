import React from 'react'
import Image from 'next/image'
import Typewriter from 'app/components/Typewriter'
import TypewriterText from 'app/components/Typewriterloop'
import Item from 'app/components/qubeday/item'

function Day() {
  return (
    <>
    <div className="justify-center mx-auto pt-10 bg-cream">
      <h1 className='text-4xl font-bold mb-10 text-center'>Qube Day</h1>
      <Image src="/assets/kids10.webp" width='600' height='300' className='w-1/2 max-w-4xl mx-auto'/>
      <div className='bg-red-500 p-5 min-h-[120px] flex items-center justify-center'>
        
        <TypewriterText texts={["Apply Modern Teaching Methods", "Balance Quality vs. Quantity of Information", "Appreciate Differentiation and Individuality", "Aim for Positive Emotional Attachment to Religion","Believe in Social Binding"]} customClass="text-3xl md:text-4xl font-bold text-center"/>
      </div>

    </div>

    <Item title={"Apply Modern Teaching Methods"} description={["Experiential Project-based learning, Replacing theoretical learning of core beliefs","Giving learners confidence in their own thought processes and experiences","Indirect activity-based methods to teach deep Islamic concepts"]}
    imgs={
      [
        {src: "/assets/stemkids.webp", alt: "Stem & Monotheism Class"},
        {src: "/assets/stemdna.webp", alt: "Stem & Monotheism Class"}
      ]
    }
    />

<Item title={"Balance Quality vs. Quantity of Information"} description={["Internalising core Islamic beliefs through hands on experiences","Interactive tasks and activities instead of mono-toned approach","Allowing learners to experiment with multiple ways of achieving an outcome"]}
    imgs={
      [
        {src: "/assets/islalmic_architecture.webp", alt: "Islamic Architecture, Stem Class"},
        {src: "/assets/robotics_students.webp", alt: "Robotics Class"}
      ]
    }
    />

<Item title={"Appreciate Differentiation and Individuality"} description={["Aiding further development of identity through differentiated activities","Encouraging self-acceptance, self confidence, and growth mind-set","Giving the children room to be creative and provide their own input"]}
    imgs={
      [
        {src: "/assets/islamic_history_class.webp", alt: "Islamic History Class"},
        {src: "/assets/coding_class.webp", alt: "Coding Class"},
        {src: "/assets/star_students.webp", alt: "Star of the Week"}
      ]
    }
    />

<Item title={"Aim for Positive Emotional Attachment to Religion"} description={["Research and practice supports that, emotional attachment can motivate practice, replacing force/fear","Opportunities for emotional attachment towards religious characters, events and topics"]}
    imgs={
      [
        {src: "/assets/arbaeen_play_wide.webp", alt: "Arbaeen Play"},
        {src: "/assets/arbaeen_play.webp", alt: "Arbaeen Play"},
        {src: "/assets/forest_gathering.webp", alt: "Mid-Term Treasure Hunt", lb:true},
        {src: "/assets/treasure_map.webp", alt: "Treasure Hunt", lb:true},
        {src: "/assets/forest_trail.webp", alt: "Treasure Hunt", lb:true}
      ]
    }
    />

<Item title={"Believe in Social Binding"} description={["Teamwork and sports activities with friends to support identity building"]}
    imgs={
      [
        {src: "/assets/badminton_class.webp", alt: "Badminton Class"},
        {src: "/assets/football_class.webp", alt: "Football Class"}
      ]
    }
    
    />
  </>
  )
}

export default Day