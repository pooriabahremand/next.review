"use client";
import { ReactNode, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useRouter } from "next/navigation";

export default function SearchBox(): ReactNode {
  const [query, setQuery] = useState("");
  const [reviews, setReviews] = useState([]);
  const [debouncedQuery] = useDebounce(query, 400);
  useEffect(() => {
    if (debouncedQuery.length > 1) {
      const controller = new AbortController();
      (async () => {
        const url = `/api/search?query=${encodeURIComponent(debouncedQuery)}`;
        const response = await fetch(url, { signal: controller.signal });
        const reviews = await response.json();
        console.log(reviews);
        setReviews(reviews);
      })();
      return () => controller.abort();
    } else {
      setReviews([]);
    }
  }, [debouncedQuery]);
  const router = useRouter();

  const onChangeHandler = (review) => {
    if (!review) {
      return;
    } else {
      router.push(`/reviews/${review.slug}`);
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
