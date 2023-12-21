import { damerauLevenshteinDistance } from "@/lib/damerauLevenshteinDistance";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import wordExists from "word-exists";

export async function POST(request) {
  const startTime = performance.now();
  const { input } = await request.json();

  const kataArray = input
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]|[\d]/g, "")
    .split(/\s+/);

  const kamus = (
    await prisma.kamus.findMany({
      orderBy: { kata: "asc" },
    })
  ).map((item) => item.kata);

  const kataTypo = [];
  const kataRek = [];

  for (const item of kataArray) {
    if (!kamus.includes(item)) {
      if (wordExists(item)) {
        // console.log(item);
      } else {
        const minDistance = kamus.reduce((acc, value) => {
          // console.log(wordExists(item));

          const distance = damerauLevenshteinDistance(value, item);
          // Hanya masukkan elemen dengan nilai di bawah 2
          if (distance < 5) {
            acc[value] = distance;
          }
          return acc;
        }, {});

        const sortedDistance = Object.fromEntries(Object.entries(minDistance).sort((a, b) => a[1] - b[1]));

        // Ambil elemen pertama dari sortedDistance jika ada
        const closestMatch = Object.keys(sortedDistance)[0];

        // Jika ada closestMatch, simpan nilai
        if (closestMatch) {
          kataRek.push(closestMatch);
          kataTypo.push(item);
        } else {
          // Jika tidak ada nilai yang memenuhi kriteria, lanjutkan ke loop berikutnya
          continue;
        }
      }
    }
  }

  const endTime = performance.now();
  const elapsedTime = (endTime - startTime).toFixed();

  return NextResponse.json({ kataTypo, kataRek, timeTaken: elapsedTime });
}
