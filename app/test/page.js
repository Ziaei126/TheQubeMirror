"use client"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UserForm = () => {
  const initialValues = {
    name: '',
    email: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const onSubmit = async (values) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        alert('User created successfully!');
      } else {
        alert('Failed to create user');
      }
    } catch (error) {
      alert('An error occurred while creating the user');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field id="name" name="name" type="text" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field id="email" name="email" type="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;