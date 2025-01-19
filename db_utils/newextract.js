const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const prisma = new PrismaClient();

async function main() {
  // Fetch registrations with term_id = 11
  const registrations = await prisma.registration.findMany({
    where: {
      term_id: 11,
    },
    include: {
      parent: true,
      student: true,
      course_choice: {
        include: {
          islamic: true,
          skill: true,
          sport: true,
          language: true,
        },
      },
    },
  });

  const writer = csvWriter();
  writer.pipe(fs.createWriteStream('registrations_term_11.csv'));

  registrations.forEach((registration) => {
    const {
      id,
      parent,
      student,
      course_choice,
      term_id,
      conditions,
      payRef,
      paid,
      scholarship_essay,
      scholarship_amount,
    } = registration;

    writer.write({
      registration_id: id,
      parent_name: parent.name,
      parent_last_name: parent.lastName,
      parent_phone: parent.phone,
      parent_email: parent.email,
      student_id: student.id,
      student_name: student.name,
      student_last_name: student.lastName,
      student_DOB: student.DOB,
      student_year: gradeCalculator(student.yearEnteredReception),
      course_Islamic1: course_choice?.Islamic1,
      course_Islamic2: course_choice?.Islamic2,
      course_Islamic3: course_choice?.Islamic3,
      course_Skill1: course_choice?.Skill1,
      course_Skill2: course_choice?.Skill2,
      course_Skill3: course_choice?.Skill3,
      course_Sport1: course_choice?.Sport1,
      course_Sport2: course_choice?.Sport2,
      course_Sport3: course_choice?.Sport3,
      course_Language1: course_choice?.Language1,
      course_Language2: course_choice?.Language2,
      course_Language3: course_choice?.Language3,
      islamic_course_name: course_choice?.islamic?.course_name || 'N/A',
      skill_course_name: course_choice?.skill?.course_name || 'N/A',
      sport_course_name: course_choice?.sport?.course_name || 'N/A',
      language_course_name: course_choice?.language?.course_name || 'N/A',
      term_id: term_id,
      conditions: conditions,
      payRef: payRef,
      paid: paid,
      scholarship_essay: scholarship_essay,
      scholarship_amount: scholarship_amount,
    });
  });

  writer.end();
  console.log('CSV file for term_id 11 has been written successfully.');
}

function gradeCalculator(receptionYear) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-indexed (0 = January, 8 = September, etc.)

  // Determine the student's current school year
  let schoolYear = currentYear - receptionYear;

  // If before September (August included), subtract 1 year
  if (currentMonth < 8) {
    schoolYear -= 1;
  }

  return schoolYear;
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

