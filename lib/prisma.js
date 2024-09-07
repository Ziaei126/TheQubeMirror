const PrismaClient = require("@prisma/client").PrismaClient;

const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ["query"],
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

prisma.$use(async (params, next) => {
  if (params.model === 'Student') {
    if (params.action === 'create' || params.action === 'upsert') {
      // Handle `create` action directly or `create` part of `upsert`
      const isUpsert = params.action === 'upsert';
      
      // For upsert, we modify only the `create` portion
      const dataToUse = isUpsert ? params.args.create : params.args.data;
      const { name, lastName } = dataToUse;

      if (name && lastName) {
        // Get first 2 letters of first and last name
        const firstPart = name.slice(0, 2).toUpperCase();
        const lastPart = lastName.slice(0, 2).toUpperCase();
        let baseId = `${firstPart}${lastPart}`;

        // Find if there are other students with the same baseId
        const studentsWithSameBaseId = await prisma.student.findMany({
          where: {
            id: {
              startsWith: baseId,
            },
          },
          select: {
            id: true,
          },
        });

        // Increment the number based on existing students
        const count = studentsWithSameBaseId.length + 1;

        // Create the custom ID
        const customId = `${baseId}${count}`;

        // Set the customId
        if (isUpsert) {
          params.args.create.id = customId; // Handle upsert `create` part
        } else {
          params.args.data.id = customId; // Handle regular create
        }
      }
    }
  }
  
  return next(params);
});

export default prisma;