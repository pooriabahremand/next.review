import db from "./db";

export async function createComment({
  slug,
  user,
  message,
}: {
  slug: string;
  user: string;
  message: string;
}) {
  return await db.comment.create({
    data: { slug, user, message },
  });
}

export async function Comments(slug: string) {
  return await db.comment.findMany({
    where: { slug },
    orderBy: { postedAt: "desc" },
  });
}
