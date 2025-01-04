'use client';

import useSWR from 'swr';
import React, { useState, useEffect } from 'react';
import ContactModal from './ContactModal';

const fetcher = (url) => fetch(url).then((res) => res.json());

/**
 * A utility function to decide border color classes based on status.
 * @param {string} status - 'idle' | 'saving' | 'saved' | 'error'
 * @returns {string} Tailwind border color class
 */
function getBorderClass(status) {
  switch (status) {
    case 'saving':
      return 'border-blue-500 border-2 animate-pulse border-dashed';
    case 'saved':
      return 'border-green-500';
    case 'error':
      return 'border-red-500 border-3';
    default:
      // 'idle'
      return 'border-gray-300';
  }
}

export default function UnregisteredTable() {
// 1. Use SWR
const { data, error, mutate } = useSWR(
  '/api/dashboard/registrations/unregistered',
  fetcher,{
    // Re-fetch whenever the component mounts 
    revalidateOnMount: true,
    // or if you want it to refetch even more often:
    refreshInterval: 300000, // e.g., every 300s
  }
);

// 2. Initialize your states *unconditionally*
const [notes, setNotes] = useState({});
const [assignees, setAssignees] = useState({});
const [savingStatus, setSavingStatus] = useState({});
const [showModal, setShowModal] = useState(false);
const [modalContent, setModalContent] = useState(null);

// 3. We can do a guard for loading/error states
const isLoading = !data && !error;

// 4. Even if `data` is undefined, we still run the effect (it just won't do much).
useEffect(() => {
  if (!data) return;
  const { unregisteredStudents } = data;

  const initialNotes = {};
  const initialAssignees = {};
  const initialStatus = {};

  unregisteredStudents.forEach((student) => {
    initialNotes[student.id] = student.followUpNotes || '';
    initialAssignees[student.id] = student.followUpAssignee_id || '';
    initialStatus[student.id] = 'idle';
  });

  setNotes(initialNotes);
  setAssignees(initialAssignees);
  setSavingStatus(initialStatus);
}, [data]);

// 5. If you're waiting on data or have an error:
if (error) {
  return <div>Error loading students!</div>;
}
if (isLoading) {
  return <div>Loading...</div>;
}



// Now `data` is guaranteed to exist here
const { unregisteredStudents, users } = data;

  // ---- Contact Modal Handlers ----
  const openContactModal = (student) => {
    setModalContent(student);
    setShowModal(true);
  };
  const closeContactModal = () => {
    setModalContent(null);
    setShowModal(false);
  };

  // ---- Saving Logic ----

  // Generic function to update DB
  const updateFollowUp = async (studentId, newNotes, newAssigneeId) => {
    // Set status to 'saving'
    setSavingStatus((prev) => ({ ...prev, [studentId]: 'saving' }));

    try {
      const response = await fetch('/api/dashboard/registrations/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          followUp: true,
          followUpNotes: newNotes,
          followUpAssignee_id: newAssigneeId || null,
        }),
      });

      console.log('Response:', response);

      if (!response.ok) throw new Error('Failed to update follow-up details');

      // If success:
      setSavingStatus((prev) => ({ ...prev, [studentId]: 'saved' }));
      // Revert to 'idle' after 2 seconds
      setTimeout(() => {
        setSavingStatus((prev) => ({ ...prev, [studentId]: 'idle' }));
      }, 2000);
      mutate(); // Refresh data
    } catch (err) {
      console.error(err);
      setSavingStatus((prev) => ({ ...prev, [studentId]: 'error' }));
      // Optionally revert after some time
      setTimeout(() => {
        setSavingStatus((prev) => ({ ...prev, [studentId]: 'idle' }));
      }, 3000);
    }
  };

  // Called when user changes the <select> for Assignee
  const handleAssigneeChange = async (studentId, newAssigneeId) => {
    setAssignees((prev) => ({ ...prev, [studentId]: newAssigneeId }));
    const currentNotes = notes[studentId];
    // Auto-save immediately
    await updateFollowUp(studentId, currentNotes, newAssigneeId);
  };

  // Called when the user finishes editing notes (onBlur)
  const handleNoteBlur = async (studentId) => {
    const currentNotes = notes[studentId];
    const currentAssignee = assignees[studentId];
    await updateFollowUp(studentId, currentNotes, currentAssignee);
  };

  // Called every time user types in the text area
  const handleNoteChange = (studentId, newNote) => {
    setNotes((prev) => ({ ...prev, [studentId]: newNote }));
  };

  // Remove from follow-up
  const handleRemove = async (studentId) => {
    try {
      const response = await fetch('/api/dashboard/registrations/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          followUp: false, // Removing from follow-up
        }),
      });

      if (!response.ok) throw new Error('Failed to remove student from follow-up');

      alert('Student removed from follow-up list.');
      mutate(); // Refresh data
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
            {/* The remove "X" at the beginning */}
            <th className="py-2 px-4 border-b text-center"></th>
            <th className="py-2 px-4 border-b text-left">#</th>
            <th className="py-2 px-4 border-b text-left">ID</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Contact</th>
            <th className="py-2 px-4 border-b text-left">Assignee</th>
            <th className="py-2 px-4 border-b text-left">Notes</th>
            {/* New "Yearly" column for last-term yearly registration */}
            <th className="py-2 px-4 border-b text-left">Yearly</th>
            
          </tr>
        </thead>
        <tbody>
          {data.unregisteredStudents.map((student, index) => {
            const studentId = student.id;
            const currentNotes = notes[studentId] || '';
            const currentAssignee = assignees[studentId] || '';
            const status = savingStatus[studentId] || 'idle';

            // Suppose your server sets 'lastTermYearly = true/false'
            const yearlyDisplay = student.registration[0].paymentPlan == "year" ? 'Yes' : 'No';

            // Decide the border color based on 'status'
            const borderClass = getBorderClass(status);

            return (
              <tr key={studentId}>
                {/* X Remove button */}
                <td className="py-2 px-4 border-b text-center w-10">
                  <button
                    onClick={() => handleRemove(studentId)}
                    className="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center text-xl mx-auto"
                    title="Remove from Follow-Up"
                  >
                    &times;
                  </button>
                </td>

                <td className="py-2 px-4 border-b w-10">{index + 1}</td>
                <td className="w-20 py-2 px-4 border-b">{studentId}</td>
                <td className="w-32 py-2 px-4 border-b whitespace-normal break-auto">
                  {student.name} {student.lastName}
                </td>
                {/* Contact button */}
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => openContactModal(student)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Contact
                  </button>
                </td>

                {/* Assignee Dropdown, color-coded by status */}
                <td className={`py-2 px-4 border-b w-max-32`}>
                  <select
                    value={currentAssignee}
                    onChange={(e) => handleAssigneeChange(studentId, e.target.value)}
                    className={`border rounded px-2 py-1 ${borderClass}`}
                  >
                    <option value="">Unassigned</option>
                    {data.users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Notes Textarea, color-coded by status, auto-saves onBlur */}
                <td className="py-2 px-4 border-b">
                  <textarea
                    className={`w-64 h-16 px-2 py-1 resize-none rounded border ${borderClass}`}
                    placeholder="Add or remove notes..."
                    value={currentNotes}
                    onChange={(e) => handleNoteChange(studentId, e.target.value)}
                    onBlur={() => handleNoteBlur(studentId)}
                  />
                </td>

                {/* Yearly column: "Yes"/"No" */}
                <td className="py-2 px-4 border-b">{yearlyDisplay}</td>

                
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModal && (
        <ContactModal student={modalContent} onClose={closeContactModal} />
      )}
    </div>
  );
}