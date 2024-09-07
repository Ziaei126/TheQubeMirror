// components/CourseForm.js
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import MiniCourseSelectionForm from './miniCourseSelectionForm';

export default function CourseForm({ sucsessfulSubmit, application }) {
  const [courseOptions, setCourseOptions] = useState({});
  const [loading, setLoading] = useState(true);
  console.log('application: ', application);

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
              yearGroup: application.yearGroup,
            }),
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

  const categories = ['Islamic', 'Skill', 'Sport', 'Language']; // Add more categories as needed
  const categoryColors = {
    Islamic: 'bg-blue-200',
    Skill: 'bg-green-200',
    Sport: 'bg-red-200',
    Language: 'bg-gray-200',
    // Add more categories and colors as needed
  };

  // Generate initial values based on categories
  const initialValues = categories.reduce((values, category) => ({
    ...values,
    [`${category}1`]: '',
    [`${category}2`]: '',
    [`${category}3`]: '',
  }), {});

  // Dynamically generate validation schema
  const validationSchema = Yup.object(
    categories.reduce((schema, category) => {
      if (category === 'Language') {
        // For Language, only one option is required
        return {
          ...schema,
          [`${category}1`]: Yup.string().required('You must select at least one option'),
        };
      }

      // For other categories, require 2 or 3 options based on the number of available choices
      const optionsAvailable = courseOptions?.[category]?.length || 3; // Default to 3 if no data is available
      const validations = {
        [`${category}1`]: Yup.string().required('Required'),
        [`${category}2`]: optionsAvailable > 1 ? Yup.string().required('Required') : Yup.string(),
        [`${category}3`]: optionsAvailable > 2 ? Yup.string().required('Required') : Yup.string(),
      };
      return { ...schema, ...validations };
    }, {})
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
        body: JSON.stringify({ content: values, id: application.id }),
      })
        .catch(error => {
          console.log('Error submitting form: ', error);
        })
        .then(response => response.json())
        .then(() => {
          sucsessfulSubmit();
        });
    },
  });

  if (loading) {
    return <div>Loading courses...</div>;
  }

  const gridColumns = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'; // This will create a 2x2 grid for four items

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-full sm:max-w-4xl mx-auto">
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
      <div className="flex justify-center">
        <button type="submit" className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </form>
  );
}