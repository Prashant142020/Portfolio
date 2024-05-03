 

import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';
import getSession from '@/lib/getSession';
import db from '@/lib/db';

export async function GET() {
  noStore();
  const session = await getSession();
  const user = session?.user;

  if (!user || user === null || !user.id) {
    throw new Error('Something went wrong...');
  }

  let dbUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    dbUser = await db.user.create({
      data: {
        id: user.id,
        // todo: i have to fix these issue
         name: user.name ?? '',
       
        email: user.email ?? '',
        // image: user.picture,
      },
    });
  }

  return NextResponse.redirect(
    'https://portfolio-nextjs14-ruby.vercel.app/guestbook'
  );
}
