import Link from "next/link";
import Heading from "../components/heading";
import { getReviews } from "../lib/reviews";
import Image from "next/image";

export default async function HomePage() {
  const { result } = await getReviews(1, 3);

  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="pb-3">Only the best indie games, reviewed for you.</p>
      <ul className="flex flex-col gap-3">
        {result.map((review, index) => {
          return (
            <li
              key={review.slug}
              className="bg-white border rounded shadow w-80 hover:shadow-xl
        sm:w-full"
            >
              <Link
                href={`reviews/${review.slug}`}
                className="flex flex-col sm:flex-row"
              >
                <Image
                  src={review.image}
                  alt=""
                  width="320"
                  height="180"
                  className="rounded-t sm:rounded-l sm:rounded-r-none"
                  priority={index === 0}
                />
                <div className="px-2 py-1 text-center sm:text-left">
                  <h2 className="font-orbitron font-semibold">
                    {review.title}
                  </h2>
                  <p className="heddin pt-2 sm:block">{review.subtitle}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
