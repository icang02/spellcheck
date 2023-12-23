"use client";

import axios from "axios";
import { useState } from "react";
import mammoth from "mammoth";
// import DataTable from "datatables.net-dt";

export default function Form() {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;

        try {
          setLoading(true);

          const result = await mammoth.extractRawText({ arrayBuffer });

          const data = await axios.post("http://localhost:3000/api/cek", {
            input: result.value,
          });

          setKataTypo(data.data.kataTypo);
          setKataRek(data.data.kataRek);
          setTimeTaken(data.data.timeTaken);

          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [kataTypo, setKataTypo] = useState([]);
  const [kataRek, setKataRek] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const data = await axios.post("http://localhost:3000/api/cek", {
        input: input,
      });

      setKataTypo(data.data.kataTypo);
      setKataRek(data.data.kataRek);
      setTimeTaken(data.data.timeTaken);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <>
      <input type="file" className="mb-5" onChange={handleFileChange} accept=".docx" />
      <form className="w-full mx-auto" onSubmit={handleSubmit}>
        <label htmlFor="input" className="block mb-2 text-sm font-medium text-gray-900">
          Enter text
        </label>
        <textarea onChange={(e) => setInput(e.target.value)} value={input} id="input" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-400 focus:outline-blue-300" placeholder="Write some word to spell check..." required />

        <div className="mt-3 flex items-center space-x-3">
          <button type="submit" className={`${loading ? "hover:bg-blue-600 opacity-50 cursor-not-allowed" : "hover:bg-blue-700"} text-white bg-blue-600 outline-none font-medium rounded-lg text-sm w-20 h-9 text-center inline-flex items-center transition-all`}>
            {loading ? (
              <span className="block mx-auto">
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            ) : (
              <span className="block mx-auto">Submit</span>
            )}
          </button>

          {timeTaken != 0 && (
            <div className="font-bold">
              <small>Time taken : {timeTaken} milliseconds</small>
            </div>
          )}
        </div>
      </form>

      <div className="mt-5">
        <h6>Kata typo :</h6>

        {kataTypo.length == 0 ? (
          <ul className="ml-6 list-disc">
            <li>-</li>
          </ul>
        ) : (
          <ul className="ml-6 list-disc">
            {kataTypo.map((item, i) => (
              <li key={i} className="mb-2">
                <span className="text-red-600">{item}</span> : <span className="text-green-600"></span>
                {kataRek[i].length != 0 ? (
                  <select name="cars" id="cars" key={i} className="border border-gray-700 outline-none text-sm">
                    {kataRek[i].map((item, i) => (
                      <option value={item.kata}>{item.kata}</option>
                    ))}
                  </select>
                ) : (
                  <span className="text-xs text-gray-950">Tidak ditemukan.</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
