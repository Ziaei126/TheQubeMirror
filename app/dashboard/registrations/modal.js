import React from 'react';

export default function Modal({ modalContent, closeModal }) {
  if (!modalContent) return null;

  return (
    // Outer backdrop
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeModal} // Clicking backdrop closes modal
    >
      {/* Inner modal box */}
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative flex flex-col max-h-[90vh] overflow-y-auto mt-10"
        onClick={(e) => e.stopPropagation()} // Prevent clicking inside from closing modal
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-4 text-red-500 hover:text-red-700 text-4xl"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center border-b border-gray-300 pb-4 mb-6">
          {modalContent.student.pic ? (
            <img
              src={modalContent.student.pic}
              alt={`${modalContent.student.name} ${modalContent.student.lastName}`}
              className="w-32 rounded-full border border-gray-300 mr-0 md:mr-4 mb-4 md:mb-0"
            />
          ) : (
            <div className="w-32 bg-gray-200 rounded-full border border-gray-300 mr-0 md:mr-4 mb-4 md:mb-0"></div>
          )}
          <h2 className="text-2xl font-semibold text-gray-800 text-center md:text-left">
            {modalContent.student.name} {modalContent.student.lastName}
          </h2>
        </div>

        {/* Information Section */}
        <div className="space-y-6">
          {/* ID and Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded-md p-3">
            <div>
              <p className="text-gray-600 font-semibold">ID:</p>
              <p className="text-gray-800">{modalContent.student.id}</p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">Year:</p>
              <p className="text-gray-800">{modalContent.grade}</p>
            </div>
          </div>

          {/* Courses */}
          <div className="border rounded-md p-3">
            <p className="text-gray-600 font-semibold mb-2">Courses:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-800">
                  <span className="font-semibold">Islamic:</span>{' '}
                  {modalContent.courses.islamic || '-'}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold">Skill:</span>{' '}
                  {modalContent.courses.skill || '-'}
                </p>
              </div>
              <div>
                <p className="text-gray-800">
                  <span className="font-semibold">Language:</span>{' '}
                  {modalContent.courses.language || '-'}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold">Sport:</span>{' '}
                  {modalContent.courses.sport || '-'}
                </p>
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-3 rounded-md">
            <div>
              <p className="text-gray-600 font-semibold">
                Internal Photo:{' '}
                <span
                  className={
                    modalContent.student.internalPhotoAllowed
                      ? 'text-green-600'
                      : 'text-red-600'
                  }
                >
                  {modalContent.student.internalPhotoAllowed
                    ? 'Allowed'
                    : 'Not Allowed'}
                </span>
              </p>
            </div>
            <div>
              <p className="text-gray-600 font-semibold">
                External Photo:{' '}
                <span
                  className={
                    modalContent.student.externalPhotoAllowed
                      ? 'text-green-600'
                      : 'text-red-600'
                  }
                >
                  {modalContent.student.externalPhotoAllowed
                    ? 'Allowed'
                    : 'Not Allowed'}
                </span>
              </p>
            </div>
          </div>

          {/* Medical Notes */}
          <div className="border p-3 rounded-md">
            <p className="text-gray-600 font-semibold">Medical Notes:</p>
            <p className="text-gray-800">
              {modalContent.student.medicalNotes || 'No medical notes provided.'}
            </p>
          </div>

          {/* Parent Details */}
          <div className="border rounded-md p-3">
            <p className="text-gray-600 font-semibold mb-2">Parent Details:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-800">
                  <span className="font-semibold">Name:</span>{' '}
                  {modalContent.parent.name || '-'}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold">Last Name:</span>{' '}
                  {modalContent.parent.lastName || '-'}
                </p>
              </div>
              <div>
                <p className="text-gray-800">
                  <span className="font-semibold">Phone:</span>{' '}
                  {modalContent.parent.phone ? (
                    <a
                      href={`tel:${modalContent.parent.phone}`}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {modalContent.parent.phone}
                    </a>
                  ) : (
                    'Not Provided'
                  )}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold">Email:</span>{' '}
                  {modalContent.parent.email ? (
                    <a
                      href={`mailto:${modalContent.parent.email}`}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {modalContent.parent.email}
                    </a>
                  ) : (
                    'Not Provided'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full Profile Link */}
        <div className="mt-8 border-t border-gray-300 pt-4 text-center">
          <a
            href={`/students/${modalContent.id}`}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            View Full Profile &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}