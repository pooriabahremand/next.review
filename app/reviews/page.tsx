import Link from "next/link";
import Image from "next/image";
import Heading from "../../components/heading";
import PaginationBar from "../../components/paginationBar";
import SearchBox from "../../components/searchBox";
import NotFound from "../not-found";
import readNumber from "../../lib/utilites";
import { getReviews } from "../../lib/reviews";
import { ReviewsPageProps } from "../../interface/interfaces";

export const metadata = {
  title: "Reviews",
};

const PAGE_SIZE = 6;
export default async function ReviewsPage({
  searchParams: { page },
}: ReviewsPageProps) {
  const pageNumber = readNumber(page);
  if (!pageNumber) {
    return NotFound();
  }
  try {
    const { result, meta } = await getReviews(pageNumber, PAGE_SIZE);
    console.log(pageNumber);
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
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return <NotFound />;
  }
}
