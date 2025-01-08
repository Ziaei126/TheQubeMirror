import { name } from '@node_modules/dayjs/locale/en-gb';
import prisma from '/lib/prisma';
import sgMail from '@sendgrid/mail';
import { revalidatePath } from 'next/cache';
import { select } from 'underscore';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function register(parent_email, student_id) {
  const term = 11; // parseInt(process.env.TERM_ID);

  // Fetch student details from the database
  const student = await prisma.student.findUnique({
    where: { id: student_id },
    select: {
      name: true,
      lastName: true,
      DOB: true,
      yearEnteredReception: true,
    }
  });

  if (!student) {
    console.error('Student not found!');
    return null;
  }

  // Save the registration to the database
  const application = await prisma.registration.create({
    data: {
      parent_email: parent_email,
      student_id: student_id,
      term_id: term,
    },
  });

  if (!application) {
    console.error('Application not created!');
    return application;
  }

  // Revalidate paths
  revalidatePath('/dashboard/term_register');
  revalidatePath('/dashboard/registrations');

  // Send email to parent
  const msg = {
    to: parent_email,
    from: process.env.EMAIL_FROM, // Your verified sender email
    subject: `Registration Confirmation for ${student.name} ${student.lastName}`,
    html: `
      <h1>Dear Parent,</h1>
      <p>Thank you for registering your child, <strong>${student.name} ${student.lastName}</strong>, for the upcoming term at <strong>The Qube</strong>.</p>
      
      <h2>Key Information:</h2>
      <ul>
        <li><strong>Term Dates:</strong> 12 January to 23 March 2025</li>
        <li><strong>Class Times:</strong> Sundays, 9:45am - 3pm (no class on 16 February for half-term)</li>
        <li><strong>Location:</strong> Al-Sadiq School, 126 Chevening Road, London, NW6 6TP</li>
        <li><strong>Fees:</strong> £305 per child for 10 sessions per term</li>
        <li><strong>Discounts:</strong> Available for existing parents and families registering more than one child</li>
      </ul>
  
      <h2>General Information:</h2>
      <ul>
        <li>The Qube classes are available for students from Reception to Year 9</li>
        <li>Sessions are conducted by professional coaches, teachers, and trainers</li>
        <li>Registrations are processed on a first-come, first-served basis</li>
        <li>A separate registration is required for each child</li>
        <li>Classes require a minimum of 8 students to run</li>
      </ul>
  
      <h2>Next Steps:</h2>
      <p>To complete the registration process, please ensure payment is made. Visit the link below at any time to complete pending registrations:</p>
      <p>
        <a href="https://wearetheqube.com/register" target="_blank" style="color: blue;">Complete Pending Registrations</a>
      </p>
  
      <p>If you have any questions or concerns, feel free to reach out. We look forward to having your child as part of <strong>The Qube</strong>.</p>
      
      <p>Warm regards,</p>
      <p>The Qube Team</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to parent: ${parent_email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }

  return application;
}

