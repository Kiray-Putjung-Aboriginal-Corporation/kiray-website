import Link from "next/link";

interface EventPaginationProps {
  currentPage: number;
  totalPages: number;
  search: string;
  year?: number;
}

function buildHref(page: number, search: string, year?: number) {
  const params = new URLSearchParams();
  if (search) params.set("q", search);
  if (year) params.set("year", String(year));
  if (page > 1) params.set("page", String(page));

  const query = params.toString();
  return (query ? "/events?" + query : "/events") + "#previous-events";
}

export function EventPagination({
  currentPage,
  totalPages,
  search,
  year,
}: EventPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({length: totalPages}, (_, index) => index + 1)
    .filter((page) =>
      page === 1 ||
      page === totalPages ||
      Math.abs(page - currentPage) <= 1,
    );

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Previous event pages">
      <Link
        href={buildHref(Math.max(1, currentPage - 1), search, year)}
        aria-disabled={currentPage === 1}
        className={"rounded-full border-2 border-primary-button px-4 py-2 text-sm font-bold text-primary-button transition hover:bg-primary-button hover:text-textLight " + (currentPage === 1 ? "pointer-events-none opacity-40" : "")}
      >
        Previous
      </Link>

      {pages.map((page, index) => {
        const previousPage = pages[index - 1];
        const showEllipsis = previousPage && page - previousPage > 1;

        return (
          <span key={page} className="contents">
            {showEllipsis && <span className="px-1 text-textMuted" aria-hidden="true">…</span>}
            <Link
              href={buildHref(page, search, year)}
              aria-current={page === currentPage ? "page" : undefined}
              className={"grid size-11 place-items-center rounded-full text-sm font-black transition " + (page === currentPage ? "bg-primary-button text-textLight" : "bg-surface text-primary-button hover:bg-surface-muted")}
            >
              {page}
            </Link>
          </span>
        );
      })}

      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1), search, year)}
        aria-disabled={currentPage === totalPages}
        className={"rounded-full border-2 border-primary-button px-4 py-2 text-sm font-bold text-primary-button transition hover:bg-primary-button hover:text-textLight " + (currentPage === totalPages ? "pointer-events-none opacity-40" : "")}
      >
        Next
      </Link>
    </nav>
  );
}
