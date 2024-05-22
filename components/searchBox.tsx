"use client";
import { ReactNode, useEffect, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useRouter } from "next/navigation";
import { fetchSearchableReviews } from "../lib/reviews";

export default function SearchBox(): ReactNode {
  const [query, setQuery] = useState("");
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (query.length > 1) {
      (async () => {
        const reviews = await fetchSearchableReviews(query);
        setReviews(reviews);
      })();
    } else {
      setReviews([]);
    }
  }, [query]);
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
