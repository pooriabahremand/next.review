"use client";
import { ReactNode, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useRouter } from "next/navigation";

export default function SearchBox({ reviews }): ReactNode {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const filtered =
    query === ""
      ? reviews.slice(0, 5)
      : reviews
          .filter((review) =>
            review.title.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5);

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
          {filtered.map((review) => (
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
