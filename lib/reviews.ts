import { marked } from "marked";
import qs from "qs";
import { DataInterface, Review } from "../interface/interfaces";

export const REVALIDATE_TAG = "reviews";
const CMS_URL = "http://localhost:1337";

export async function getReview(slug: string): Promise<Review> {
  console.log("slug of the demanded review", slug);
  const data = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body"],
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: 1, withCount: false },
  });
  if (data.length === 0) {
    return null;
  }
  const body = await marked(data[0].attributes.body);
  return {
    slug: data[0].attributes.slug,
    title: data[0].attributes.title,
    subtitle: data[0].attributes.subtitle,
    date: data[0].attributes.publishedAt,
    image: CMS_URL + data[0].attributes.image.data.attributes.url,
    body,
  };
}

export async function getSlugs(): Promise<string[]> {
  const result = await fetchReviews({
    fields: ["slug"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  });
  const finalResult = result.map((slug) => slug.attributes.slug);
  return finalResult;
}

export async function getReviews(pageSize): Promise<Review[]> {
  const result = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { pageSize },
  });

  return result.map(({ attributes }) => {
    return {
      slug: attributes.slug,
      title: attributes.title,
      subtitle: attributes.subtitle,
      date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
      image: CMS_URL + attributes.image.data.attributes.url,
    };
  });
}

async function fetchReviews(parameters): Promise<DataInterface[]> {
  const url =
    `${CMS_URL}/api/reviews` +
    "?" +
    qs.stringify(parameters, { encodeValuesOnly: true });
  const response = await fetch(url, {
    cache: "no-store",
  });
  const result = await response.json();
  return result.data;
}

// const response = await fetch(url, {
//   next: {
//     tags: [REVALIDATE_TAG],
//   },
// });
