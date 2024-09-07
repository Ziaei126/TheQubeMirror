'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useState, useEffect } from 'react';


export default function ProgressBar({stepName, courseSelect}) {

  const [steps, setSteps] = useState([
    'Parent Details',
    'Child Details',
    'Payment'
  ])

  const [step, setStep] = useState(-1)

  useEffect(() => {
    function updateStep() {
      const index = steps.indexOf(stepName);
      if (index === -1) {
        return -1; // Return -1 if the name is not found
      }
      return index ; // Return the position (1-based index)
    }

    setStep(updateStep())
    console.log(step)
    
    
  }, [stepName]);

  useEffect(() => {
    if (courseSelect) {
      console.log('courseSelect is true, updating steps');
      setSteps([
        'Parent Details',
        'Child Details',
        'Class Selection',
        'Payment'
      ]);
    } else {
      console.log('courseSelect is false, reverting steps');
      setSteps([
        'Parent Details',
        'Child Details',
        'Payment'
      ]);
    }
  }, [courseSelect]);
  
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}