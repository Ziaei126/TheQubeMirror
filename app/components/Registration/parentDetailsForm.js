

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import { prisma } from '/lib/prisma';


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
        setParentData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchParentData();
  }, []);

  console.log(parentData)

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!parentData) return <div>No parent data found.</div>;

  return (
    <Formik
      initialValues={{
        name: parentData || '',
        lastName: '',
        email: parentData.email || '',
        phone: parentData.phone || ''
      }}
      onSubmit={(values) => {
        console.log(values);
        // handle form submission
      }}
    >
      <Form>
            <Field type="email" name="email" placeholder="Email" />
            <Field type="text" name="name" placeholder="Name" />
            <Field type="text" name="address" placeholder="Address" />
            <Field type="tel" name="phone" placeholder="Phone Number" />
            <button type="submit" >
              Submit
            </button>
          </Form>
        
    </Formik>
  );
}

export default ParentDetailsForm;
