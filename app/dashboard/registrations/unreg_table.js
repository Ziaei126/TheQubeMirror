// app/term-register/components/UnregisteredTable.js
'use client';

import { set } from 'date-fns';
import ContactModal from './ContactModal';
import React, { useState, useEffect } from 'react';


export default function UnregisteredTable({ students, users = [] }) {
    const [items, setItems] = useState(students.sort((a, b) => {
      if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) {
        return -1;
      }
      if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) {
        return 1;
      }
      return 0;
    }));

  const [notes, setNotes] = useState({});
  const [assignees, setAssignees] = useState({});

  useEffect(() => {
    // Build an object mapping each student's ID to the already assigned user (if any)
    const initialAssignees = {};
    items.forEach((student) => {
      // If your data has `followUpAssignee_id`, use it:
      initialAssignees[student.id] = student.followUpAssignee_id || '';
    });
    setAssignees(initialAssignees);

    const initialNotes = {};
    items.forEach((student) => {
      initialNotes[student.id] = student.followUpNotes || '';
    }
    );
    setNotes(initialNotes);
  }, [items]);

  // For the contact modal
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Show the contact modal
  const openContactModal = (student) => {
    console.log(student);
    setModalContent(student);
    setShowModal(true);
  };

  const closeContactModal = () => {
    setModalContent(null);
    setShowModal(false);
  };

  const handleNoteChange = (id, note) => {
    setNotes((prev) => ({ ...prev, [id]: note }));
  };

  const handleAssigneeChange = (id, assigneeId) => {
    setAssignees((prev) => ({ ...prev, [id]: assigneeId }));
  };

  const handleSave = async (studentId) => {
    const content = notes[studentId];
    const assigneeId = assignees[studentId];

    try {
      const response = await fetch('/api/dashboard/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          followUp: true,
          followUpNotes: content,
          followUpAssignee_id: assigneeId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save follow-up details');
      }

      alert('Follow-up details saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Error saving follow-up details');
    }
  };

  const handleRemove = async (studentId) => {
    try {
      const response = await fetch('/api/dashboard/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          followUp: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove student from follow-up list');
      }

      alert('Student removed from follow-up list.');
        setItems((prev) => prev.filter((student) => student.id !== studentId));
      // Optionally update the UI or re-fetch
    } catch (error) {
      console.error(error);
      alert('Error removing student from follow-up list');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">#</th>
            <th className="py-2 px-4 border-b text-left">ID</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Assignee</th>
            <th className="py-2 px-4 border-b text-left">Notes</th>
            <th className="py-2 px-4 border-b text-left">Contact</th>
            <th className="py-2 px-4 border-b ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((student, index) => (
            <tr key={student.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{student.id}</td>
              <td className="py-2 px-4 border-b">
                {student.name} {student.lastName}
              </td>

              {/* Assignee Dropdown */}
              <td className="py-2 px-4 border-b">
                <select
                  value={assignees[student.id] || ''}
                  onChange={(e) => handleAssigneeChange(student.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="">Unassigned</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </td>

              {/* Notes Textarea */}
              <td className="py-2 px-4 border-b">
                <textarea
                  className="border rounded w-full px-2 py-1"
                  placeholder="Add or remove notes here..."
                  value={notes[student.id] || ''}
                  onChange={(e) => handleNoteChange(student.id, e.target.value)}
                />
              </td>

              {/* Contact Button */}
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => openContactModal(student)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Contact
                </button>
              </td>

              {/* Save & Remove Buttons */}
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleSave(student.id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => handleRemove(student.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Contact Modal (conditionally rendered) */}
      {showModal && (
        <ContactModal
          student={modalContent}
          onClose={closeContactModal}
        />
      )}
    </div>
  );
}