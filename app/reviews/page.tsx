import Link from "next/link";
import Heading from "../../components/heading";
import { getReviews } from "../../lib/reviews";
import Image from "next/image";

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
      <div className="flex gap2 pb-3">
        <Link
          href={`/reviews?page=${pageNumber > 1 ? pageNumber - 1 : pageNumber}`}
        >
          &lt;
        </Link>
        <span>
          {" "}
          page {pageNumber} of {meta.pageCount}{" "}
        </span>
        <Link href={`/reviews?page=${pageNumber + 1}`}>&gt;</Link>
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
