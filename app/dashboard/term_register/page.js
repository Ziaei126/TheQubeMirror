'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { gradeCalculator, gradeCalcString } from '/lib/gradeCalculator';

export default function TermRegister() {
    const [registrations, setRegistrations] = useState([]);
    const [minAge, setMinAge] = useState(0);
    const [maxAge, setMaxAge] = useState(100);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(gradeCalculator(2024))

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/students', {
                  next: { tags: ['term_register'] },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                console.log("data: ", data)
                
                const studentsWithCourses = data.map(registration => ({
                    student: registration.student,
                    grade: gradeCalculator(registration.student.yearEnteredReception),  // Calculate the student's age
                    courses: {
                      islamic: registration.islamic,
                      skill: registration.skill,
                      language: registration.language,
                      sport: registration.sport,
                    }
                  }));

                  console.log("filtered: ", studentsWithCourses)

                setRegistrations(studentsWithCourses);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    

    // Filter students based on age range
    const filteredStudents = registrations.filter(({ grade }) => grade >= minAge && grade <= maxAge);

    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Register List</h1>

        {/* Age Filter Inputs */}
        <div className="mb-4 flex justify-center space-x-4">
          <div>
            <label htmlFor="minAge" className="mr-2">Min Age (Reception = 0)</label>
            <input 
              type="number" 
              name="minAge" 
              id="minAge" 
              value={minAge} 
              onChange={(e) => setMinAge(
                parseInt(e.target.value) || 0)} 
              className="border rounded px-2 py-1" 
            />
          </div>
          <div>
            <label htmlFor="maxAge" className="mr-2">Max Age:</label>
            <input 
              type="number" 
              name="maxAge" 
              id="maxAge" 
              value={maxAge} 
              onChange={(e) => setMaxAge(parseInt(e.target.value) || 9)} 
              className="border rounded px-2 py-1" 
            />
          </div>
        </div>

        <table className="min-w-full bg-white table-auto">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left">ID</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left">Name</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-center">Age</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-center">Islamic</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-center">Skill</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-center">Language</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-center">Sport</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(({ student, grade, courses }) => (
              <tr key={student.id}>
                <td className="py-2 px-4 border-b border-gray-200 text-left">
                  <Link href={`students/${student.id}`} className="text-blue-500 hover:underline">
                    {student.id}
                  </Link>
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-left">{student.name} {student.lastName}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">{gradeCalcString(grade)}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {courses.islamic?.course_name || 'N/A'}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {courses.skill?.course_name || 'N/A'}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {courses.language?.course_name || 'N/A'}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">
                  {courses.sport?.course_name || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
