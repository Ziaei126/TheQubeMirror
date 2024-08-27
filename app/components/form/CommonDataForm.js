import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CommonDataForm = ({ onCommonDataSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required')
    }),
    onSubmit: (values) => {
      console.log(values);
      onCommonDataSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto bg-slate-50 p-6 shadow-lg rounded-md">
      <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="name">
        Full Name:
      </label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          formik.touched.name && formik.errors.name ? 'border-red-500' : ''
        }`}
        placeholder="Full Name"
      />
      {formik.touched.name && formik.errors.name ? (
        <p className="text-red-500 text-xs italic mt-2">{formik.errors.name}</p>
      ) : null}

      <label className="block text-gray-700 text-sm font-bold mb-1 mt-4" htmlFor="email">
        Email:
      </label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          formik.touched.email && formik.errors.email ? 'border-red-500' : ''
        }`}
        placeholder="Email"
      />
      {formik.touched.email && formik.errors.email ? (
        <p className="text-red-500 text-xs italic mt-2">{formik.errors.email}</p>
      ) : null}

      <label className="block text-gray-700 text-sm font-bold mb-1 mt-4" htmlFor="password">
        Password:
      </label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          formik.touched.password && formik.errors.password ? 'border-red-500' : ''
        }`}
        placeholder="********"
      />
      {formik.touched.password && formik.errors.password ? (
        <p className="text-red-500 text-xs italic mt-2">{formik.errors.password}</p>
      ) : null}

      <label className="block text-gray-700 text-sm font-bold mb-1 mt-4" htmlFor="confirmPassword">
        Confirm Password:
      </label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirmPassword}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''
        }`}
        placeholder="********"
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <p className="text-red-500 text-xs italic mt-2">{formik.errors.confirmPassword}</p>
      ) : null}

      <button
        type="submit"
        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-6"
      >
        Sign Up
      </button>
    </form>
  );
};

export default CommonDataForm;