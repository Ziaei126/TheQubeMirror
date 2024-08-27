export default function Success() {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 mt-10">Payment Successful!</h1>
          <p className="text-lg">Thank you for registering</p>
          <a href="/" className="mt-6 inline-block text-blue-600 hover:text-blue-800">
            Go back to home
          </a>
        </div>
      </div>
    );
  }