import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must not exceed 50 characters'),
  
    lastName: Yup.string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name must not exceed 50 characters'),
  
    DOB: Yup.date()
      .required('Date of birth is required')
      .max(new Date(), 'Date of birth cannot be in the future'),
  
    gender: Yup.string()
      .required('Gender is required')
      .oneOf(['male', 'female', 'other'], 'Invalid gender'),
  
    yearEnteredReception: Yup.mixed()
      .required('School year is required'),
      
      internalPhotoAllowed: Yup.boolean()
    .required('Required'),
  externalPhotoAllowed: Yup.boolean()
    .required('Required'),
  medicalNotes: Yup.string()
    .max(500, 'Medical notes must not exceed 500 characters'),
  });



  function ChildDetailsForm({sucsessfulSubmit}) {
    const [child, setChild] = useState(null)
    const [childSelected, setChildSelected] = useState(false)
    const [newChild, setNewChild] = useState(false)
    const [children, setChildren] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [initials, setInitials] = useState(null);

    const handleChildSelect = (child) => {
        if (child) {
            // Existing child selected, set initial values with available child data
            setInitials({
                name: child.name || "",
                lastName: child.lastName || "",
                DOB: child.DOB ? formatDOB(child.DOB) : "", // Format DOB if available
                gender: child.gender || "",
                yearEnteredReception: child.yearEnteredReception ? currentSchoolYear(child.yearEnteredReception) : "",
                internalPhotoAllowed: child.internalPhotoAllowed || false, // Default to false if not provided
                externalPhotoAllowed: child.externalPhotoAllowed || false, // Default to false if not provided
                medicalNotes: child.medicalNotes || "",
            });
            setChild(child);
            setChildSelected(true);
            setNewChild(false); // Set to false as it's an existing child
        } else {
            // New child option selected, reset initial values
            setInitials({
                name: "",
                lastName: "",
                DOB: "",
                gender: "",
                yearEnteredReception: "",
                internalPhotoAllowed: false,
                externalPhotoAllowed: false,
                medicalNotes: "",
            });
            setChildSelected(true);
            setNewChild(true);
        }
    }

    const currentSchoolYear = (yearOfEntry) => {
        // Assuming yearOfEntry is a string representing the year, e.g., "2020"
    const yearOfEntryInt = parseInt(yearOfEntry);

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Calculate the difference in years
    const yearsSinceEntry = currentYear - yearOfEntryInt;

    // Check if the student is in reception
    
        // Otherwise, return the current school year as a string
        return yearsSinceEntry;
    
    }

    const calculateYearOfEntry = (currentSchoolYear) => {
        // Get the current year
        const currentYear = new Date().getFullYear();
    
        let yearOfEntryInt = currentYear - currentSchoolYear;
    
        return yearOfEntryInt;
    }

    const formatDOB = (dob) => {
        // Assuming dob is a Date object or a string in a recognizable date format
        const date = new Date(dob);
        
        // Format the date as YYYY-MM-DD
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // JavaScript months are 0-indexed
        const day = date.getDate().toString().padStart(2, '0');
      
        return `${year}-${month}-${day}`;
      }

      const formatDateForPrisma = (dob) => {
        if (!dob) {
            return ""; // Return an empty string or some default value if dob is falsy
          }
        
          const date = new Date(dob);
          if (isNaN(date.getTime())) {
            return ""; // Return an empty string or handle invalid date
          }
        
          return date.toISOString();
      }

    

    useEffect(() => {
        async function fetchChildren() {
          setLoading(true);
          try {
            const response = await fetch('api/Registration/child/findChildren',
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                }
              }
            );
            if (!response.ok) {
              console.log(response)
              throw new Error(`Network response was not ok`);
            }
            const data = await response.json();
            console.log("data: ", data)

            setChildren(data);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        }
    
        fetchChildren();
      }, []);

      if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log( "children: ", children.length);
  

    return (<>

        
       
        <div className='flex flex-wrap items-center align-middle  space-x-4 m-5'>
        <h3 className="text-md font-semibold mr-4 align-middle mx-auto items-end">Choose a child: </h3>
        {
            (children.length == 0 || !children) ? (<></>) : ( 
              
            children.map(child => (
                <button key={child.id}
    onClick={() => handleChildSelect(child)}
    className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" >{child.name}</button>
            ))
            
   
            )

        }
        <button 
        key={-1}
        onClick={() => handleChildSelect(false)}
        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">new child</button>
        </div>

        { childSelected &&
             
            <Formik
    initialValues={initials}
    validationSchema={validationSchema}
    onSubmit={(values) => {
        const formatedValues = {
            ...values,
            DOB: formatDateForPrisma(values.DOB),
            yearEnteredReception: calculateYearOfEntry(values.yearEnteredReception)
          };


        if (newChild) {
          
            fetch(`/api/Registration/child/newchild`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formatedValues),
            })
              .catch(error => {
                console.log('Error submitting form: ', error)
              })
              .then(response => response.json())
              .then( reg => {
                sucsessfulSubmit({id: reg.reg_id, yearGroup: currentSchoolYear(reg.yearEnteredReception)})
              })
          
        }
            else {
            let changes={ };
            // Compare each field in the form
            Object.keys(initials).forEach(key => {
            if (initials[key] !== formatedValues[key]) {
      changes[key] = formatedValues[key];
            }
            });

    // Now 'changes' contains only the fields that have been modified
    console.log(changes);

    
      fetch(`/api/Registration/child/updatechild`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:child.id,changes: changes}),
      })
        .catch(error => {
          console.log('Error submitting form: ', error)
        })
        .then(response => response.json())
        .then( reg => {
          sucsessfulSubmit({id: reg.reg_id, yearGroup: currentSchoolYear(reg.yearEnteredReception)})
        }
            
          )
     }

          }}
  >
    <Form className="space-y-4 max-w-3xl mx-auto">
      <div className="text-lg font-semibold mb-6">Step 2: Child's Details</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-5 rounded-lg bg-white">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
          <Field name="name" type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <ErrorMessage name="name" component="div" className="text-red-600" />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name *</label>
          <Field name="lastName" type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <ErrorMessage name="lastName" component="div" className="text-red-600" />
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="DOB" className="block text-sm font-medium text-gray-700">Date of Birth *</label>
          <Field name="DOB" type="date"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <ErrorMessage name="DOB" component="div" className="text-red-600" />
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender *</label>
          <Field name="gender" as="select"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            
          </Field>
          <ErrorMessage name="gender" component="div" className="text-red-600" />
        </div>

        {/* School Year */}
        <div>
          <label htmlFor="schoolYear" className="block text-sm font-medium text-gray-700">School Year *</label>
          <Field name="yearEnteredReception" as="select"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select School Year</option>
            <option value={0}>Reception</option>
            {[...Array(9)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i+1}</option>
            ))}
          </Field>
          <ErrorMessage name="yearEnteredReception" component="div" className="text-red-600" />
        </div>
        {/* Internal Photo Allowed */}
    <div>
      <label htmlFor="internalPhotoAllowed" className="block text-sm font-medium text-gray-700">
        Internal Photo Allowed
      </label>
      <Field name="internalPhotoAllowed" type="checkbox" />
      <ErrorMessage name="internalPhotoAllowed" component="div" className="text-red-600" />
    </div>

    {/* External Photo Allowed */}
    <div>
      <label htmlFor="externalPhotoAllowed" className="block text-sm font-medium text-gray-700">
        External Photo Allowed
      </label>
      <Field name="externalPhotoAllowed" type="checkbox" />
      <ErrorMessage name="externalPhotoAllowed" component="div" className="text-red-600" />
    </div>

    {/* Medical Notes */}
    <div>
      <label htmlFor="medicalNotes" className="block text-sm font-medium text-gray-700">
        Medical Notes
      </label>
      <Field name="medicalNotes" as="textarea"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <ErrorMessage name="medicalNotes" component="div" className="text-red-600" />
    </div>

      </div>

      
      <div className="flex justify-end mt-6">
        <button type="submit" className="px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          confirm
        </button>
      </div>
    </Form>
  </Formik>
        }

        

        
    </>)

  }


  export default ChildDetailsForm;