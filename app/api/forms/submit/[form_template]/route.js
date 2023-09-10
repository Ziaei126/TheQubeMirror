
import { NextResponse } from "next/server";
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function POST(request, { params }) {
  const form_template = params.form_template;
  const formTemplate = require(`lib/forms/${form_template}.json`);

  // Load the submitted data
  const data = await request.json();
  

  // Convert JSON to SQL schema
const columns = Object.keys(data);

// First, flatten the form_template structure to create a map of question id to its properties
const questionMap = {};
formTemplate.sections.forEach(section => {
    section.questions.forEach(question => {
        questionMap[question.id] = question;
    });
});

// Now, format the values for PostgreSQL using the flattened questionMap
const values = Object.entries(data).map(([key, value]) => {
    const questionTemplate = questionMap[key];  // Retrieve the question details from the flattened map

    if (questionTemplate && questionTemplate.type === 'MMCQ') {
        // If the question type is MMCQ (multi-choice), split the value and return as an array
        return value.split(":;:");
    }

    // Otherwise, return the value as-is
    return value;
});

  const placeholders = columns.map((_, index) => `$${index + 1}`).join(", ");

  const queryText = `INSERT INTO ${form_template} (${columns.join(
    ", "
  )}) VALUES (${placeholders})`;

  try {
    const result = await pool.query(queryText, values);
    console.log(result)
    
    return NextResponse.json({status:200})
    
  } catch (error) {
    
    console.log(error)
    return NextResponse.json({ error: error },{status:500});
  }
}
