"use client"

// MainComponent.jsx
import React, { useState } from 'react';
import CommonDataForm from '@app/components/form/CommonDataForm';
import AuthenticationOptions from '@app/components/form/AuthenticationOptions';

const MainComponent = () => {
  const [commonData, setCommonData] = useState(null);

  const handleCommonDataSubmit = (data) => {
    setCommonData(data);
  };

  return (

    
      <div className="flex flex-col justify-center items-center pt-10 bg-cream">
      <h1 className='text-4xl font-bold mb-10 text-center'>Sign up</h1>
      {!commonData ? (
        <CommonDataForm onCommonDataSubmit={handleCommonDataSubmit} />
      ) : (
        <AuthenticationOptions commonData={commonData} />
      )}
    </div>
  );
};

export default MainComponent;