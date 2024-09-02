

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
    <div className='flex flex-wrap items-center align-middle  space-x-4 m-5'>

      <h3 className="text-md font-semibold mr-4 align-middle mx-auto items-end">Choose a Registration: </h3>
      {
        (regs?.length == 0 || !regs) ? (<></>) : (

          regs.map(reg => (
            <button key={reg.id}
              onClick={() => sucsessfulSubmit(reg)}
              className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" >{reg.studentName}</button>
          ))


        )

      }
      <button
        key={-1}
        onClick={() => sucsessfulSubmit(null)}
        className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">New Registration</button>
    </div>

    )

}


export default ChooseRegistration;