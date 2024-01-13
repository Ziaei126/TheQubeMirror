// components/CourseForm.js
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import MiniCourseSelectionForm from './miniCourseSelectionForm';

export default function CourseForm( {sucssefulSubmit} ) {
  const [courseOptions, setCourseOptions] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch course options when the component mounts
  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch('/api/Registration/courseSelection/coursePrep',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: 1,
            yearGroup: 3,})
            
        }
      );
        const data = await response.json();
        setCourseOptions(data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCourses();
  }, []);

  useEffect(() => {
    console.log(courseOptions)
  }, [courseOptions])

  const categories = ['Islamic', 'Skill', 'Sport', 'Languge']; // Add more categories as needed
  const categoryColors = {
    Islamic: 'bg-blue-200',
    Skill: 'bg-green-200',
    Sport: 'bg-red-200',
    Languge: 'bg-yellow-200',
    // Add more categories and colors as needed
  };

// Generate initial values
const initialValues = categories.reduce((values, category) => ({
  ...values,
  [`${category}1`]: '',
  [`${category}2`]: '',
  [`${category}3`]: '',
}), {});

// Generate validation schema
const validationSchema = Yup.object(
  categories.reduce((schema, category) => ({
    ...schema,
    [`${category}1`]: Yup.string().required('Required'),
    [`${category}2`]: Yup.string().required('Required'),
    [`${category}3`]: Yup.string().required('Required'),
  }), {})
);

// Use the generated initialValues and validationSchema with useFormik
const formik = useFormik({
  initialValues: initialValues,
  validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      fetch(`/api/Registration/courseSelection/uploadSelection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .catch(error => {
          console.log('Error submitting form: ', error)
        })
        .then(response => response.json())
  .then( child => {
      sucsessfulSubmit()
  })
    }
  });

  if (loading) {
    return <div>Loading courses...</div>;
  }

  const gridColumns = 'grid-cols-2'; // This will create a 2x2 grid for four items

return (
  <form onSubmit={formik.handleSubmit} className="max-w-full md:max-w-4xl mx-auto">
    <div className={`grid ${gridColumns} gap-4 p-4`}>
      {categories.map((category) => (
        <div key={category} className={`${categoryColors[category]} p-4 rounded-lg shadow-md`}>
          <MiniCourseSelectionForm 
            formik={formik} 
            options={courseOptions?.[category]} 
            category={category}
          />
        </div>
      ))}
    </div>
    <button type="submit" className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded">
      Submit
    </button>
  </form>
)}