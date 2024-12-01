'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';
import axios from 'axios';
import ScholarshipApplication from '@app/components/Registration/Scholarship.js'

function PaymentForm({ customer_email, regs, addChild}) {

  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');
  const [scholarship, setScholarship] = useState(null)
  const [conditions, setConditions] = useState(false);
  const [donation, setDonation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [children, setChildren] = useState([]);
  const [renderKey, setRenderKey] = useState(0);
  const [discount, setDiscount] = useState(null);
  const termPrice = 305;
  const yearPrice = 610; // this is changed for term 1, 2 & 3
  const donationPrice = 30;
  const MutliChildDiscount = 30;
  const yearDiscount = 92; // this is changed for term 1, 2 & 3

  // Function to validate the discount code and apply the discount
  const applyDiscount = () => {
    let discountAmount = 0;

    if (! scholarship?.applied) {
      
    switch (discountCode.trim().toUpperCase()) {
      case 'QUBERAGAIN' :
      case 'SECONDQUBER':
      case 'MESSENGER10':
      case 'EARLYQUBER':
      case 'QUBERSTAFF24':
        discountAmount = 30;
        break;
      case 'QUBERVOLUNTEERF24':
      case 'QUBERVOLUNTEERP24':
        discountAmount = 260;
        break;
      case 'GIRLS7PLUS':
        discountAmount = 92;
        break;
      case 'YAFATEMEH':
        discountAmount = 40;
        break;

      default:
        setDiscountError('Invalid discount code.');
    }

    // If a valid code, set the applied discount and clear any error message
    discountAmount *= children.filter(child => child.plan === 'term').length
  }
    setAppliedDiscount(() => discountAmount);
    setDiscountError('');
  };

  

  const scholarshipSubmission = (values) => {
    setScholarship(values)
    setAppliedDiscount(() => 0);
  } 

  
  useEffect(() => {
    const fetchEligibilityAndSetChildren = async () => {
      const newChildren = [];
  
      for (const reg of regs) {
        try {
          const response = await axios.post('/api/Registration/check_yearly_plan', {
            student_id: reg.student_id,
            parent_email: customer_email,
          });
  
          // Add to new children array with eligibility data
          newChildren.push({
            name: reg.studentName,
            plan: 'term',
            regId: reg.id,
            prev_yearly: response.data.eligibleForFreeTerm, // Store the eligibility directly in the child object
          });
        } catch (error) {
          console.error('Error checking eligibility:', error);
  
          // Add to new children array with default eligibility as false
          newChildren.push({
            name: reg.studentName,
            plan: 'term',
            regId: reg.id,
            prev_yearly: false,
          });
        }
      }
  
      setChildren(newChildren); // Update children with eligibility
    };
  
    fetchEligibilityAndSetChildren();
  }, [regs]);

  const handlePlanChange = (index, newPlan) => {
    console.log(index, newPlan, children)
    const updatedChildren = children
    updatedChildren[index].plan = newPlan;
    setChildren(() => updatedChildren);
    setRenderKey(prev => 1-prev)
    applyDiscount();
    console.log(children)
  };

  const removeChild = (indexToRemove) => {
    setChildren((prevChildren) => 
      prevChildren.filter((_, index) => index !== indexToRemove)
    );
  };

  const calculateSholarship = (total) => {
    if (scholarship?.applied) {
      return scholarship.amount * total
    }
    return total
  }

  const calculateTotal = () => {
    let total = children.reduce((sum, child) => {
      if (child.prev_yearly) {
        return sum; // Free term students don't contribute to the total
      }
      if (child.plan === "year") {
        return sum + yearPrice - yearDiscount;
      } else {
        return sum + termPrice;
      }
    }, 0);
    
    // Apply discount for multiple children
    total -= appliedDiscount;

    // Add donation if selected
    if (donation) total += donationPrice;

    return total;
  };
  const router = useRouter(); // Initialize router for redirection
  const handleSubmit = async (noPayment) => {
    
  
    if (!conditions || isSubmitting) return; // Prevent multiple submissions
  
    setIsSubmitting(true);
  
    try {
      if (noPayment) {
        // Process registrations directly if no payment is needed
        const response = await axios.post('api/Registration/update_payment_details', {
          customer_email,
          children,
        });
  
        if (!response.data.ok) throw new Error('Something went wrong');
        
        // Redirect to success page
        router.push('/register/success');
      } else {
        // Handle payment via Stripe
        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
        );
        if (!stripe) throw new Error('Stripe not loaded');
  
        const response = await axios.post('/api/Registration/checkout_session', {
          customer_email,
          children,
          donation,
          scholarship,
          discountCode,
        });
  
        const data = response.data;
        if (!data.ok) throw new Error('Something went wrong');
        
        await stripe.redirectToCheckout({
          sessionId: data.result.id,
        });
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(children)
  return (
  
    <div className="max-w-4xl mx-auto mt-2 p-2 ">
      <h2 className="text-4xl font-semibold text-gray-800 mb-6 text-center">Payment</h2>


    <div className="flex flex-col lg:flex-row justify-between gap-6">
      {/* Left Side: Brief Explanation */}
      <div className="lg:w-1/2 w-full text-left">
        <h3 className="text-2xl font-bold mb-4">Checkout</h3>
        <p className="text-gray-700">
        The Qube is a non-profit organizations and the fee charged for registration is only used to cover the costs incurred by the classes, including the cost of venue, teachers and teaching materials.
        </p>
        <ScholarshipApplication submission={scholarshipSubmission}/>
      </div>

      {/* Right Side: Summary Box */}
      <div className="lg:w-1/2 w-full bg-white shadow-lg rounded-lg border border-gray-200 p-5">
      <h3 className="text-2xl font-bold mb-6 text-center">Summary</h3>
      
      {/* Children Details */}
      <ul key={renderKey} className="space-y-6 mb-6">
  {children.map((child, index) => (
    <li key={index} className="flex flex-col space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {children.length > 1 && (
            <button
              onClick={() => removeChild(index)}
              className="mr-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 focus:outline-none"
            >
              ✕
            </button>
          )}
          <span className="font-semibold text-gray-800">{child.name}</span>
        </div>
        {child.prev_yearly ? (
          <span className="text-green-600">Free this term</span>
        ) : (
          <span className="font-semibold text-gray-700">£{child.plan === "year" ? (yearPrice - yearDiscount).toFixed(2) : termPrice}</span>
        )}
      </div>
      {!child.prev_yearly && (
        <div>
          <select
            value={child.plan}
            onChange={(e) => handlePlanChange(index, e.target.value)}
            className="w-full p-2 border rounded-md text-gray-700 bg-gray-100"
          >
            <option value="term">Pay for Term - £{termPrice}</option>
            <option value="year">Pay for Year - £{(yearPrice - yearDiscount).toFixed(2)} (15% off)</option>
          </select>
        </div>
      )}
    </li>
  ))}
</ul>

      {/* add child button */}
      <div className="flex justify-start w-full">
      <button
        className=" mb-2 bg-blue-500 text-white py-1 px-2 rounded-full"
        onClick={() => addChild()}
      >
        Register additional child
      </button>
      </div>
      

      {scholarship?.applied && (
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Scholarship</span>
          <span className="text-green-600">- £{(calculateTotal() - calculateSholarship(calculateTotal())).toFixed(2)}</span>
        </div>
      )}

      {
        <div>
        {/* Count the number of children with the "year" plan */}
        {children.filter(child => child.plan === 'year').length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">
              {children.filter(child => child.plan === 'year').length} x Year Discount
            </span>
            <span className="text-green-600">
              - £{(children.filter(child => child.plan === 'year').length * yearDiscount).toFixed(2)}
            </span>
          </div>
        )}
      </div>

      }

      {/* Donation */}
      {
        donation && (
          <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Scholarship Donation - Thank you</span>
          <span className="text-gray-600">£{donationPrice}</span>
          </div>
        )
      }

      {/* Applied Discount */}
      {appliedDiscount > 0 && (
        <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">{children.filter(child => child.plan === 'term').length} x Discount Applied</span>
          <span className="text-green-600">- £{appliedDiscount}</span>
        </div>
        </div>
      )}

      {/* Discount Code Input */}
      {
      children.filter(child => child.plan === 'term').length > 0 && ! scholarship?.applied &&
      (<div className="mb-2 mt-2">

        <div className="flex space-x-4">
          <input
            type="text"
            id="discountCode"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your discount code"
          />
          <button
            onClick={() => applyDiscount()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Apply
          </button>
        </div>
        {discountError && (
          <span className="text-red-500 mt-2">{discountError}</span>
        )}
      </div>)}
      <span className=' text-red-500'>
          Extra discounts do not apply to yearly payment or Scholarship
        </span>

      

      {/* Total */}
      <div className="flex justify-between items-center font-semibold text-xl mt-3 mb-6">
        <span>Total</span>
        <span>£{calculateSholarship(calculateTotal()).toFixed(2)}</span>
      </div>

      <hr/>

      

      {/* donation */}
      { scholarship?.applied ||
      <div>
        <p className='font-bold text-left mt-2'>
          Donate to Lady Khadija (PBUH) Scholarsip
        </p>
        <label className="flex items-center space-x-3 text-lg text-gray-700">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600 rounded"
            checked={donation}
            onChange={() => setDonation((prev) => (!prev))}
          />
          <span>
            £30 (10% of one student fee)
          </span>
        </label>
      </div>
      }
      {/* Terms & Conditions */}
      <div className="mb-4 mt-4">
        <label className="flex items-center space-x-3 text-lg text-gray-700">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600 rounded"
            checked={conditions}
            onChange={() => setConditions((prev) => (!prev))}
          />
          <span>
            I agree to the <Link href="/conditions" className="text-blue-600 hover:underline">terms and conditions</Link>.
          </span>
        </label>
      </div>

      {/* Submit Button */}
<button
  onClick={() => handleSubmit(calculateSholarship(calculateTotal()) === 0)}
  className={`w-full py-3 text-lg font-bold rounded-lg transition duration-300 ease-in-out focus:outline-none ${
    conditions
      ? 'bg-blue-500 hover:bg-blue-600 text-white'
      : 'bg-gray-300 cursor-not-allowed text-gray-500'
  } ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
  disabled={!conditions || isSubmitting}
>
  {isSubmitting
    ? 'Processing...'
    : calculateSholarship(calculateTotal()) === 0
    ? 'Confirm'
    : 'Pay Now'}
</button>

{/* Subtle Text */}
<p className="mt-4 text-sm text-gray-600 text-center">
  {calculateSholarship(calculateTotal()) === 0
    ? 'Please confirm your registration.'
    : 'Your payment information is safe and secure.'}
</p>
    </div>
    </div>
    </div>
  );
}

export default PaymentForm;