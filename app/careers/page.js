"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function Careers() {
  return (
    <>
      <section className="">
      <h1 className='text-4xl font-bold mb-10 text-center'>Join Us</h1>
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


        <CareerApplicationForm />
          
      </section>
    </>
  );
}

export default Careers;




const CareerApplicationForm = () => {
  const formSections = [
    {
      name: "Please provide details of your availability and what you can offer the Qube.",
      questions: [
        {
          id: "weekly_availability",
          type: "MCQ",
          question: "How often will you be able to volunteer for the cause?",
          options: ["1 hour a week", "2-4 hours a week", "+4 hours a week"],
          required: true,
        },
        {
          id: "sunday_availability",
          type: "MCQ",
          question:
            "Will you be able to help us on-site during term time on Sundays in North West London? (10am-3pm)",
          options: [
            "Yes",
            "Yes; but only for a couple of hours",
            "No; but I can help remotely",
            "other",
          ],
          required: true,
        },
        {
          id: "team",
          type: "MMCQ",
          question:
            "What can you help us with? Choose as many as applicable",
          options: [
            "Operations (on-site)",
            "Admin Team",
            "Marketing Team",
            "Education Team",
            "Design and Graphics",
            "Community Management (WhatsApp group and Instagram account)",
            "Events",
            "Research",
            "Copywriting (for our blog etc)",
            "Fundraising",
            "Working with children",
            "Teaching (please mention your area of expertise)",
            "Running Workshop",
            "Other",
          ],
          required: true,
        },
        {
          id: "explain",
          type: "long text",
          question:
            "Please tell us a little bit about yourself and what you selected above (if needs further explanation)",
          required: false,
        },
      ],
    },
    {
      name: "Please provide your contact details so we can get in touch with you.",
      questions: [
        {
          id: "name",
          type: "short text",
          question: "Full Name",
          required: true,
        },
        {
          id: "email",
          type: "email",
          question: "Email",
          required: true,
        },
        {
          id: "telephone",
          type: "tel",
          question: "Contact Number",
          required: false,
        },
      ],
    },
    {
      name: "The following optional questions will help us to make The Qube more inclusive and diverse for everyone.",
      questions: [
        {
          id: "age",
          type: "MCQ",
          question: "How old are you?",
          options: ["16-17", "18-25", "25-35", "36-50", "+51"],
          required: false,
        },
        {
          id: "gender",
          type: "MCQ",
          question: "Gender",
          options: ["Female", "Male"],
          required: false,
        },
        {
          id: "ethnicity",
          type: "MCQ",
          question: "Which community/ethnicity do you identify with?",
          options: [
            "Iraqi",
            "Pakistani",
            "Khoja",
            "Afghan",
            "Iranian",
            "Lebanese",
            "British",
            "Other",
          ],
          required: false,
        },
      ],
    },
  ];

  const initialValues = {};
  const validationSchema = {};

  formSections.forEach((section) => {
    section.questions.forEach((q) => {
      initialValues[q.id] = q.type === "MMCQ" ? [] : "";
      if (q.required) {
        validationSchema[q.id] =
          q.type === "MMCQ"
            ? Yup.array().min(1, "At least one option is required")
            : Yup.string().required("This field is required");
      }
    });
  });

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values, {resetForm}) => {
      try {
        
        const response = await fetch('/api/career-application', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        if (response.ok) {
          alert('Form submitted successfully!');
          resetForm();
        } else {
          alert('Failed to submit the form.');
        }
      } catch (error) {
        console.error('Error submitting the form:', error);
        alert('An error occurred. Please try again.');
      }
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-6">Career Application Form</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {formSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <h2 className="text-xl font-semibold">{section.name}</h2>
            {section.questions.map((q, qIndex) => (
              <div key={qIndex} className="space-y-2">
                <label className="block text-sm font-bold" htmlFor={q.id}>
                  {q.question} {q.required && <span className="text-red-500">*</span>}
                </label>
                {q.type === "MCQ" && (
                  <div className="space-y-2">
                    {q.options.map((option, optIndex) => (
                      <label key={optIndex} className="flex items-center">
                        <input
                          type="radio"
                          name={q.id}
                          value={option}
                          onChange={formik.handleChange}
                          checked={formik.values[q.id] === option}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
                {q.type === "MMCQ" && (
                  <div className="space-y-2">
                    {q.options.map((option, optIndex) => (
                      <label key={optIndex} className="flex items-center">
                        <input
                          type="checkbox"
                          name={q.id}
                          value={option}
                          onChange={(e) => {
                            const valueArray = [...formik.values[q.id]];
                            if (e.target.checked) {
                              valueArray.push(option);
                            } else {
                              valueArray.splice(valueArray.indexOf(option), 1);
                            }
                            formik.setFieldValue(q.id, valueArray);
                          }}
                          checked={formik.values[q.id].includes(option)}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
                {q.type === "short text" || q.type === "email" || q.type === "tel" ? (
                  <input
                    type={q.type === "short text" ? "text" : q.type}
                    id={q.id}
                    name={q.id}
                    onChange={formik.handleChange}
                    value={formik.values[q.id]}
                    className="w-full p-2 border rounded"
                  />
                ) : null}
                {q.type === "long text" && (
                  <textarea
                    id={q.id}
                    name={q.id}
                    rows="4"
                    onChange={formik.handleChange}
                    value={formik.values[q.id]}
                    className="w-full p-2 border rounded"
                  ></textarea>
                )}
                {formik.errors[q.id] && (
                  <p className="text-red-500 text-sm">{formik.errors[q.id]}</p>
                )}
              </div>
            ))}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
