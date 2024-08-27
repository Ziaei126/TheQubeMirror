export default function Cancel() {
    return (
      <div className="flex items-center justify-center ">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 mt-10">Payment Canceled</h1>
          <p className="text-lg p-4">It seems like you canceled the payment. Your child has been registered but the payment is not complete. Please contact us to complete your payment.</p>
          <a href="/" className="mt-6 inline-block text-blue-600 hover:text-blue-800">
            Go back to home
          </a>
        </div>
      </div>
    );
  }