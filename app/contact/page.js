export default function ContactUsPage() {
    return (
      <div className=" flex items-center justify-center px-6">
        <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📞 Contact Us</h1>
          <p className="text-gray-600 mb-8 text-center">
            Have questions? Reach out to us through any of the methods below. We’re here to help!
          </p>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WhatsApp */}
            <div className="flex items-center bg-green-50 p-4 rounded-lg shadow-sm">
              <span className="text-3xl mr-4">💬</span>
              <div>
                <h2 className="text-lg font-medium text-gray-800">WhatsApp</h2>
                <a
                  href="https://wa.me/+447715477995"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 transition"
                >
                  +44 7715 477 995
                </a>
              </div>
            </div>
  
            {/* Instagram */}
            <div className="flex items-center bg-purple-50 p-4 rounded-lg shadow-sm">
              <span className="text-3xl mr-4">📸</span>
              <div>
                <h2 className="text-lg font-medium text-gray-800">Instagram</h2>
                <a 
                  href="https://www.instagram.com/wearetheqube"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-purple-600 transition"
                >
                  @wearetheqube
                </a>
              </div>
            </div>
  
            {/* Email */}
            <div className="flex items-center bg-blue-50 p-4 rounded-lg shadow-sm">
              <span className="text-3xl mr-4">📧</span>
              <div>
                <h2 className="text-lg font-medium text-gray-800">Email</h2>
                <a
                  href="mailto:admin@wearetheqube.com"
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  admin@wearetheqube.com
                </a>
              </div>
            </div>
  
            {/* Address */}
            <div className="flex items-center bg-yellow-50 p-4 rounded-lg shadow-sm md:col-span-2">
              <span className="text-3xl mr-4">📍</span>
              <div>
                <h2 className="text-lg font-medium text-gray-800">Address</h2>
                <p className="text-gray-600">
                  Alsadiq School, 134 Salusbury Rd, London NW6 6PF
                </p>
                <p className="text-sm text-gray-500">*We operate here only on Sundays during term.</p>
              </div>
            </div>
          </div>
  
          <div className="text-center mt-8">
            <h3 className="text-lg font-medium text-gray-800 mb-2">🕒 Operating Hours</h3>
            <p className="text-gray-600">Sundays during term: 9:30 AM – 3:00 PM</p>
          </div>
        </div>
      </div>
    );
  }