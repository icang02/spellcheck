const { PrismaClient } = require("@prisma/client");
const kamusData = require("../inputKamus.js");

const prisma = new PrismaClient();

async function run() {
  const rawQuery = `TRUNCATE TABLE kamus`;
  await prisma.$executeRawUnsafe(rawQuery);

  for (const item of kamusData) {
    try {
      const existingKamus = await prisma.kamus.findUnique({
        where: {
          kata: item,
        },
      });

      if (!existingKamus) {
        await prisma.kamus.create({
          data: {
            kata: item.toLowerCase(),
            huruf: item[0].toLowerCase(),
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  console.log("seeding successfully..");
}

run();
