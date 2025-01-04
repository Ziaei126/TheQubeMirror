// app/term-register/ContactModal.js
'use client';
import React from 'react';
import { useState } from 'react';

export default function ContactModal({ student, onClose }) {
  if (!student) return null;

  // We assume 'student.parent' is an object with { name, lastName, phone, email }.
  // If parent's data is stored differently, adapt accordingly.
  const parent = student.parent[0];
  

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Contact Details</h2>

        {/* Basic Student Info */}
        <div className="mb-4">
          <p>
            <strong>Student:</strong> {student.name} {student.lastName}
          </p>
          <p>
            <strong>ID:</strong> {student.id}
          </p>
        </div>

        {/* Parent Info */}
        {parent ? (
          <div className="border p-3 rounded-md">
            <p className="font-semibold mb-2">Parent Details</p>
            <p>
              <strong>Name:</strong> {parent.name} {parent.lastName}
            </p>
            <p>
              <strong>Phone:</strong>{' '}
              {parent.phone ? (
                  <a
                    href={`tel:${parent.phone}`}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {parent.phone}
                  </a>
                ) : (
                  'Not Provided'
                )}
            </p>
            <p>
              <strong>Email:</strong>{' '}
              {parent.email ? (
                  <a
                    href={`mailto:${parent.email}`}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {parent.email}
                  </a>
                ) : (
                  'Not Provided'
                )}
            </p>
          </div>
        ) : (
          <p className="text-gray-600">No parent info available.</p>
        )}
      </div>
    </div>
  );
}