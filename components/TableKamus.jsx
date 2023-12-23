export default function TableKamus(props) {
  const startIndex = (props.pageNumber - 1) * props.metadata.itemPerPage + 1;

  return (
    <div className="relative overflow-x-auto mt-6 max-w-xs mx-auto">
      <small className="mb-3 block">
        Total kata : <b>{props.metadata.totalData} kata</b>
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
          {props.data.map((item, i) => (
            <tr className="bg-white border-b" key={i}>
              <th scope="row" className="border border-gray-400 font-medium text-gray-800 whitespace-nowrap">
                {startIndex + i}.
              </th>
              <td className="px-0 py-4 border border-gray-400 text-gray-800">{item.kata}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
