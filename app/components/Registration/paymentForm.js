'use client';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';


function PaymentForm({ customer_email, reg }) {
  console.log('reg', reg)
  console.log('customer email:', customer_email)
  const [isChecked, setIsChecked] = useState(false);
  const [yearPay, setYearPay] = useState(false);
    

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleYearCheckboxChange = () => {
    setYearPay(!yearPay);
  };

  const handleSubmit = async (yearPay) => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
    if (!stripe) {
      return;
    }
    try {
      const response = await axios.post('/api/Registration/checkout_session', {
        customer_email,
        reg_id: reg.id,
        yearPay
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
      <span>Please accept the <Link href="/conditions">terms and conditions</Link></span>
    </label>
    <label className="mb-4 text-lg text-gray-700 flex items-center justify-center space-x-2">
      <input
        type="checkbox"
        className="form-checkbox h-5 w-5 text-blue-600"
        checked={yearPay}
        onChange={handleYearCheckboxChange}
      />
      <span>I will pay for the entire year for a 15% discount</span>
    </label>
    <button
      onClick={() => handleSubmit(yearPay)}
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