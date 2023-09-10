import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';
import {NextResponse} from 'next/server';

const {Pool} = require('pg');

const pool = new Pool({
    user: process.env.PGUSER ,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE ,
    password: process.env.PGPASSWORD ,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
      }
  });


export async function GET(request, {params}) {


        const form_template = params.form_template;

        console.log(form_template)

        // Load the JSON file
        const jsonData = JSON.parse(fs.readFileSync(path.join(process.cwd(), `/lib/forms/${form_template}.json`), 'utf8'));

        console.log(jsonData)

        // Convert JSON to SQL schema
        let columns = ['id SERIAL PRIMARY KEY'];  // Initialize with id column
        jsonData.sections.forEach(section => {
            section.questions.forEach(question => {
                let dataType = '';
                switch (question.type) {
                    case 'MMCQ':
                        dataType = "TEXT []"
                        break;
                    
                    case 'MCQ':
                    case 'short text':
                        dataType = 'TEXT';
                        break;
                    case 'email':
                        dataType = 'TEXT UNIQUE';  // Adding UNIQUE constraint
                        break;
                    case 'long text':
                        dataType = 'TEXT';
                        break;
                    case 'tel':
                        dataType = 'VARCHAR(15)';
                        break;
                    default:
                        dataType = 'TEXT';
                }
                if (question.required) {
                    dataType += ' NOT NULL';  // Adding NOT NULL constraint if required
                }
                if (question.explenation) {
                    dataType += `, "${question.id}_extra" TEXT`
                }
                columns.push(`"${question.id}" ${dataType}`);
            });
        });

        console.log(`CREATE TABLE IF NOT EXISTS ${form_template} (${`${columns}`});`)

        
        try {
            const client = await pool.connect();
            const result = await client.query(`CREATE TABLE IF NOT EXISTS ${form_template} (${`${columns}`});`);
            client.release();
            
            return NextResponse.json({error: result.error, result});
          } catch (err) {
            
            return NextResponse.json({error: result.error, result})
        
        };
    
};
