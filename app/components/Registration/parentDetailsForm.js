import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('First Name is required'),
  lastName: Yup.string()
    .required('Surname is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  address: Yup.string()
    .required('Address is required'),
  postcode: Yup.string()
    .required('Postcode is required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Contact Number must be only digits")
    .min(10, 'Contact Number must be at least 10 digits')
    .required('Contact Number is required'),
});

function ParentDetailsForm( {sucsessfulSubmit, session, signedIn} ) {

  //console.log("getting parent data")
  const [parentData, setParentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newParent, setNewParent] = useState(true);
  const [error, setError] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    async function fetchParentData() {
      setLoading(true);
      try {
        const response = await fetch('api/Registration/parent/findparent',
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
        //console.log('first response', response)
        if (!response.ok) {
          //console.log(response)
          throw new Error(`Network response was not ok`);
        }
        const data = await response.json();
        //console.log("data: ", data)
        setNewParent(data ? false : true)
        let Data = {
          name: data.name || '',
          lastName: data.lastName || '',
          email: data.email || '',
          address: data.address || '',
          postcode: data.postcode || '',
          phone: data.phone || '',
        }
        //console.log("Data: ", Data)
        setParentData(Data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    if (session) {
      fetchParentData();
    } else {

        let Data = {
          name: '',
          lastName: '',
          email: '',
          address: '',
          postcode: '',
          phone: '',
        }
        //console.log("Data: ", Data)
        setParentData(Data);
        setLoading(false);
    }
    
  }, []);

  //console.log('parent data', parentData)

  //console.log("new parent:", newParent)

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!parentData) return <div>No parent data found.</div>;

  return (

    <div className="container mx-auto px-4 py-8">
      <Formik
        initialValues={
          parentData
        }
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setButtonLoading((prev) => (!prev))
              fetch(`/api/Registration/parent/updateparent`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({...values, signedIn}),
              })
                .catch(error => {
                  console.log('Error submitting form: ', error)
                })
                .then(response => response.json())
                .then( parent => {
                  //console.log('parent email: ', parent);
                  sucsessfulSubmit(parent.email);
          })
              
        }}
        validateOnBlur={true}
        validateOnChange={true}
        enableReinitialize
      >
        <Form className="space-y-4 max-w-3xl mx-auto">
          <div className="text-lg font-semibold mb-6">Step 1: Parent's Details</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-5 rounded-lg bg-white">
            {/* First Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">First Name *</label>
              <Field name="name" type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage name="name" component="div" className="text-red-600" />
            </div>

            {/* Surname */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Surname *</label>
              <Field name="lastName" type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage name="lastName" component="div" className="text-red-600" />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
              <Field name="email" type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage name="email" component="div" className="text-red-600" />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address *</label>
              <Field name="address" type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage name="address" component="div" className="text-red-600" />
            </div>

            {/* Postcode */}
            <div>
              <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">Postcode *</label>
              <Field name="postcode" type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage name="postcode" component="div" className="text-red-600" />
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Contact Number *</label>
              <Field name="phone" type="tel"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage name="phone" component="div" className="text-red-600" />
            </div>
          </div>

          <div className="flex justify-end mt-6">
          <button disabled={buttonLoading} type="submit" className="px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              { buttonLoading ? "Loading..." : "confirm" }
            </button>
          </div>
        </Form>
      </Formik>
    </div >
  );
}

export default ParentDetailsForm;
