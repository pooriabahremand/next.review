import Link from "next/link";
import Heading from "../../components/heading";
import { getReviews } from "../../lib/reviews";
import Image from "next/image";
import PaginationBar from "../../components/paginationBar";
import SearchBox from "../../components/searchBox";

export const metadata = {
  title: "Reviews",
};

let pageNumber: number;
const PAGE_SIZE = 6;
export default async function ReviewsPage({ searchParams: { page } }) {
  if (Number(page) > 0) {
    pageNumber = Number(page);
  } else {
    pageNumber = 1;
  }
  const { result, meta } = await getReviews(pageNumber, PAGE_SIZE);
  return (
    <>
      <Heading>Reviews</Heading>
      <div className="flex justify-between pb-3">
        <PaginationBar
          href="/reviews"
          pageNumber={pageNumber}
          pageCount={meta.pageCount}
        />
        <SearchBox />
      </div>
      <ul className="flex flex-row flex-wrap gap-3">
        {result.map((review, index) => {
          return (
            <li
              key={review.slug}
              className="bg-white border rounded shadow w-80 hover:shadow-xl"
            >
              <Link href={`reviews/${review.slug}`}>
                <Image
                  src={review.image}
                  alt=""
                  width="320"
                  height="180"
                  className="rounded-t"
                  priority={index === 0}
                />
                <h2 className="py-1 text-center font-orbitron font-semibold">
                  {review.title}
                </h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
