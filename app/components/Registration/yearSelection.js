import { useState } from 'react';

const YearSelection = () => {
  const [selectedYear, setSelectedYear] = useState('');

  // Function to handle selection
  const handleSelection = (year) => {
    setSelectedYear(year);
  };

  return (
    
      <div className="w-full max-w-md  p-6">
        <h2 className="text-center text-gray-700 font-medium text-lg mb-4">
          Please choose the school year of your child (for academic year 2023-24)
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => handleSelection('Reception')}
            className={`py-4 rounded-md font-semibold text-white text-center ${
              selectedYear === 'Reception' ? 'bg-red-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            Reception
          </button>
          <button
            onClick={() => handleSelection('Year 1-6')}
            className={`py-4 rounded-md font-semibold text-white text-center ${
              selectedYear === 'Year 1-6' ? 'bg-red-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            Year 1-6
          </button>
          <button
            onClick={() => handleSelection('Year 7-9')}
            className={`py-4 rounded-md font-semibold text-white text-center ${
              selectedYear === 'Year 7-9' ? 'bg-red-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            Year 7-9
          </button>
        </div>
        

        {selectedYear && (
          <p className="mt-4 text-center text-gray-700">
            You have selected: <span className="font-bold">{selectedYear}</span>
          </p>
        )}
      </div>
    
  );
};

export default YearSelection;