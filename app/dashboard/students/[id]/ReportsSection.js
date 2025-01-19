"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ReportsSection({ studentId, registrations }) {
    const { data: session } = useSession();
    const [reportContent, setReportContent] = useState("");
    const [reportType, setReportType] = useState("");
    const [studentYear, setStudentYear] = useState("");
    const [term, setTerm] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [visibleToParent, setVisibleToParent] = useState(true);
    const [reports, setReports] = useState(
        registrations.flatMap((reg) => reg.reports || [])
    );

    async function handleSubmitReport(e) {
        e.preventDefault();

        const registrationId = registrations[0]?.id; // Use the first registration by default
        if (!registrationId) {
            alert("No valid registration found for this student.");
            return;
        }

        const response = await fetch("/api/reports", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                report: reportContent,
                type: reportType,
                year: studentYear,
                term: term,
                date: date,
                visibleToParent: visibleToParent,
                user_id: session.user.id,
                registration_id: registrationId,
            }),
        });

        if (response.ok) {
            const newReport = await response.json();
            setReports([newReport, ...reports]);
            setReportContent("");
            setReportType("");
            setStudentYear("");
            setTerm("");
            setDate(new Date().toISOString().split("T")[0]);
            setVisibleToParent(true);
        } else {
            alert("Failed to submit the report.");
        }
    }

    return (
        <div className="mt-8 bg-[#f4a261] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">REPORTS</h2>
            <form onSubmit={handleSubmitReport} className="mb-6 space-y-4">
                {/* Report Type */}
                <div>
                    <label className="block text-sm font-medium mb-1">Type *</label>
                    <select
                        className="w-full p-3 bg-white rounded-md border border-gray-300"
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="TEACHER">Teacher</option>
                        <option value="MENTOR">Mentor</option>
                    </select>
                </div>

                {/* Year */}
                <div>
                    <label className="block text-sm font-medium mb-1">Year *</label>
                    <input
                        type="text"
                        className="w-full p-3 bg-white rounded-md border border-gray-300"
                        placeholder="Enter Year (e.g., Year 7)"
                        value={studentYear}
                        onChange={(e) => setStudentYear(e.target.value)}
                        required
                    />
                </div>

                {/* Term */}
                <div>
                    <label className="block text-sm font-medium mb-1">Term *</label>
                    <input
                        type="number"
                        className="w-full p-3 bg-white rounded-md border border-gray-300"
                        placeholder="Enter Term Number"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        required
                    />
                </div>

                {/* Author */}
                <div>
                    <label className="block text-sm font-medium mb-1">Author</label>
                    <input
                        type="text"
                        className="w-full p-3 bg-white rounded-md border border-gray-300"
                        value={session?.user?.name || ""}
                        disabled
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <input
                        type="date"
                        className="w-full p-3 bg-white rounded-md border border-gray-300"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                {/* Visibility Checkbox */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        className="mr-2"
                        checked={visibleToParent}
                        onChange={(e) => setVisibleToParent(e.target.checked)}
                    />
                    <label className="text-sm font-medium">Visible to Parent</label>
                </div>

                {/* Report Content */}
                <div>
                    <label className="block text-sm font-medium mb-1">Report *</label>
                    <textarea
                        className="w-full p-3 bg-white rounded-md border border-gray-300"
                        placeholder="Write the report..."
                        value={reportContent}
                        onChange={(e) => setReportContent(e.target.value)}
                        rows={5}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-[#e76f51] text-white font-semibold rounded-md hover:bg-[#d9534f]"
                >
                    Submit Report
                </button>
            </form>

            {/* Existing Reports */}
            <div>
                {reports.map((report) => (
                    <div key={report.id} className="bg-white p-4 rounded-md mb-4 shadow">
                        <p className="text-sm text-gray-600">
                            <strong>{report.authour.name}</strong> -{" "}
                            {new Date(report.create_date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">Type: {report.type}</p>
                        <p className="text-sm text-gray-600">Year: {report.year}</p>
                        <p className="text-sm text-gray-600">Term: {report.term}</p>
                        <p className="mt-2">{report.report}</p>
                        <p className="mt-2 text-sm text-gray-600">
                            Visible to Parent: {report.visibleToParent ? "Yes" : "No"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
