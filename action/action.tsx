"use server";

import { revalidatePath } from "next/cache";
import getSession from "@/lib/getSession";
import db from "@/lib/db";

export async function postData(formData: FormData) {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    throw new Error("Unorthrizued");
  }

  const message = formData.get("message") as string;

  const data = await db.guestBookEntry.create({
    data: {
      userId: user.id,
      message: message,
    },
  });

  revalidatePath("/guestbook");
}
