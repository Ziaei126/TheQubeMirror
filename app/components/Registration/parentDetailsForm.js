import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First Name is required'),
  surname: Yup.string()
    .required('Surname is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  address: Yup.string()
    .required('Address is required'),
  postcode: Yup.string()
    .required('Postcode is required'),
  contactNumber: Yup.string()
    .matches(/^[0-9]+$/, "Contact Number must be only digits")
    .min(10, 'Contact Number must be at least 10 digits')
    .required('Contact Number is required'),
});

function ParentDetailsForm() {

  console.log("getting parent data")
  const [parentData, setParentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchParentData() {
      setLoading(true);
      try {
        const response = await fetch('api/Registration/findparent',
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
        );
        if (!response.ok) {
          console.log(response)
          throw new Error(`Network response was not ok`);
        }
        const data = await response.json();
        console.log("data: ",data)
        setParentData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchParentData();
  }, []);

  console.log('parent data',parentData)

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!parentData) return <div>No parent data found.</div>;

  return (
    
        <div className="container mx-auto px-4 py-8">
          <Formik
            initialValues={{
              firstName: parentData.name || '',
              surname: parentData.lastName || '',
              email: parentData.email || '',
              address: '',
              postcode: '',
              contactNumber: parentData.phone || '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // Handle form submission
              console.log(values);
            }}
            validateOnBlur={true}
        validateOnChange={true}
          >
            <Form className="space-y-4 max-w-3xl mx-auto">
              <div className="text-lg font-semibold mb-6">Step 1: Parent's Details</div>
    
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-5 rounded-lg bg-white">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name *</label>
                  <Field name="firstName" type="text" required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
    
                {/* Surname */}
                <div>
                  <label htmlFor="surname" className="block text-sm font-medium text-gray-700">Surname *</label>
                  <Field name="surname" type="text" required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
    
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
                  <Field name="email" type="email" required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
    
                {/* Address */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address *</label>
                  <Field name="address" type="text" required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
    
                {/* Postcode */}
                <div>
                  <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">Postcode *</label>
                  <Field name="postcode" type="text" required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
    
                {/* Contact Number */}
                <div>
                  <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number *</label>
                  <Field name="contactNumber" type="tel" required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
    
              <div className="flex justify-end mt-6">
                <button type="submit" className="px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  confirm
                </button>
              </div>
            </Form>
          </Formik>
        </div>
  );
}

export default ParentDetailsForm;
