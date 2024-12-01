const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csv = require('csv-parser');

const prisma = new PrismaClient();

async function main() {
    const reports = [];

    fs.createReadStream('reports_final.csv')
        .pipe(csv())
        .on('data', (row) => {

            let text = JSON.stringify(row)

            text = "{" + text.slice(text.indexOf(",")+1)
            console.log(text)

            row = JSON.parse(text)

            //console.log("initial row: ", row);

            try {
                // Regular expression to capture two messages within braces
                const regex = /{([\s\S]*?)}\s*[\r\n]*\s*{([\s\S]*?)}/;
                const match = row.report.match(regex);

                if (match) {
                    const message_to_student = match[1].trim(); // First group (student message)
                    const message_to_parent = match[2].trim();   // Second group (parent message)

                    const new_row = {
                        reg_id: parseInt(row.reg_ID),
                        message_to_student,
                        message_to_parent,
                    };

                    //console.log("Processed row: ", new_row);
                    reports.push(new_row);
                } else {
                    console.warn("Report format is invalid for row:", row);
                }
            } catch (error) {
                console.error("Error processing row:", row, error);
            }
        })
        .on('end', async () => {
            console.log('CSV file successfully processed.');
            
            // Insert data into Prisma
            for (let reportData of reports) {
                try {
                    await prisma.EndOfTermReport.create({
                        data: reportData,
                    });
                } catch (error) {
                    console.error('Error inserting report:', reportData, error);
                }
            }

            console.log('Data insertion complete.');
            await prisma.$disconnect();
        });
}

main()
    .catch((e) => {
        console.error('Main function error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });