import { PageContainer } from '@/components/page-container';

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer className="container flex w-full max-w-6xl items-start justify-center gap-8">
      <div className="prose lg:shrink-0" data-content="true">
        {children}
      </div>
    </PageContainer>
  );
}
