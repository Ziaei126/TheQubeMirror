

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

    if (error) return <div> An error occured. Try signing out and signing back in agian.</div>;

    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 m-5 p-6 bg-white rounded-lg shadow-xl">
  <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">
  Register new child or Continue with registration:
  </h3>

  {/* New Registration Button */}
  <button
    key={-1}
    onClick={() => sucsessfulSubmit(null)}
    className="transition-all  bg-blue-500 hover:bg-blue-600  text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 flex-grow"
  >
    New Registration
  </button>

  {/* Registration Button for unpaid registrations */}
  {
    regs?.some(reg => !reg.paid) && (
      <button
        onClick={() => {
          const unpaidRegs = regs.filter(reg => !reg.paid);
          sucsessfulSubmit(unpaidRegs); // Submit only the unpaid registrations
        }}
        className="transition-all bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 flex-grow"
      >
        Pay Pending Registrations
      </button>
    )
  }
</div>
    )

}


export default ChooseRegistration;