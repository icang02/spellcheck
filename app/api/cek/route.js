import { damerauLevenshteinDistance } from "@/lib/damerauLevenshteinDistance";
import prisma from "@/lib/prisma";
import { data } from "autoprefixer";
import { NextResponse } from "next/server";
import wordExists from "word-exists";

export async function POST(request) {
  const startTime = performance.now();
  const { input } = await request.json();

  const inputArray = input
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

  let sumDist1 = 0;
  // let sumDist2 = 0;

  for (const item of inputArray) {
    if (!kamus.includes(item)) {
      if (wordExists(item)) continue;

      let dataObjek = [];
      for (const kms of kamus) {
        const distance = damerauLevenshteinDistance(kms, item);

        let newData = { kata: kms, distance: distance };
        dataObjek.push(newData);
      }

      kataTypo.push(item);

      sumDist1 = dataObjek.filter((item) => item.distance <= 1).length;
      // sumDist2 = dataObjek.filter((item) => item.distance > 1 && item.distance <= 2).length;

      let dataX = [];
      if (sumDist1 >= 5) {
        dataX = dataObjek.filter((item) => item.distance <= 1).sort((a, b) => a.distance - b.distance);
        kataRek.push(dataX);
      } else {
        dataX = dataObjek.filter((item) => item.distance <= 2).sort((a, b) => a.distance - b.distance);

        let dataDistance1 = dataX.filter((item) => item.distance == 1);
        // Memfilter data dengan distance 1
        let dataDistance2 = dataX.filter((item) => item.distance == 2).slice(0, 3);

        kataRek.push(dataDistance1.concat(dataDistance2));
      }
    }
  }

  console.log(kataRek);

  const endTime = performance.now();
  const elapsedTime = (endTime - startTime).toFixed();

  return NextResponse.json({ kataTypo: kataTypo, kataRek: kataRek, timeTaken: elapsedTime });
}
