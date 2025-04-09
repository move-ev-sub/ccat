import { UserProfileMenu } from '@/components/profile-dropdown-menu/user-profile-menu';
import { fetchCurrentProfile } from '@/server/services/profile';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MoveLogo from '../../../../public/move-logo.svg';

export default async function UserLayout({
  children,
}: React.PropsWithChildren) {
  const profileRes = await fetchCurrentProfile();

  if (!profileRes.ok) {
    return <p>Error: {profileRes.error}</p>;
  }

  const profile = profileRes.data;

  return (
    <main>
      <nav className="border-border flex w-full items-center justify-start gap-6 border-b px-8 py-3">
        <Link
          href="/user"
          className="focus-visible:ring-ring focus-visible:ring-offset-background rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Image src={MoveLogo} alt="Move Logo" className="h-8 w-fit" />
        </Link>
        <Link
          href={'/user'}
          className="text-foreground hover:text-accent ml-8 text-sm font-medium transition-colors"
        >
          Veranstaltungen
        </Link>
        <UserProfileMenu profile={profile} className="ml-auto" />
      </nav>
      {children}
    </main>
  );
}
