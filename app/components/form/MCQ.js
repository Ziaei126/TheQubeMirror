import React from 'react'
import {useState, useEffect, useRef} from 'react'

function MCQ({question, options, name, explenation, multi, required}) {
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [isAnySelected, setIsAnySelected] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const multiAnswerSeperator = ":;:"

  const mcqContainerRef = useRef(null);

  

  useEffect(() => {
    // Reset the "other" selection state when options change
    setIsOtherSelected(false);
    setIsAnySelected(false);
  }, [options]);

  const handleOptionChange = (e) => {
    const anyChecked = Array.from(mcqContainerRef.current.querySelectorAll('input[type="checkbox"]'))
        .some(checkbox => checkbox.checked);

        setIsAnySelected(anyChecked);

        if (multi) {
          if (e.target.checked) {
            setSelectedAnswers(prev => [...prev, e.target.value]);
          } else {
            setSelectedAnswers(prev => prev.filter(val => val !== e.target.value));
          }
        }



    if (e.target.value.toLowerCase() === "other") {
      setIsOtherSelected(true);
    } else {
      setIsOtherSelected(false);
    }
  };

  
  return (
    
      <>
        <div className="mb-6" ref={mcqContainerRef}>
          <span className="block text-sm font-medium text-gray-700 mb-2">{question}{required && <span className="text-red-500">*</span>}</span>
          <div className="flex flex-col space-y-2">
            {options.map((option, index) => (
              <label className="inline-flex items-center">
                <input type={multi ? "checkbox" : "radio"} className="form-radio text-indigo-600" name={multi ? "" : name} value={option} 
                required={required && !isAnySelected}
                onChange={handleOptionChange}
                />
                <span className="ml-2">{option}</span>
              </label>
            ))}
            
            {/* Hidden inputs for MMCQ selected answers */}
            {multi && 
              <input type="hidden" name={name} value={selectedAnswers.join(multiAnswerSeperator)} />
            }
  
            {explenation && (
              <>
                <span className="mt-2 text-sm text-gray-600">{explenation}</span>
                <input
                  type="text"
                  className="mt-2 p-2 w-full border rounded-md"
                  placeholder="Please specify"
                  name={`${name}_extra`}
                  required={isOtherSelected && required}
                />
              </>
            )}
          </div>
        </div>
      </>
    );
}

export default MCQ