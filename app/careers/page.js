"use client";

import React from "react";
import MCQ from "@app/components/form/MCQ";
import Form from "@app/components/form/Form";

function Careers() {
  return (
    <>
      <section className="">
        <h1 className="text-center m-5">Join Us</h1>
        <div className="flex flex-col justify-center max-w-4xl mx-auto border rounded bg-pastel-orange p-3 gap-y-5 m-5">
          <h2 className="text-center">
            إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ إِنَّا لَا نُضِيعُ
            أَجْرَ مَنْ أَحْسَنَ عَمَلًا
          </h2>
          <p className="text-center">
            "As for those who believe and do good, We certainly never deny the
            reward of those who are best in deeds." (18:30)
          </p>
          <p>
            The Qube is a community driven initiative where everyone from our
            community of Ahlulbayt lovers join to build a future where our
            children take pride in their Muslim identity.{" "}
          </p>
          <p>
            An initial team of 8 has now grown to +15 and that's not including
            our professional teachers.
          </p>
          <p>
            Starting back in Ramadhan 2021 with the mini camps at Gladstone
            park, we have successfully completed three teaching terms delivering
            tens of classes, to 60+ students and a range of fun activities.{" "}
          </p>
          <p>
            Our vision is to bring up well-rounded individuals who succeed in
            their personal lives with a strong belief, who also go on to put
            their skills at the service of Ahlulbayt.
          </p>
          <p>Let's build something great for our next generation</p>
        </div>


        <Form form_template={"career_application"} 
        styles = {{"form":"flex flex-col justify-center max-w-4xl mx-auto gap-5",
                  "section" : {
                    "full" : {
                      "all" : "border rounded bg-slate-300 p-3 gap-y-5",
                      "2" : "flex flex-wrap gap-2"   
                    },
                    "title" : {
                      "all" : "text-2xl bold"
                    }
                    
                  },
                  "longText": "mt-2 p-2 w-full border rounded-md",
                    "shortText" : " border rounded-md",
                    "button" : " p-3 bg-pastel-orange mx-auto w-20 mb-3"
        }}
        />
      </section>
    </>
  );
}

export default Careers;
