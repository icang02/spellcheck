export default function TableKamus(props) {
  // const startIndex = (props.pageNumber - 1) * props.metadata.itemPerPage + 1;

  return (
    <div>
      <small className="mb-3 block">
        Total kata : <b>{props.metadata.totalSeluruhKamus} kata</b>
      </small>
      {/* <table className="text-center border w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
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
          {props.data.map((item, i) => (
            <tr className="bg-white border-b" key={i}>
              <th scope="row" className="border border-gray-400 font-medium text-gray-800 whitespace-nowrap">
                {startIndex + i}.
              </th>
              <td className="px-0 py-4 border border-gray-400 text-gray-800">{item.kata}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <hr className="h-px bg-gray-400 border-0" />
      {props.metadata.totalData != 0 ? (
        <div className="grid grid-cols-12 text-sm my-3">
          {props.data.map((item, i) => (
            <div className="col-span-6 md:col-span-3" key={i}>
              {item.kata}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-12 text-sm my-3 text-center text-gray-500">
          <div className="col-span-12">Data tidak ditemukan.</div>
        </div>
      )}
      <hr className="h-px bg-gray-300 border-0" />
    </div>
  );
}
