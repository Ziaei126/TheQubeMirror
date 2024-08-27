'use client';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import axios from 'axios';


const PaymentForm = ({ customer_email }) => {
    const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
    if (!stripe) {
      return;
    }
    try {
      const response = await axios.post('/api/Registration/checkout_session', {
        customer_email: customer_email
      });
      const data = response.data;
      if (!data.ok) throw new Error('Something went wrong');
      await stripe.redirectToCheckout({
        sessionId: data.result.id
      });
    } catch (error) {
      console.log(error);
    }
  };
      
  return (
    
    <div className=" text-center">
    <label className="mb-4 text-lg text-gray-700 flex items-center justify-center space-x-2">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-600"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span>By paying you accept the terms and conditions.</span>
    </label>
    <button
      onClick={handleSubmit}
      className={`px-6 py-2 text-white font-bold rounded-lg transition duration-300 ease-in-out ${
        isChecked
          ? 'bg-blue-500 hover:bg-blue-700'
          : 'bg-gray-400 cursor-not-allowed'
      }`}
      disabled={!isChecked}
    >
      {isChecked ? 'Pay' : 'Check the box first'}
    </button>
  </div>
    
  );
};
export default PaymentForm;