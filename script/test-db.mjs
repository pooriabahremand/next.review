import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const comment = await db.comment.create({
    data: {
      slug: "hades-2018",
      user: "Navid Khoram Khorshid",
      message: "kosssee khare bazi bood",
    },
  });

  console.log("the Comment that added to database is this : ", comment);
}

main()
  .then(async () => {
    const comments = await db.comment.findMany({ where: slug });
    console.log("Comments: ", comments);
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
