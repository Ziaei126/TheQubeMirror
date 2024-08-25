const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csv = require('csv-parser');

const prisma = new PrismaClient();

async function main() {
    const courses = [];

    fs.createReadStream('courses.csv')
        .pipe(csv())
        .on('data', (row) => {

            let text = JSON.stringify(row)

            text = "{" + text.slice(text.indexOf(",")+1)
            console.log(text)

            row = JSON.parse(text)


            console.log("nothing: " , row.nothing) 
            row.minAge = parseInt(row.minAge);
            row.maxAge = parseInt(row.maxAge);
            row.is_new = row.is_new == 'true';
            row.is_closed = row.is_closed == 'true';
            row.catagory = row.catagory == "Skills" ? "Skill" : row.catagory

            delete row.Age;

            console.log("course data: ",row)

            courses.push(row);
        })
        .on('end', async () => {
            console.log('CSV file successfully processed.');

             
            
            for (let courseData of courses) {
                if (courseData.catagory == "Skill") {
                try {
                    await prisma.Course.create({
                        data: {...courseData}
                    });
                } catch (error) {
                    console.error('Error inserting course:', courseData.name, error);
                }}
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
