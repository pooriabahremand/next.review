import { redirect } from "next/navigation";
import { createComment } from "../lib/comments";
import { revalidatePath } from "next/cache";

export interface CommentFormProps {
  title: string;
  slug: string;
}

export default function CommentForm({ slug, title }: CommentFormProps) {
  async function action(formData: FormData) {
    "use server";
    await createComment({
      slug,
      user: formData.get("user") as string,
      message: formData.get("message") as string,
    });
    revalidatePath(`/reviews/${slug}`);
    redirect(`/reviews/${slug}`);
  }

  return (
    <form
      className="border bg-white flex flex-col gap-2 mt-3 px-3 py-3 rounded"
      action={action}
    >
      <p className="pb-1">
        Already played <strong>{title}</strong>? Have your say!
      </p>
      <div className="flex">
        <label htmlFor="userField" className="shrink-0 w-32">
          Your name
        </label>
        <input
          name="user"
          id="userField"
          className="border px-2 py-1 rounded w-48"
          required
        />
      </div>
      <div className="flex">
        <label htmlFor="messageField" className="shrink-0 w-32">
          Your comment
        </label>
        <textarea
          name="message"
          id="messageField"
          className="border px-2 py-1 rounded w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-orange-800 rounded px-2 py-1 self-center
                     text-slate-50 w-32 hover:bg-orange-700"
      >
        Submit
      </button>
    </form>
  );
}
