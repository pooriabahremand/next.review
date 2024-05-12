import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import { REVALIDATE_TAG } from "../../../lib/reviews";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  if (payload.model == "review") {
    revalidateTag(REVALIDATE_TAG);
  }
  return new Response(null, { status: 200 });
}
