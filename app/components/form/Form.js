"use client"

import React from 'react';
import MCQ from './MCQ';
import { useState } from 'react';

function Form({ form_template, styles, children }) {
    const data = require(`/lib/forms/${form_template}.json`);
    
    const [isLoading, setIsLoading] = useState(false)
    const [isDelivered, setIsDelivered] = useState(false)
    

    function safeAccess(obj, ...accessors) {
        return accessors.reduce((acc, curr) => (acc && acc[curr] ? acc[curr] : ''), obj);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        //start loading

        setIsLoading(true);

      
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        
        
    try {
        const response = await fetch(`/api/forms/submit/${form_template}`, {
            method: 'POST',
            /* headers: {
              'Content-Type': 'application/json',
            },*/
            body: JSON.stringify(data),
          })
          console.log(' response: ', response)
          if (!response.ok) {
            console.log('something is not ok')
            throw new Error
          }
          console.log(' response: ', response)
          setIsLoading(false);
          setIsDelivered(true);
          
    } catch (error) {
        console.log("There was a problem with sending the form" + error)
        setIsLoading(false);

    } 
        
      }
    
    
    return (
        <>
        {isDelivered ? 

        <>{children}</>
            
            :<form onSubmit={handleSubmit} className={safeAccess(styles, "form")}>
            {data.sections.map((section, sectionIndex) => (<>
            <div>
                <h2 className={`${safeAccess(styles, "section", "title", "all")} ${safeAccess(styles, "section", "title", String(sectionIndex+1))}`}>{section.name}</h2>
                <div key={sectionIndex} className={`${safeAccess(styles, "section", "full", "all")} ${safeAccess(styles, "section", "full", String(sectionIndex+1))}`}>
                    
                    
                    
                    {section.questions.map((question, questionIndex) => {
                        
                        
                        switch (question.type) {
                            case 'MCQ':
                                return (
                                    <MCQ
                                        key={question.id}
                                        question={question.question}
                                        options={question.options}
                                        name={question.id}
                                        explenation={question.explenation}
                                        required={question.required}
                                    />
                                );
                            case 'MMCQ':
                                // For now, we use the MCQ component for MMCQ as well, but with multi prop set to true.
                                // If distinct behavior is needed for MMCQ, a separate component or additional logic can be added.
                                return (
                                    <MCQ
                                        key={question.id}
                                        question={question.question}
                                        options={question.options}
                                        name={question.id}
                                        explenation={question.explenation}
                                        multi={true}
                                        required={question.required}
                                    />
                                );
                            case 'short text':
                            case 'long text':
                            case 'email':
                            case 'tel':
                                return (
                                    <div key={question.id}>
                                        <label className='flex flex-col'>
                                            <div>
                                            {question.question}
                                            {question.required && <span className='text-red-500'>*</span>}</div>
                                            <input
                                                type={question.type === 'long text' ? 'text' : question.type}
                                                className={question.type === 'long text' ? safeAccess(styles, "longText") : safeAccess(styles, "shortText")}
                                                name={question.id}
                                                required={question.required}
                                            />
                                        </label>
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}
                    
                </div></div></>
            ))}
            
            <button type="submit" className={styles.button}>
                {isLoading ? <div className="loader"><span></span><span></span><span></span></div> : 'Submit'}
            
            </button>
        </form>}
        </>
    );
}

export default Form;


