'use client';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="bg-py-32 flex h-screen flex-col items-center justify-center text-center font-sans text-gray-800">
      <h1 className="m-0 text-6xl">404</h1>
      <p className="my-4 text-xl">Page Not Found</p>
      <Button variant={'accent'}>Gehe zur Startseite</Button>
    </div>
  );
}
