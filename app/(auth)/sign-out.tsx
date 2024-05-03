import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const SignOut = () => {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <Button type="submit">Sign Out </Button>
    </form>
  );
};
export default SignOut;
