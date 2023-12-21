const kamus = require("../kamus/index");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function cekDuplikat(arr) {
  let set = new Set();
  let duplikat = [];

  for (let kata of arr) {
    if (set.has(kata)) {
      duplikat.push(kata);
    }
    set.add(kata);
  }

  if (duplikat.length > 0) {
    console.log("Kata duplikat:", duplikat);
  }

  return duplikat;
}

async function run() {
  const rawQuery = `TRUNCATE TABLE kamus`;
  await prisma.$executeRawUnsafe(rawQuery);

  // cek kata duplikat
  const kataDuplikat = cekDuplikat(kamus);
  if (kataDuplikat.length > 0) {
    return;
  }

  for (const item of kamus) {
    try {
      await prisma.kamus.create({
        data: {
          kata: item,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  console.log("seeding successfully..");
}

run();
