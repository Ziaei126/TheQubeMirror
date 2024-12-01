import { options } from "@app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from '/lib/prisma';
import Link from "next/link";

const termId = parseInt(process.env.TERM_ID); // Current term ID

export default async function Parent() {
  // Get user details from session
  const session = await getServerSession(options);
  const { user } = session || {};

  if (!user) {
    return <div className="text-center text-red-500 mt-10">Unauthorized access. Please log in.</div>;
  }

  // Query students whose parent is the logged-in user
  const students = await prisma.student.findMany({
    where: {
      parent: {
        some: {
            email: user.email, // Match parent's email
          }, // Match parent by email
      },
    },
    include: {
      registration: {
        where: {
          term_id: termId,
          paid: true,
        },
      },
    },
  });

  if (!students || students.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No reports available for your children this term.
      </div>
    );
  }

  // Render the parent dashboard
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user.name} {user.lastName}
      </h1>
      <h2 className="text-xl mb-6">Your Children's Reports:</h2>

      <ul className="space-y-4">
        {students.map((student) => (
          <li key={student.id} className="p-4 border rounded-lg bg-gray-50 shadow-md">
            <h3 className="text-lg font-semibold">{student.name} {student.lastName}</h3>
            {student.registration.length > 0 ? (
              <>
                <p className="text-gray-600">Reports:</p>
                <ul className="list-disc pl-5">
                  {student.registration.map((registration) => (
                    <li key={registration.id}>
                      <Link
                        href={`/reports/${student.id}/${termId}`}
                        className="text-blue-600 hover:underline"
                      >
                        View Report for {student.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-gray-500">No reports available for this term.</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}