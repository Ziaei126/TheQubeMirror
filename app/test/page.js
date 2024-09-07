'use client'

import { useState } from "react";

const CheckoutSummary = () => {
  const [children, setChildren] = useState([
    { name: "John", plan: "term" },
    { name: "Sara", plan: "year" },
  ]); // Example data
  const [donation, setDonation] = useState(false);

  const handlePlanChange = (index, newPlan) => {
    const updatedChildren = [...children];
    updatedChildren[index].plan = newPlan;
    setChildren(updatedChildren);
  };

  const toggleDonation = () => {
    setDonation(!donation);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between p-6 gap-6">
      {/* Left Side: Brief Explanation */}
      <div className="lg:w-1/2 w-full">
        <h3 className="text-2xl font-bold mb-4">Checkout Summary</h3>
        <p className="text-gray-700">
        The Qube is a non-profit organizations and the fee charged for registration is only used to cover the costs incurred by the classes, including the cost of venue, teachers and teaching materials.
        </p>
      </div>

      {/* Right Side: Summary Box */}
      <div
        className="lg:w-1/2 w-full p-6 bg-white shadow-md rounded-lg border border-gray-200"
      >
        <h4 className="text-xl font-semibold mb-4">Summary</h4>
        <ul className="mb-4">
          {children.map((child, index) => (
            <li key={index} className="mb-2">
              <span className="font-medium">{child.name}</span> -{" "}
              <select
                value={child.plan}
                onChange={(e) => handlePlanChange(index, e.target.value)}
                className="border rounded-md p-2 text-gray-700"
              >
                <option value="term">Paying for a Term</option>
                <option value="year">Paying for a Year</option>
              </select>
            </li>
          ))}
        </ul>

        {/* Donation Checkbox */}
        <div className="mb-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={donation}
              onChange={toggleDonation}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span className="text-gray-700">Add a donation of $10 to support the program</span>
          </label>
        </div>

        {/* Total Amount */}
        <div className="border-t border-gray-300 pt-4">
          <h4 className="text-lg font-semibold">Total</h4>
          <p className="text-gray-700">
            Payment for {children.length} children.{" "}
            {donation ? "Including a donation of $10." : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;