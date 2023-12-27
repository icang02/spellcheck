import Pagination from "@/components/Pagination";
import TableKamus from "@/components/TableKamus";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Daftar Kamus",
};

const PAGE_SIZE = 100;
const fetchKamus = async ({ take = 5, skip = 0 }) => {
  "use server";

  try {
    const kamus = await prisma.kamus.findMany({
      take: take,
      skip: skip,
      orderBy: {
        kata: "asc",
      },
    });
    const totalKamus = await prisma.kamus.count();
    await prisma.$disconnect();

    revalidatePath("/kamus");
    return {
      data: kamus,
      metadata: {
        hasNextPage: skip + take < totalKamus,
        totalPages: Math.ceil(totalKamus / take),
        itemPerPage: PAGE_SIZE,
        totalData: totalKamus,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default async function Kamus(props) {
  const pageNumber = parseInt(props?.searchParams?.page || 1);

  const take = PAGE_SIZE;
  const skip = (pageNumber - 1) * take;

  const { data, metadata } = await fetchKamus({ take, skip });

  return (
    <div className="min-h-screen">
      <div className="py-28 container mx-auto max-w-xl">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <h1 className="mb-5 font-bold text-xl text-center">Daftar Kamus</h1>
            <TableKamus data={data} metadata={metadata} pageNumber={pageNumber} />

            <Pagination {...props.searchParams} {...metadata} />
          </div>
        </div>
      </div>
    </div>
  );
}
