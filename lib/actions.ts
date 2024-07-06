"use server";
import { revalidatePath } from "next/cache";
import { createComment } from "./comments";
import { FormActionValidation } from "../Validation/formActionValidation";

export async function formAction(slug: string, user: string, msg: string) {
  const status = FormActionValidation(user, msg);
  if (status === "VALIDATED") {
    await createComment({
      slug,
      user: user,
      message: msg,
    });
    revalidatePath(`/reviews/${slug}`);
  } else {
    return status;
  }
}
