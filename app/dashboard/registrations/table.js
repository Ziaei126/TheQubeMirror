'use client'

import React, { useState } from 'react';
import { gradeCalculator, gradeCalcString } from '/lib/gradeCalculator';
import Modal from './modal'; // Import the new modal component

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
  {isModalOpen && ( <Modal modalContent={modalContent} closeModal={closeModal} /> )}
</div>
      </div>
    );
}
