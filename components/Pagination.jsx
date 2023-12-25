import Link from "next/link";

export default function Pagination(props) {
  const { page = 1, abjad = "a", totalPages, hasNextPage } = props;

  const currentPage = Math.min(Math.max(parseInt(page), 1), totalPages);

  const getPagesToShow = () => {
    // let startPage = currentPage - 2;
    // let endPage = currentPage + 2;

    // if (currentPage <= 3) {
    //   startPage = 1;
    //   endPage = 5;
    // } else if (currentPage >= totalPages - 2) {
    //   startPage = totalPages - 4;
    //   endPage = totalPages;
    // }

    // return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    const pagesToShow = Array.from({ length: totalPages }, (_, index) => index + 1);

    return pagesToShow;
  };

  let pages = getPagesToShow();

  return (
    <div className="flex items-center flex-wrap justify-center space-x-3 text-black mt-5">
      <Link href={`/kamus?abjad=${props.abjad ?? abjad}&page=${currentPage - 1}`} className={`rounded-md border border-gray-400 px-3 py-1.5 text-xs font-medium hover:bg-gray-50 ${currentPage === 1 ? "pointer-events-none bg-gray-100" : ""}`}>
        Previous
      </Link>

      <nav aria-label="Pagination" className="relative z-0 inline-flex flex-wrap -space-x-px rounded-md">
        {pages.map((p, i) => (
          <Link disabled href={`/kamus?abjad=${props.abjad ?? abjad}&page=${p}`} key={p} className={`relative inline-flex items-center border border-gray-400 px-3 py-1.5 text-xs font-medium hover:bg-gray-50 ${p === currentPage ? "pointer-events-none bg-gray-100" : ""} ${i === 0 ? "rounded-l-md" : ""} ${i === pages.length - 1 ? "rounded-r-md" : ""}`}>
            {p}
          </Link>
        ))}
      </nav>

      <Link href={`/kamus?abjad=${props.abjad ?? abjad}&page=${currentPage + 1}`} className={`rounded-md border border-gray-400 px-3 py-1.5 text-xs font-medium hover:bg-gray-50 ${!hasNextPage ? "pointer-events-none bg-gray-100" : ""}`}>
        Next
      </Link>
    </div>
  );
}
