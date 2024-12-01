'use client'
import { useSearchParams } from 'next/navigation'

export default function Success() {
  const searchParams = useSearchParams()
 
  const scholarship = searchParams.get('scholarship')

  return (
    <div className="flex items-center justify-center ">
      <div className="text-center p-6 bg-yellow-200 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>

        {/* Conditional content based on scholarship */}
        {scholarship && (
          <div>
            <p className="text-lg mb-6">
              Thank you for your application! We will be reviewing your scholarship application and will let you know of the outcome in the coming days.
            </p>
          </div>
        )}
          <div>
            <p className="text-lg mb-6">
              Your registration is being processed. We aim to get in touch with all the parents who registered by the date provided to inform them about their choices and the setup of the classes. If you have applied for a scholarship, we will inform you of the final decision by this time, too.
            </p>
          </div>
        

        <p className="text-sm">
          In the meantime, if you have any questions, please feel free to get in touch by sending us an email at{' '}
          <a href="mailto:admin@wearetheqube.com" className="underline text-blue-600 hover:text-blue-800">
            admin@wearetheqube.com
          </a>.
        </p>

        <a href="/" className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800">
          Go back to home
        </a>
      </div>
    </div>
  );
}