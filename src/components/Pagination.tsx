type PageItem = number | 'start-gap' | 'end-gap'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function getVisiblePages(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const start = Math.max(2, Math.min(currentPage - 1, totalPages - 2))
  const end = Math.min(totalPages - 1, Math.max(currentPage + 1, 3))
  const pages: PageItem[] = [1]

  if (start > 2) pages.push('start-gap')
  for (let page = start; page <= end; page += 1) pages.push(page)
  if (end < totalPages - 1) pages.push('end-gap')
  pages.push(totalPages)

  return pages
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = getVisiblePages(currentPage, totalPages)
  const buttonStyle = 'inline-flex min-w-10 items-center justify-center rounded-full px-3 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7b263a]'

  return (
    <nav aria-label="Product pages" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      <button
        className={`${buttonStyle} text-[#5c554e] hover:bg-[#eee9e0] disabled:cursor-not-allowed disabled:opacity-40`}
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pages.map((page) => {
        if (page === 'start-gap' || page === 'end-gap') {
          return <span aria-hidden="true" className="px-1 text-[#746d65]" key={page}>…</span>
        }

        const isCurrent = page === currentPage
        return (
          <button
            aria-label={`Page ${page}`}
            aria-current={isCurrent ? 'page' : undefined}
            className={`${buttonStyle} ${isCurrent ? 'bg-[#7b263a] text-white' : 'text-[#5c554e] hover:bg-[#eee9e0]'}`}
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      })}
      <button
        className={`${buttonStyle} text-[#5c554e] hover:bg-[#eee9e0] disabled:cursor-not-allowed disabled:opacity-40`}
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  )
}

export default Pagination
