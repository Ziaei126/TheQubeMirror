const PrismaClient = require("@prisma/client").PrismaClient;

const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ["query"],
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

prisma.$use(async (params, next) => {
  if (params.model === 'Student') {
    if (params.action === 'create' || params.action === 'upsert') {
      const isUpsert = params.action === 'upsert';
      const dataToUse = isUpsert ? params.args.create : params.args.data;
      const { name, lastName } = dataToUse;

      if (name && lastName) {
        const firstPart = name.slice(0, 2).toUpperCase();
        const lastPart = lastName.slice(0, 2).toUpperCase();
        let baseId = `${firstPart}${lastPart}`;

        // Try to find an available ID by incrementing the suffix
        let customId = baseId;
        let counter = 1;
        let studentExists = await prisma.student.findUnique({
          where: {
            id: customId
          },
          select: {
            id: true,
          },
        });

        // Keep incrementing the ID until an available one is found
        while (studentExists) {
          customId = `${baseId}${counter}`;
          studentExists = await prisma.student.findUnique({
            where: {
              id: customId
            },
            select: {
              id: true,
            },
          });
          counter++;
        }

        // Set the customId either for the create or upsert operation
        if (isUpsert) {
          params.args.create.id = customId;
        } else {
          params.args.data.id = customId;
        }
      }
    }
  }

  return next(params);
});

export default prisma;