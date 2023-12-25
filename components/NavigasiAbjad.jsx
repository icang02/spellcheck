import Link from "next/link";

export default function NavigasiAbjad(props) {
  const abjad = Array.from({ length: 26 }, (_, index) => String.fromCharCode(97 + index));

  return (
    <div className="mt-6">
      <div className="text-sm flex flex-wrap justify-center">
        {abjad.map((item, i) => (
          <div key={i}>
            {i == 0 && <span>|</span>}
            <Link href={`/kamus?abjad=${item}&page=1`} className={`hover:text-blue-600 font-medium px-1.5 ${props.searchParams.abjad == item && "text-blue-600"}`}>
              {item.toUpperCase()}
            </Link>
            <span>|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
