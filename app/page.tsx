import Image from 'next/image';
import { SignIn } from './(auth)/sign-in';

export default function Home() {
  return (
    <main>
      <h1>Hi Prashant</h1>
      <SignIn />
    </main>
  );
}
