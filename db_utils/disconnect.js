const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const registrations = await prisma.registration.findMany({
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

    }

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });