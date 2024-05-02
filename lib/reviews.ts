import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import { marked } from "marked";

export async function getFeaturedReview() {
  const featuredReview = await getReviews();
  return featuredReview[0];
}

export async function getReview(slug: string) {
  const text = await readFile(`./content/reviews/${slug}.md`, "utf8");
  const {
    content,
    data: { title, image, date },
  } = matter(text);
  const body = marked(content);

  return { slug, body, title, image, date };
}

export async function getSlugs() {
  const files = await readdir("./content/reviews");
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.slice(0, -".md".length));
}

export async function getReviews() {
  const slugs = await getSlugs();
  const reviews = [];
  let review: {};
  for (const slug of slugs) {
    review = await getReview(slug);
    reviews.push(review);
  }

  reviews.sort((a, b) => {
    const dateA: any = new Date(a.date);
    const dateB: any = new Date(b.date);

    return dateB - dateA;
  });

  return reviews;
}
