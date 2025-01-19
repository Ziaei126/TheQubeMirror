import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import ReportsSection from "./ReportsSection";

const prisma = new PrismaClient();

async function getStudentData(id) {
    const student = await prisma.student.findUnique({
        where: { id: id },
        include: {
            parent: true,
            registration: {
                include: {
                    course_choice: true,
                    reports: { // Include reports from related registrations
                        include: {
                            authour: true, // Include author details in reports
                        },
                        orderBy: {
                            create_date: "desc",
                        },
                    },
                },
            },
        },
    });
    return student;
}

function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export default async function StudentProfile({ params }) {
    const student = await getStudentData(params.id);

    if (!student) return <p>Student not found</p>;

    return (
        <div className="min-h-screen bg-[#f5deb3] p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                {student.name} {student.lastName}'s Profile
            </h1>

            {/* Student Information Section */}
            <div className="flex flex-col md:flex-row gap-6 bg-[#2a9d8f] p-8 rounded-lg shadow-lg">
                <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden">
                        <Image
                            src={student.pic || "/path/to/default-photo.jpg"}
                            alt="Student Photo"
                            width={128}
                            height={128}
                        />
                    </div>
                </div>
                <div className="flex-grow text-gray-100">
                    <h2 className="text-2xl font-semibold mb-4">STUDENT</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">ID *</label>
                            <p className="bg-gray-100 p-2 rounded-md text-black text-md">
                                {student.id}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Gender *</label>
                            <p className="bg-gray-100 p-2 rounded-md text-black text-md">
                                {student.gender}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                First Name *
                            </label>
                            <p className="bg-gray-100 p-2 rounded-md text-black text-md">
                                {student.name}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Surname *
                            </label>
                            <p className="bg-gray-100 p-2 rounded-md text-black text-md">
                                {student.lastName}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Date of Birth
                            </label>
                            <p className="bg-gray-100 p-2 rounded-md text-black text-md">
                                {new Date(student.DOB).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Age</label>
                            <p className="bg-gray-100 p-2 rounded-md text-black text-md">
                                {calculateAge(student.DOB)}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Year Entered Reception
                            </label>
                            <p className="bg-gray-100 p-2 rounded-md text-black text-md">
                                {student.yearEnteredReception}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Internal Photo Allowed?
                            </label>
                            <input
                                type="checkbox"
                                disabled
                                checked={student.internalPhotoAllowed}
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                External Photo Allowed?
                            </label>
                            <input
                                type="checkbox"
                                disabled
                                checked={student.externalPhotoAllowed}
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">
                                Medical Notes
                            </label>
                            <p className="bg-gray-100 p-2 rounded-md text-black text-md">
                                {student.medicalNotes || "None"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reports Section */}
            <ReportsSection
                studentId={student.id}
                registrations={student.registration}
            />
        </div>
    );
}
