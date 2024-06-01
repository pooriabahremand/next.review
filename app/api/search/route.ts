import { fetchSearchableReviews } from "../../../lib/reviews";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  // console.log(query);
  const reviews = await fetchSearchableReviews(query);

  return Response.json(reviews);
}
