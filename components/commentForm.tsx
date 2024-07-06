"use client";
import { CommentFormProps } from "../interface/interfaces";
import { formAction } from "../lib/actions";
import { useCommentForm } from "../lib/hooks";

export default function CommentForm({ slug, title }: CommentFormProps) {
  const { nameRef, messageRef, state, handleSubmit } = useCommentForm(
    slug,
    formAction
  );

  return (
    <form
      className="border bg-white flex flex-col gap-2 mt-3 px-3 py-3 rounded"
      onSubmit={handleSubmit}
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
          ref={nameRef}
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
          ref={messageRef}
          required
        />
      </div>
      {state.error ? <p className="text-red-700">{state.error}</p> : <p></p>}
      {state.loading === true ? (
        <button
          type="submit"
          disabled
          className="bg-orange-800 rounded px-2 py-1 self-center
                     text-slate-50 w-32 hover:bg-orange-700
                     disabled:bg-slate-500 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      ) : (
        <button
          type="submit"
          className="bg-orange-800 rounded px-2 py-1 self-center
                     text-slate-50 w-32 hover:bg-orange-700"
        >
          Submit
        </button>
      )}
    </form>
  );
}
