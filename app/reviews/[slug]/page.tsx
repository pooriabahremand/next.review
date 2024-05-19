import Image from "next/image";
import Heading from "../../../components/heading";
import ShareLinkBtn from "../../../components/shareLinkBtn";
import { getReview, getSlugs } from "../../../lib/reviews";
import { notFound } from "next/navigation";

export async function generateMetadata({ params: { slug } }) {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }

  return {
    title: review.title,
  };
}

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ReviewPage({ params: { slug } }) {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  // console.log("[ReviewPage] rendering: ", slug);
  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="font-semibold pb-3">{review.subtitle}</p>
      <div className="flex gap-2 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareLinkBtn />
      </div>
      <Image
        src={review.image}
        alt=""
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className="max-w-screen-sm prose prose-slate"
      />
    </>
  );
}
