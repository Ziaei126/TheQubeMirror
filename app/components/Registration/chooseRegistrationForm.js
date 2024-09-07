

import React, { useEffect, useState } from 'react';

function ChooseRegistration({sucsessfulSubmit}) {
    
    const [regs, setRegs] = useState(null)
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        async function fetchRegs() {
          setLoading(true);
          try {
            const response = await fetch('api/Registration/registrations',
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

            setRegs(data);
            if (data.length == 0) {
                sucsessfulSubmit(null)
            }
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        }
    
        fetchRegs();
        
      }, []);

    if (loading) return <div>Loading...</div>;

    

    

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex flex-wrap items-center justify-center gap-4 m-5 p-6 bg-white rounded-lg shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900">
          Choose a Registration:
        </h3>
      
        {/* Registration Buttons */}
        {
          (regs?.length === 0 || !regs) ? null : (
            regs.map((reg) => (
              <button
                key={reg.id}
                onClick={() => sucsessfulSubmit(reg)}
                className="transition-all bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                {reg.studentName}
              </button>
            ))
          )
        }
      
        {/* New Registration Button */}
        <button
          key={-1}
          onClick={() => sucsessfulSubmit(null)}
          className="transition-all bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          New Registration
        </button>
      </div>

    )

}


export default ChooseRegistration;