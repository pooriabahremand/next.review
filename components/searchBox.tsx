// --- SearchBox Component ---
// This component provides a search input with autocomplete functionality.
// It fetches reviews based on the user's search query and displays matching options.
// When the user selects an option, it navigates to the corresponding review page.

"use client"; // Indicates that this module should be treated as a client-side module

import { ReactNode, useEffect, useState } from "react";
import { useDebounce } from "use-debounce"; // Debounces the search query
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react"; // Components for the autocomplete dropdown
import { useRouter } from "next/navigation"; // Importing the router from Next.js

export default function SearchBox(): ReactNode {
  const [query, setQuery] = useState(""); // State for the search query
  const [reviews, setReviews] = useState([]); // State for the fetched reviews
  const [debouncedQuery] = useDebounce(query, 400); // Debounced query for smoother search

  useEffect(() => {
    if (debouncedQuery.length > 1) {
      // Fetch reviews when query length is greater than 1
      const controller = new AbortController(); // Create an abort controller
      (async () => {
        const url = `/api/search?query=${encodeURIComponent(debouncedQuery)}`;
        const response = await fetch(url, { signal: controller.signal }); // Fetch reviews based on the query
        const reviews = await response.json(); // Parse the response
        // console.log(reviews);
        setReviews(reviews); // Update the reviews state
      })();
      return () => controller.abort(); // Clean up the controller when component unmounts
    } else {
      setReviews([]); // Clear reviews when query is too short
    }
  }, [debouncedQuery]);

  const router = useRouter(); // Access the router

  const onChangeHandler = (review) => {
    if (!review) {
      return; // Do nothing if review is falsy
    } else {
      router.push(`/reviews/${review.slug}`); // Navigate to the review page
    }
  };

  return (
    <div className="relative w-48">
      <Combobox onChange={onChangeHandler}>
        <ComboboxInput
          placeholder="Search…"
          className="border px-2 py-1 rounded w-full"
          onChange={(event) => setQuery(event.target.value)}
          value={query}
        />
        <ComboboxOptions className="absolute bg-white py-1 w-full">
          {reviews.map((review) => (
            <ComboboxOption key={review.slug} value={review}>
              {({ active }) => (
                <span
                  className={`block px-2 truncate w-full ${
                    active ? "bg-orange-100" : ""
                  }`}
                >
                  {review.title}
                </span>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
