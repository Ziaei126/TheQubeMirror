'use client'

import React, { useState } from 'react';
import { gradeCalculator, gradeCalcString } from '/lib/gradeCalculator';

export default function Table({ registrations }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (student) => {
    setModalContent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  const [students, setStudents] = useState(registrations.sort((a, b) => {
  if (a.student.name.toLowerCase() < b.student.name.toLowerCase()) {
    return -1;
  }
  if (a.student.name.toLowerCase() > b.student.name.toLowerCase()) {
    return 1;
  }
  return 0;
}));
  const [selectedCourseGlobal, setSelectedCourse] = useState('all');
  const [minAgeGlobal, setMinAge] = useState(0);
  const [maxAgeGlobal, setMaxAge] = useState(9);

  const allCourses = [
    ...new Set([
      ...registrations.map(({ courses }) => courses.islamic).filter(Boolean),
      ...registrations.map(({ courses }) => courses.skill).filter(Boolean),
      ...registrations.map(({ courses }) => courses.language).filter(Boolean),
      ...registrations.map(({ courses }) => courses.sport).filter(Boolean),
    ]),
  ];

  const handleAgeChange = (selectedValue) => {
    let minAge = 0;
    let maxAge = 9;

    switch (selectedValue) {
      case 'all':
        minAge = 0;
        maxAge = 9;
        break;
      case "Reception":
        minAge = 0;
        maxAge = 0;
        break;
      case "1-3":
        minAge = 1;
        maxAge = 3;
        break;
      case "4-6":
        minAge = 4;
        maxAge = 6;
        break;
      case "1-6":
        minAge = 1;
        maxAge = 6;
        break;
      case "7+":
        minAge = 7;
        maxAge = 9;
        break;
      default:
        minAge = parseInt(selectedValue);
        maxAge = parseInt(selectedValue);
        break;
    }
    setMinAge(minAge)
    setMaxAge(maxAge)
    let selectedCourse = selectedCourseGlobal
    setStudents(
      registrations.filter(({ grade, courses }) => {
        const ageMatch = grade >= minAge && grade <= maxAge;
        const courseMatch = selectedCourse === 'all' ||
          courses.islamic === selectedCourse ||
          courses.skill === selectedCourse ||
          courses.language === selectedCourse ||
          courses.sport === selectedCourse;

        return ageMatch && courseMatch;
      }).sort((a, b) => {
  if (a.student.name.toLowerCase() < b.student.name.toLowerCase()) {
    return -1;
  }
  if (a.student.name.toLowerCase() > b.student.name.toLowerCase()) {
    return 1;
  }
  return 0;
})
    );
  };

  const handleCourseChange = (selectedCourse) => {
      let minAge = minAgeGlobal;
      let maxAge = maxAgeGlobal;
      setSelectedCourse(selectedCourse);
    setStudents(
      registrations.filter(({ grade, courses }) => {
        const ageMatch = grade >= minAge && grade <= maxAge;
        const courseMatch = selectedCourse === 'all' ||
          courses.islamic === selectedCourse ||
          courses.skill === selectedCourse ||
          courses.language === selectedCourse ||
          courses.sport === selectedCourse;

        return ageMatch && courseMatch;
      }).sort((a, b) => {
  if (a.student.name.toLowerCase() < b.student.name.toLowerCase()) {
    return -1;
  }
  if (a.student.name.toLowerCase() > b.student.name.toLowerCase()) {
    return 1;
  }
  return 0;
})
    );
  }


  return (
    <div className="">
      <div className="mb-4 flex justify-center md:space-x-4 flex-col md:flex-row space-y-2 md:space-y-0">
        <div>
          <label htmlFor="ageRange" className="mr-2">Select Age Range:</label>
          <select
            name="ageRange"
            id="ageRange"
            onChange={(e) => handleAgeChange(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="all">All</option>
            <option value="0">Reception</option>
            <option value="1-3">Year 1-3</option>
            <option value="4-6">Year 4-6</option>
            <option value="1-6">Year 1-6</option>
            <option value="7+">Year 7+</option>
          </select>
        </div>
        <div>
          <label htmlFor="course" className="mr-2">Select Course:</label>
          <select
            id="course"
            onChange={(e) => handleCourseChange(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="all">All</option>
            {allCourses.map((course, i) => (
              <option key={i} value={course}>{course}</option>
            ))}
          </select>
        </div>
      </div>

        <div className="overflow-x-auto pt-4">
  <table className="min-w-full bg-white table-auto">
    <thead>
      <tr>
        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left">#</th> {/* Replaced ID with index */}
        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left">Reg ID</th>
        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left">Picture</th>
        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left">ID</th>
        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left">Child</th>
        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left">Year</th>
        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left">Confirmed</th>
        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left">Islamic - 1</th>
        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left">Skill - 1</th>
        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left">Language - 1</th>
        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left">Sport - 1</th>
        
        
      </tr>
    </thead>
    <tbody>
      {students.map(({ student, grade, courses, parent, confirmed, reg_id }, index) => (
        <tr  key={index}
        className="cursor-pointer hover:bg-gray-100"
        onClick={() =>
          openModal({
            student, grade, courses, parent
          })
        }>
          {/* Displaying the index + 1 so it starts from 1 instead of 0 */}
          <td className="py-2 px-4 border-b border-gray-200 text-left">
            {index + 1}
          </td>
          <td className="py-2 px-4 border-b border-gray-200 text-left">
            {reg_id}
          </td>

          <td className="py-2 px-4 border-b border-gray-200 text-left">
        {student.pic ? (
          <img
            src={student.pic}
            alt={`${student.name} ${student.lastName}`}
            className="w-16 rounded-full border-2 border-gray-300 object-cover"
          />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </td> 
      <td className="py-2 px-4 border-b border-gray-200 text-left">
            {student.id}
          </td>
          <td className="py-2 px-4 border-b border-gray-200 text-left">
            {student.name} {student.lastName}
          </td>
          
          <td className="py-2 px-4 border-b border-gray-200 text-left">
            {gradeCalcString(grade)}
          </td>
          <td className="py-2 px-4 border-b border-gray-200 text-centre">
          {confirmed ? <span className="text-green-500 text-xl">✓</span> : <span className="text-red-500 text-xl">✘</span>}
          </td>
          <td className="py-2 px-4 border-b border-gray-200 text-left">
            {courses.Islamic1 || '-'}
          </td>
          <td className="py-2 px-4 border-b border-gray-200 text-left">
            {courses.Skill1 || '-'}
          </td>
          <td className="py-2 px-4 border-b border-gray-200 text-left">
            {courses.Language1 || '-'}
          </td>
          <td className="py-2 px-4 border-b border-gray-200 text-left">
            {courses.Sport1 || '-'}
          </td>
          
          
              
        </tr>
      ))}
    </tbody>
  </table>
  {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative flex flex-col max-h-screen overflow-y-auto">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-2 right-4 text-red-500 hover:text-red-700 text-4xl"
        aria-label="Close"
      >
        &times;
      </button>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center border-b border-gray-300 pb-4 mb-6">
        {/* Student Image */}
        {modalContent.student.pic ? (
          <img
            src={modalContent.student.pic}
            alt={`${modalContent.student.name} ${modalContent.student.lastName}`}
            className="w-32 rounded-full border border-gray-300 mr-0 md:mr-4 mb-4 md:mb-0"
          />
        ) : (
          <div className="w-32 bg-gray-200 rounded-full border border-gray-300 mr-0 md:mr-4 mb-4 md:mb-0"></div>
        )}

        {/* Student Name */}
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
                className={`${
                  modalContent.student.internalPhotoAllowed
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
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
                className={`${
                  modalContent.student.externalPhotoAllowed
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
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
)}
</div>
      </div>
    );
}
