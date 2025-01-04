const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csvWriter = require('csv-write-stream'); // Install with `npm install csv-write-stream`

const prisma = new PrismaClient();

// Grade Calculator Function
function gradeCalculator(receptionYear) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0 = January, 8 = September, etc.

    // Determine the student's current school year
    let schoolYear = currentYear - receptionYear;

    // If before September (August included), subtract 1 year
    if (currentMonth < 8) {
        schoolYear -= 1;
    }

    return schoolYear;
}

async function main() {
    // Fetch all students with their parent and registration details
    const students = await prisma.student.findMany({
        include: {
            parent: true,
            registration: {
                select: {
                    term_id: true, // Fetch only term IDs for the registrations
                },
            },
        },
    });

    const writer = csvWriter();
    writer.pipe(fs.createWriteStream('students_with_grades_and_terms.csv'));

    students.forEach((student) => {
        // Check if the student is registered for term 10 or 11
        const term10Registered = student.registration.some((reg) => reg.term_id === 10);
        const term11Registered = student.registration.some((reg) => reg.term_id === 11);

        // Calculate the grade using the gradeCalculator
        const grade = gradeCalculator(student.yearEnteredReception);

        writer.write({
            student_id: student.id,
            student_name: student.name,
            student_last_name: student.lastName,
            student_DOB: student.DOB.toISOString(),
            parent_name: student.parent?.[0]?.name || 'N/A',
            parent_last_name: student.parent?.[0]?.lastName || 'N/A',
            parent_email: student.parent?.[0]?.email || 'N/A',
            parent_phone: student.parent?.[0]?.phone || 'N/A',
            grade: grade,
            registered_for_term_10: term10Registered ? 'Yes' : 'No',
            registered_for_term_11: term11Registered ? 'Yes' : 'No',
        });
    });

    writer.end();
    console.log('CSV file written successfully');
}

main()
    .catch((e) => {
        console.error(e);
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });