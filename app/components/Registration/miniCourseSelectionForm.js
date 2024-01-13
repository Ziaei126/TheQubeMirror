import React from 'react';

export default function MiniCourseSelectionForm({ formik, options, category }) {
  if (!options) {
    console.log("waiting")
    return <div>Loading...</div>; // Or a spinner
  }


  // Generate unique field names based on the category and ranking
  const firstChoiceFieldName = `${category}1`;
  const secondChoiceFieldName = `${category}2`;
  const thirdChoiceFieldName = `${category}3`;

  // Function to check if an option is selected in other fields
  const isOptionDisabled = (optionValue) => {
    return (
      formik.values[firstChoiceFieldName] === optionValue ||
      formik.values[secondChoiceFieldName] === optionValue ||
      formik.values[thirdChoiceFieldName] === optionValue
    );
  };

  // Function to render select dropdown including validation errors
  const renderSelect = (fieldName, placeholder) => {
    
  return (
    <div className="mb-4 relative">
      <select
        id={fieldName}
        name={fieldName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[fieldName]}
        className={` appearance-none w-full pl-3 pr-10 py-3 text-base bg-white  ${(formik.touched[fieldName] && formik.errors[fieldName]) ? ' border-rose-500 text-rose-500' : ''}  sm:text-sm rounded-md cursor-pointer border-2`}
        disabled={!options.length}
      >
        <option value="" >{placeholder}</option>
        {options.map(option => (
          <option 
            key={`${fieldName}-${option}`} 
            value={option}
            disabled={isOptionDisabled(option)}
          >
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.576 0 0.436 0.445 0.408 1.197 0 1.615l-4.695 4.502c-0.408 0.392-1.091 0.392-1.499 0l-4.695-4.502c-0.408-0.418-0.436-1.17 0-1.615z"/>
        </svg>
      </div>
      
    </div>
  )};

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-700 mb-4">{category}</h3>
      {renderSelect(firstChoiceFieldName, 'First Choice')}
      {renderSelect(secondChoiceFieldName, 'Second Choice')}
      {renderSelect(thirdChoiceFieldName, 'Third Choice')}
    </div>
  );
}