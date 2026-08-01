import Link from "next/link";

type CarsPaginationProps = {
    page: number,
    totalPages:  number
    link: string
}

export default function CarsPagination({page, totalPages, link}: CarsPaginationProps) {

  console.log(page, typeof page);

  const pages = Array.from({length: totalPages}, (_, i) => i + 1)

  return (
    <nav className="flex justify-center py-10">
        {page>1 && (
            <Link href={`${link}?page=${page - 1}`} className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0">&laquo;</Link>
        )}

        {pages.map(currentPage => (
            <Link href={`${link}?page=${currentPage}`} key={currentPage}
                className={`${page===currentPage ? 'font-black bg-amber-400' : 'bg-white'}  px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
            >{currentPage}</Link>
        ))}

        {page < totalPages && (
            <Link href={`${link}?page=${page + 1}`} className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0">&raquo;</Link>
        )}
    </nav>
  )
}
