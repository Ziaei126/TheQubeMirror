import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CommonDataForm = ({ onCommonDataSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      familyName: '',
      email: '',
      role: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      familyName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      role: Yup.string().required('Select a role'),
    }),
    onSubmit: (values) => {
      onCommonDataSubmit(values);
    },
  });

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  };

  const selectStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    backgroundColor: '#fff',
  };

  const buttonStyle = {
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <form onSubmit={formik.handleSubmit} style={formStyle}>
      <input
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
        placeholder="Name"
        style={inputStyle}
      />
      <input
        name="familyName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.familyName}
        placeholder="Family Name"
        style={inputStyle}
      />
      <input
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        placeholder="Email"
        style={inputStyle}
      />
      <select
        name="role"
        onChange={formik.handleChange}
        value={formik.values.role}
        style={selectStyle}
      >
        <option value="">Select a role</option>
        <option value="parent">Parent</option>
        <option value="staff">Staff</option>
      </select>
      <button type="submit" style={buttonStyle}>
        Confirm
      </button>
    </form>
  );
};

export default CommonDataForm;