import prisma from "@/lib/prisma";

export const metadata = {
  title: "Daftar Kamus",
};

export default async function Kamus() {
  const kamus = await prisma.kamus.findMany({
    orderBy: [
      {
        kata: "asc",
      },
    ],
  });
  await prisma.$disconnect();

  return (
    <div className="min-h-screen">
      <div className="my-28 container mx-auto max-w-xl px-3">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <h1 className="mb-5 font-bold text-xl text-center">Daftar Kamus</h1>

            <div className="relative overflow-x-auto mt-6 max-w-xs mx-auto">
              <small className="mb-3 block">
                Total kata : <b>{kamus.length} kata</b>
              </small>
              <table className="text-center border w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="border border-gray-400 px-3 py-3">
                      No.
                    </th>
                    <th scope="col" className="border border-gray-400 px-0 py-3">
                      Kata
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {kamus.map((item, i) => (
                    <tr className="bg-white border-b" key={i}>
                      <th scope="row" className="border border-gray-400 font-medium text-gray-800 whitespace-nowrap">
                        {i + 1}.
                      </th>
                      <td className="px-0 py-4 border border-gray-400 text-gray-800">{item.kata}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
