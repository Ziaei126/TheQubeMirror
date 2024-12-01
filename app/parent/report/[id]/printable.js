'use client'
import Image from "next/image";

export default function Print({student, courses, report}) {
    console.log(student)
    console.log(courses)
    return (
      <>
      {/* Global Print-Specific Styles */}
      <style jsx global>{`
                @media print {
                    body {
                        background: white;
                        color: black;
                    }
                    .bg-gray-100 {
                        background: white !important;
                    }
                    .bg-white {
                        background: white !important;
                    }
                    .border {
                        border-color: black !important;
                    }
                    h1, h2, h3, p {
                        color: black !important;
                    }
                    .print:hidden {
                        display: none !important;
                    }
                }
            `}</style>
        <div className="max-w-5xl mx-auto p-8 bg-gray-100 ">
          {/* Print Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => window.print()}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 print:hidden"
            >
              Print Report
            </button>
          </div>
    
          {/* Header */}
          <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow mb-8">
            <div className="flex items-center gap-4">
              {student.pic && (
                <Image
                  src={student.pic}
                  alt={`${student.name} ${student.lastName}`}
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-gray-300"
                />
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {student.name} {student.lastName}
                </h1>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image width={60} height={60} className="text-gray-800 font-semibold text-xl" alt="Logo" src="/favicon.ico" />
              <div>THE QUBE</div>
            </div>
          </div>
    
          {/* Subjects & Choices */}
          <section className="mb-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Subjects & Choices</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {courses.skill && (
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-500 uppercase">Skills</p>
                  <p className="text-gray-800 font-medium">{courses.skill}</p>
                </div>
              )}
              {courses.islamic && (
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-500 uppercase">Islamic</p>
                  <p className="text-gray-800 font-medium">{courses.islamic}</p>
                </div>
              )}
              {courses.sport && (
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-500 uppercase">Sport</p>
                  <p className="text-gray-800 font-medium">{courses.sport}</p>
                </div>
              )}
              {courses.language && (
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-sm text-gray-500 uppercase">Language</p>
                  <p className="text-gray-800 font-medium">{courses.language}</p>
                </div>
              )}
            </div>
          </section>
    
          {/* End-of-Term Report */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Reports</h2>
            {report ? (
              <div>
                <h3 className="text-md font-bold text-gray-800 mb-2">End of Term</h3>
                <div className="mt-4">
                  <p className="text-gray-800">{report.message_to_student}</p>
                  <p className="text-gray-800">{report.message_to_parent}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No report available for this term.</p>
            )}
          </section>
        </div></>
      );
    }