import { damerauLevenshteinDistance } from "@/lib/damerauLevenshteinDistance";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import wordExists from "word-exists";

export async function POST(request) {
  const startTime = performance.now();
  const { input } = await request.json();

  const inputUser = input
    .trim() // remove whitespace starts & ends string
    .toLowerCase() // to lowercase string
    .split(/\s+/) // to make array by separate whitepace ++
    .map((item) => item.replace(/[^a-zA-Z-]/g, "")) // remove simbol & number but except (-)
    .filter((item) => item !== "") // after make array remove item by value string ""
    .filter((item) => item.length != 1);

  const indexDaftar = inputUser.lastIndexOf("daftar"); // find index word 'daftar' from last string
  const indexPustaka = inputUser.lastIndexOf("pustaka"); // find index word 'pustaka' from last string

  // kalo berurutan kata daftar & pustaka hapus seluruh item array setelahnya
  let inputArray = [];
  if (indexDaftar + 1 === indexPustaka) {
    inputArray = inputUser.slice(0, indexDaftar);
  }

  const kamus = (
    await prisma.kamus.findMany({
      select: {
        kata: true,
      },
    })
  ).map((item) => item.kata);

  const kataTypo = [];
  const kataRek = [];

  let sumDist1 = 0;
  const maxDistance = 2;
  const kamusSet = new Set(kamus);

  for (const item of inputArray) {
    if (!kamusSet.has(item) && !wordExists(item)) {
      let dataObjek = [];
      for (const kms of kamus) {
        const distance = damerauLevenshteinDistance(kms, item);

        if (distance > maxDistance) {
          continue; // Skip jika jarak sudah lebih dari yang diinginkan
        }

        let newData = { kata: kms, distance: distance };
        dataObjek.push(newData);
      }

      kataTypo.push(item);

      sumDist1 = dataObjek.filter((item) => item.distance <= 1).length;

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

  // console.log(kataRek);

  const endTime = performance.now();
  const elapsedTime = (endTime - startTime).toFixed();

  return NextResponse.json({ kataTypo: kataTypo, kataRek: kataRek, timeTaken: elapsedTime });
}
