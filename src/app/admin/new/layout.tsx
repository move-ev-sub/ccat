import { PageContainer } from '@/components/page-container';
import React from 'react';

export default async function CreateLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <PageContainer className="max-w-none !px-0">
      <div className="container max-w-2xl">{children}</div>
    </PageContainer>
  );
}
