import "server-only";

import { marked } from "marked";
import qs from "qs";
import {
  SearchableReviewsInterface,
  FetchReviewsInterface,
  Review,
  FetchReviewsParameters,
  FetchReviewsReturnInterface,
} from "../interface/interfaces";

export const REVALIDATE_TAG = "reviews";

const CMS_URL = process.env.CMS_URL;

export async function getReview(slug: string): Promise<Review> {
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

export async function fetchSearchableReviews(
  query
): Promise<SearchableReviewsInterface[]> {
  const { data } = await fetchReviews({
    filters: { title: { $containsi: query } },
    fields: ["title", "slug"],
    sort: ["title"],
    pagination: { pageSize: 5 },
  });
  const finalResult = data.map((review) => {
    return {
      slug: review.attributes.slug,
      title: review.attributes.title,
    };
  });
  return finalResult;
}

/**
 * Fetches reviews from the Strapi API based on provided pagination parameters.
 *
 * @param {number} pageNumber - The page number of reviews to retrieve (starts from 1).
 * @param {number} pageSize - The number of reviews to retrieve per page.
 * @returns {Promise<{ result: Review[], meta: { pageCount: number } }>} - Promise resolving to an object containing fetched reviews and pagination metadata.
 */
export async function getReviews(pageNumber: number, pageSize: number) {
  // Fetch reviews from Strapi using the fetchReviews function
  const { data, meta } = await fetchReviews({
    // Specify fields to be retrieved from the reviews
    fields: ["slug", "title", "subtitle", "publishedAt"],
    // Populate the 'image' field with its URL
    populate: { image: { fields: ["url"] } },
    // Sort reviews by published date in descending order
    sort: ["publishedAt:desc"],
    // Set pagination parameters
    pagination: { page: pageNumber, pageSize },
  });

  // Transform fetched review data into a cleaner format
  const result = data.map((review) => {
    return {
      // Extract review properties from the Strapi response
      slug: review.attributes.slug,
      title: review.attributes.title,
      subtitle: review.attributes.subtitle,
      // Extract date only (year-month-day) from publishedAt
      date: review.attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
      // Construct the full image URL by combining CMS_URL and image URL
      image: CMS_URL + review.attributes.image.data.attributes.url,
    };
  });

  // Return the processed review data and pagination metadata
  return { result, meta: { pageCount: meta.pagination.pageCount } };
}


/**
 * Fetches reviews from the Strapi API based on provided parameters.
 *
 * @param {FetchReviewsParameters} parameters - Object containing query options for fetching reviews.
 * @returns {Promise<FetchReviewsReturnInterface>} - Promise resolving to the fetched reviews data.
 * @throws {Error} - Throws an error if the request fails.
 */
async function fetchReviews(
  parameters: FetchReviewsParameters
): Promise<FetchReviewsReturnInterface> {
  // Construct the URL for fetching reviews from Strapi API
  const url = `${CMS_URL}/api/reviews?${qs.stringify(parameters, {
    encodeValuesOnly: true,
  })}`;

  try {
    // Fetch data from the constructed URL
    const response = await fetch(url, {
      // Set the `next` option for Strapi to trigger revalidation on successful requests
      next: {
        tags: [REVALIDATE_TAG],
      },
    });

    // Check if the response is successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`Failed to fetch reviews. Status: ${response.status}`);
    }

    // Parse the JSON response from Strapi
    const result = await response.json();

    // Return the fetched reviews data
    return result;
  } catch (error) {
    // Log the error message for debugging
    console.error("Error fetching reviews:", error.message);

    // Re-throw the error for handling in the calling function
    throw error;
  }
}

