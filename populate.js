const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csv = require('csv-parser');

const prisma = new PrismaClient();

async function main() {
    const courses = [];

    fs.createReadStream('Courses_new.csv')
        .pipe(csv())
        .on('data', (row) => {
            // Transform the data as needed. For instance, convert strings "TRUE"/"FALSE" to actual booleans
            if (row.is_new === "TRUE") row.is_new = true;
            if (row.is_new === "FALSE") row.is_new = false;
            if (row.is_closed === "TRUE") row.is_closed = true;
            if (row.is_closed === "FALSE") row.is_closed = false;

            // Convert the row data to the desired format
            const courseData = {};
            for (let [key, value] of Object.entries(row)) {
                courseData[key] = value;
            }

            courses.push(courseData);
        })
        .on('end', async () => {
            console.log('CSV file successfully processed.');

            for (let courseData of courses) {
                console.log(courseData)
                try {
                    await prisma.course.create({
                        data: courseData
                    });
                } catch (error) {
                    console.error('Error inserting course:', courseData.name, error);
                }
            }

            console.log('Data insertion complete.');
            await prisma.$disconnect();
        });
}

main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
