import NavigasiAbjad from "@/components/NavigasiAbjad";
import Pagination from "@/components/Pagination";
import TableKamus from "@/components/TableKamus";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const metadata = {
  title: "Daftar Kamus",
};

const PAGE_SIZE = 50;
const fetchKamus = async ({ take = 5, skip = 0, abjad = "a" }) => {
  "use server";

  try {
    const kamus = await prisma.kamus.findMany({
      take: take,
      skip: skip,
      orderBy: {
        kata: "asc",
      },
      where: {
        huruf: {
          equals: abjad,
        },
      },
    });
    const totalKamus = await prisma.kamus.count({
      where: {
        huruf: {
          equals: abjad,
        },
      },
    });
    const totalSeluruhKamus = await prisma.kamus.count();
    await prisma.$disconnect();

    revalidatePath("/kamus");
    return {
      data: kamus,
      metadata: {
        hasNextPage: skip + take < totalKamus,
        totalPages: Math.ceil(totalKamus / take),
        itemPerPage: PAGE_SIZE,
        totalData: totalKamus,
        totalSeluruhKamus,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default async function Kamus(props) {
  const pageNumber = parseInt(props?.searchParams?.page || 1);
  if (isNaN(pageNumber) || pageNumber == "0") {
    return (
      <div className="pt-28 grid grid-cols-12 text-sm my-3 text-center text-gray-500">
        <div className="col-span-12">Data tidak ditemukan.</div>
      </div>
    );
  }

  const take = PAGE_SIZE;
  const skip = (pageNumber - 1) * take;

  const { data, metadata } = await fetchKamus({ take, skip, abjad: props.searchParams.abjad });

  return (
    <div className="min-h-screen">
      <div className="pt-28 pb-10 container mx-auto max-w-5xl px-3">
        <div className="grid grid-cols-12 px-2 md:px-16">
          <div className="col-span-12">
            <h1 className="font-bold text-xl text-center mb-7">Daftar Kamus</h1>
            <TableKamus data={data} metadata={metadata} pageNumber={pageNumber} />

            <Pagination {...props.searchParams} {...metadata} />
          </div>
        </div>

        <NavigasiAbjad {...props} />
      </div>
    </div>
  );
}
