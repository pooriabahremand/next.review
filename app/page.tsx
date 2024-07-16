// Import necessary functions and components
import { getReviews } from "../lib/reviews"; // Function to fetch reviews from the API
import Link from "next/link"; // Link component from Next.js for navigation
import Heading from "../components/heading"; // Custom Heading component
import Image from "next/image"; // Image component from Next.js for optimized images

// Define an async function component for the HomePage
export default async function HomePage() {
  // Fetch reviews data, limiting to the first page with 3 reviews per page
  const { result } = await getReviews(1, 3);

  // Return the JSX structure to render the HomePage
  return (
    <>
      <Heading>Indie Gamer</Heading>

      <p className="pb-3">Only the best indie games, reviewed for you.</p>

      <ul className="flex flex-col gap-3">
        {result.map((review, index) => {
          return (
            <li
              key={review.slug} // Unique key for each review item
              className="bg-white border rounded shadow w-80 hover:shadow-xl sm:w-full"
            >
              <Link
                href={`reviews/${review.slug}`}
                className="flex flex-col sm:flex-row"
              >
                <Image
                  src={review.image}
                  alt="" // Alt text for accessibility
                  width="320"
                  height="180"
                  className="rounded-t sm:rounded-l sm:rounded-r-none"
                  priority={index === 0} // Prioritize loading the first image
                />

                <div className="px-2 py-1 text-center sm:text-left">
                  <h2 className="font-orbitron font-semibold">
                    {review.title} {/* Review title */}
                  </h2>
                  <p className="hidden pt-2 sm:block">{review.subtitle} </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
