import { marked } from "marked";
import qs from "qs";
import {
  SearchableReviewsInterface,
  FetchReviewsInterface,
  Review,
} from "../interface/interfaces";

export const REVALIDATE_TAG = "reviews";
const CMS_URL = "http://localhost:1337";

export async function getReview(slug: string): Promise<Review> {
  // console.log("slug of the demanded review", slug);
  const { data } = await fetchReviews({
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
  const { data } = await fetchReviews({
    fields: ["slug"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  });
  const finalResult = data.map((slug) => slug.attributes.slug);
  return finalResult;
}

export async function getSearchableReviews(): Promise<
  SearchableReviewsInterface[]
> {
  const { data } = await fetchReviews({
    fields: ["title", "slug"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  });
  const finalResult = data.map((review) => {
    return {
      slug: review.attributes.slug,
      title: review.attributes.title,
    };
  });
  console.log(finalResult);
  return finalResult;
}

export async function getReviews(pageNumber, pageSize) {
  const { data, meta } = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: { image: { fields: ["url"] } },
    sort: ["publishedAt:desc"],
    pagination: { page: pageNumber, pageSize },
  });

  const result = data.map((review) => {
    return {
      slug: review.attributes.slug,
      title: review.attributes.title,
      subtitle: review.attributes.subtitle,
      date: review.attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
      image: CMS_URL + review.attributes.image.data.attributes.url,
    };
  });

  return {
    result,
    meta: {
      pageCount: meta.pagination.pageCount,
    },
  };
}

async function fetchReviews(parameters): Promise<FetchReviewsInterface> {
  const url =
    `${CMS_URL}/api/reviews` +
    "?" +
    qs.stringify(parameters, { encodeValuesOnly: true });
  const response = await fetch(url, {
    next: {
      tags: [REVALIDATE_TAG],
    },
  });
  const result = await response.json();
  // console.log(result);
  return result;
}
