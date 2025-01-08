
  export default function VerifyRequestPage() {
    return (
      <div className="flex justify-center items-center px-4">
        <div className="max-w-md w-full text-center bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Check Your Email 📧</h1>
          <p className="text-gray-600 mb-4">
            A sign-in link has been sent to your email address. It may take a minute or two to arrive.
            Please check your inbox and click the link to complete the sign-in process.
          </p>
          <p className="text-gray-600 mb-4">
            If you don’t see the email in your inbox, check your <strong>spam</strong> or <strong>junk</strong> folder—it might have been filtered there by mistake.
          </p>
          <p className="text-gray-600 mb-4">
            Once you have verified your email, you can use your email and password for all future sign-ins. No need to verify again!
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Still not seeing the email? Try sending the sign-in request again or reach out to us for help.
          </p>
          <div className="flex flex-col gap-4">
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition"
            >
              Contact Us
            </a>
            
          </div>
        </div>
      </div>
    );
  }