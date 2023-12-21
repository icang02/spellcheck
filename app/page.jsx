import Form from "./Form";

export const metadata = {
  title: "Beranda",
};

export default async function Home() {
  return (
    <div className="min-h-screen">
      <div className="my-28 container mx-auto max-w-xl px-3">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <h1 className="mb-5 font-bold text-xl text-center">Koreksi Ejaan</h1>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}
