import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Suspense } from "react";

import { unstable_noStore as noStore } from "next/cache";
import db from "@/lib/db";
import {
  GuestBookFormLoading,
  LoadingMessages,
} from "@/components/LoadingState";
import { Form } from "@/components/Form";
import getSession from "@/lib/getSession";
import { SignIn } from "../(auth)/sign-in";

async function getGuestBrookEntry() {
  noStore();
  const data = await db.guestBookEntry.findMany({
    select: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      message: true,
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 30,
  });

  return data;
}

export default function GuestbookPage() {
  return (
    <section className="max-w-7xl w-full px-4 md:px-8 mx-auto">
      <h1 className="text-4xl font-semibold lg:text-5xl pt-5">Guestbook</h1>
      <p className="leading-7 text-muted-foreground mt-2">Sign my Guestbook!</p>

      <Card className="mt-10">
        <CardHeader className="flex flex-col w-full">
          <Label className="mb-1">Message</Label>
          <Suspense fallback={<GuestBookFormLoading />}>
            <GuestBookForm />
          </Suspense>

          <ul className="pt-7 gap-y-5 flex flex-col">
            <Suspense fallback={<LoadingMessages />}>
              <GuestBookEntries />
            </Suspense>
          </ul>
        </CardHeader>
      </Card>
    </section>
  );
}

async function GuestBookEntries() {
  const data = await getGuestBrookEntry();

  if (data.length === 0) {
    return null;
  }

  return data.map((item) => (
    <li key={item.id}>
      <div className="flex items-center">
        <img
          src={item.user?.image as string}
          alt="User Profile Image"
          className="w-10 h-10 rounded-lg"
        />

        <p className="text-muted-foreground pl-3 break-words">
          {item.user?.name}:{" "}
          <span className="text-foreground">{item.message}</span>
        </p>
      </div>
    </li>
  ));
}

async function GuestBookForm() {
  const session = await getSession();
  const user = session?.user;

  if (user) {
    return <Form />;
  }

  return (
    <div className="flex justify-between gap-4 flex-col md:flex-row">
      <Input type="text" placeholder="Your Message..." />

      <SignIn />
    </div>
  );
}
