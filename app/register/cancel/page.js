export default function Cancel() {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center p-6 bg-yellow-200 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4">Payment Canceled - Details Received</h1>
        <p className="text-lg mb-6">
          We have received your details, but the registration is not complete as the payment was canceled.
        </p>
        <p className="text-sm mb-6">
          If you want to complete the registration, you can either go to{' '}
          <a href="/register" className="underline text-blue-600 hover:text-blue-800">  registration page again</a>  and select pay pending regisrations. (This options will only work if you had signed in for registration) 
          {' '}Or reach out to us at{' '}
          <a href="mailto:admin@wearetheqube.com" className="underline text-blue-600 hover:text-blue-800">
            admin@wearetheqube.com
          </a> 
          {' '}to make the payment and complete your registration.
        </p>

        <a href="/" className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800">
          Go back to home
        </a>
      </div>
    </div>
  );
}