import { UserProfileMenu } from '@/components/profile-dropdown-menu/user-profile-menu';
import { auth } from '@/utils/auth';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MoveLogo from '../../../../public/move-logo.svg';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function UserLayout({
  children,
}: React.PropsWithChildren) {
  const sessionRes = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessionRes) {
    throw new Error('User not authenticated');
  }

  const user = sessionRes.user;

  return (
    <main>
      <nav className="border-border flex w-full items-center justify-start gap-6 border-b px-8 py-3">
        <Link href="/user" className="focus-indicator rounded-md">
          <Image src={MoveLogo} alt="Move Logo" className="h-8 w-fit" />
        </Link>
        <Link
          href={'/user'}
          className="text-foreground hover:text-accent ml-8 text-sm font-medium transition-colors"
        >
          Veranstaltungen
        </Link>
        <UserProfileMenu profile={user} className="ml-auto" />
      </nav>
      {children}
    </main>
  );
}
