import { PageContainer } from '@/components/page-container';
import { ThemeSwitch } from '@/components/theme-switch';
import { TOC } from '@/components/toc/toc';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { extractHeadings } from '@/utils/mdx';
import { ChevronRightIcon } from '@heroicons/react/16/solid';
import fs, { existsSync } from 'fs';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import path from 'path';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: `${params.slug} der Consulting Contact`,
    description:
      'Hier finden Sie die rechtlichen Informationen zur Consulting Contact',
  };
}

async function getDocumentSlugs(): Promise<string[]> {
  // Get all the names of the files in the directory "../data"

  const folderPath = path.join(process.cwd(), 'content', 'legal');
  const fileNames = fs.readdirSync(folderPath);

  // Remove the file extension from the file names
  const slugs = fileNames.map((fileName) => {
    return fileName.replace(/\.json$/, '');
  });

  return slugs;
}

async function getDocument(slug: string): Promise<string | null> {
  // Check if the file exists
  const filePath = path.join(process.cwd(), 'content', 'legal', `${slug}.md`);

  // If the file doesn't exist, return null
  if (!existsSync(filePath)) {
    return null;
  }

  // Read the file
  const mdxContents = fs.readFileSync(filePath, 'utf8');

  return mdxContents;
}

export async function generateStaticParams() {
  const documents = await getDocumentSlugs();

  return documents.map((slug) => {
    return {
      slug,
    };
  });
}

export default async function LegalPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const params = await paramsPromise;
  const { slug } = params;

  const mdxContents = await getDocument(slug);

  if (!mdxContents) {
    return notFound();
  }

  const { default: Component } = await import(`/content/legal/${slug}.md`);
  const headings = await extractHeadings(mdxContents);

  return (
    <PageContainer className="container flex w-full max-w-6xl items-start justify-center gap-8">
      <div className="prose lg:shrink-0" data-content="true">
        <Component />
      </div>
      <div className="border-border sticky top-12 hidden grow border-l pl-8 lg:block">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <ThemeSwitch />
          <Button variant={'outline'}>
            <Link
              href={'/auth/login'}
              className="flex items-center justify-center gap-2.5"
            >
              Zur App
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>
        <Separator className="my-6" />
        <TOC nodes={headings} />
      </div>
    </PageContainer>
  );
}
