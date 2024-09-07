export default function Cancel() {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center p-6 bg-yellow-200 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4">Payment Canceled - Child Registered</h1>
        <p className="text-lg mb-6">
          It seems like you canceled the payment. Your child has been registered, but the payment is not complete.
        </p>
        <p className="text-sm mb-6">
          If you need assistance or have any questions, feel free to get in touch by sending us an email at{' '}
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