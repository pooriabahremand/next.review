import Link from "next/link";
import { ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function PaginationBar({
  href,
  pageNumber,
  pageCount,
}): ReactNode {
  console.log(pageNumber, pageCount);

  return (
    <div className="flex gap-2 pb-3">
      {/* ********** PREVIEWS LINK ********** */}
      {pageNumber === 1 ? (
        <span
          className="border flex gap-1 items-center  rounded text-slate-500 text-sm
            hover:bg-orange-100 hover:text-slate-700"
        >
          <ChevronLeftIcon className="h-5 w-5" />
          <span className="sr-only">Previous Page</span>
        </span>
      ) : (
        <Link
          href={`${href}?page=${pageNumber > 1 ? pageNumber - 1 : pageNumber}`}
          className="border flex gap-1 items-center  rounded text-slate-500 text-sm
            hover:bg-orange-100 hover:text-slate-700"
        >
          <ChevronLeftIcon className="h-5 w-5" />
          <span className="sr-only">Previous Page</span>
        </Link>
      )}
      {/* ********** PAGINATION TEXT ********** */}
      <span>
        {" "}
        page {pageNumber} of {pageCount}{" "}
      </span>
      {/* ********** NEXT LINK ********** */}
      {pageNumber === pageCount ? (
        <span
          className="border flex gap-1 items-center  rounded text-slate-500 text-sm
              hover:bg-orange-100 hover:text-slate-700"
        >
          <ChevronRightIcon className="h-5 w-5" />
          <span className="sr-only">Next Page</span>
        </span>
      ) : (
        <Link
          href={`/reviews?page=${pageNumber + 1}`}
          className="border flex gap-1 items-center  rounded text-slate-500 text-sm
              hover:bg-orange-100 hover:text-slate-700"
        >
          <ChevronRightIcon className="h-5 w-5" />
          <span className="sr-only">Next Page</span>
        </Link>
      )}
    </div>
  );
}
