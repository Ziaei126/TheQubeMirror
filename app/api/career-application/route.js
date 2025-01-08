import { PrismaClient } from '@prisma/client';
import sgMail from '@sendgrid/mail';

const prisma = new PrismaClient();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    // Save to the database
    const savedApplication = await prisma.careerApplication.create({
      data: {
        weeklyAvailability: body.weekly_availability,
        sundayAvailability: body.sunday_availability,
        team: body.team,
        explain: body.explain,
        name: body.name,
        email: body.email,
        telephone: body.telephone,
        age: body.age,
        gender: body.gender,
        ethnicity: body.ethnicity,
      },
    });

    // Send notification email
    const msg = {
        to: process.env.NOTIFICATION_EMAIL, // Replace with your email address
        from: process.env.EMAIL_FROM, // Replace with your verified sender email
        subject: 'New Career Application Submitted',
        text: `
      A new career application has been submitted by ${body.name}.
      
      Details:
      - Weekly Availability: ${body.weekly_availability}
      - Sunday Availability: ${body.sunday_availability}
      - Team: ${body.team.join(", ")}
      - Additional Explanation: ${body.explain || "N/A"}
      - Name: ${body.name}
      - Email: ${body.email}
      - Telephone: ${body.telephone || "N/A"}
      - Age: ${body.age || "N/A"}
      - Gender: ${body.gender || "N/A"}
      - Ethnicity: ${body.ethnicity || "N/A"}
      
      Please review it in your database.`,
        html: `
      <strong>A new career application has been submitted by ${body.name}.</strong>
      <br><br>
      <h3>Details:</h3>
      <ul>
        <li><strong>Weekly Availability:</strong> ${body.weekly_availability}</li>
        <li><strong>Sunday Availability:</strong> ${body.sunday_availability}</li>
        <li><strong>Team:</strong> ${body.team.join(", ")}</li>
        <li><strong>Additional Explanation:</strong> ${body.explain || "N/A"}</li>
        <li><strong>Name:</strong> ${body.name}</li>
        <li><strong>Email:</strong> ${body.email}</li>
        <li><strong>Telephone:</strong> ${body.telephone || "N/A"}</li>
        <li><strong>Age:</strong> ${body.age || "N/A"}</li>
        <li><strong>Gender:</strong> ${body.gender || "N/A"}</li>
        <li><strong>Ethnicity:</strong> ${body.ethnicity || "N/A"}</li>
      </ul>
      <br>
      <p>Please review it in your database.</p>`,
      };

    await sgMail.send(msg);

    return new Response(JSON.stringify({ success: true, application: savedApplication }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving application or sending email:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}