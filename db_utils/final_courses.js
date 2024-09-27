const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csv = require('csv-parser');

const course_map = {
    'Arabic': 2,
    'Cooking Club': 30,
    'Drama & The Life of our Prophet(pbuh)': 22,
    'STEM and Monotheism - 2' : 24,
    'Robotics': 31,
    'Quran Recitation': 15,
    'Game Design': 46,
    'Art & Gratitude': 14,
    'Farsi': 25,
    'Football': 16,
    'Multi-Sports': 8,
    'Basketball': 23
}

const prisma = new PrismaClient();

async function main() {
    const final_choices = [];

    fs.createReadStream('fffinal_chioces.csv')
        .pipe(csv())
        .on('data', (row) => {

            let text = JSON.stringify(row)

            

            row = JSON.parse(text)
            let filtered_row = {}


            filtered_row.applicatiopn_id = parseInt(row.registration_id);
            filtered_row.islamic_id = course_map[row['islamic_course_name']]
            filtered_row.skill_id = course_map[row['skill_course_name']]
            filtered_row.language_id = course_map[row['language_course_name']]
            filtered_row.sport_id = course_map[row['sport_course_name']]

            
            console.log("course data: ",row)

            final_choices.push(filtered_row);
        })
        .on('end', async () => {
            console.log('CSV file successfully processed.');

             
            
            for (let row of final_choices) {
                console.log(row)
                
                
                if (row.islamic_id) {
                    try {
                        await prisma.CourseChoice.update({
                            where: {
                                applicatiopn_id: row.applicatiopn_id
                            },
                            data: {
                                islamic_id: row.islamic_id,
                                skill_id: row.skill_id,
                                language_id: row.language_id,
                                sport_id: row.sport_id
                            }
                        });
                    } catch (error) {
                        console.error('Error inserting course:', row.application_id, error);
                    }

                }
                
                
            }

            console.log('Data insertion complete.');
            await prisma.$disconnect();
        });
}

main()
    .catch(e => {
        console.log(e)
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
