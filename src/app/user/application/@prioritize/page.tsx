'use client';

import { useApplicationStore } from '@/components/application/application.store';
import { PriorityList } from '@/components/application/priority-list';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import { Separator } from '@/components/ui/separator';
import { Fragment } from 'react';
import { PrioritizeNavigationBar } from './_components/prioritize-navgation-bar';

export default function ApplicationPrioritizePage() {
  const { subApplications } = useApplicationStore((store) => store);

  return (
    <>
      <PageHeader className="mb-20 px-0">
        <PageTitle>Prioritäten festlegen</PageTitle>
        <PageDesc>
          Da manche Veranstaltungen gleichzeitig stattfinden, kannst du hier
          festlegen, welche Veranstaltungen du am ehesten besuchen möchtest.
        </PageDesc>
      </PageHeader>

      {Object.keys(subApplications)
        .filter((key) => subApplications[key].length > 0)
        .map((key) => {
          return (
            <Fragment key={key}>
              <div className="grid grid-cols-2 gap-8 py-8">
                <div>
                  <p>{key}</p>
                </div>
                <div>
                  <PriorityList subApplications={subApplications[key]} />
                </div>
              </div>
              <Separator key={`${key}-separator`} />
            </Fragment>
          );
        })}
      <PrioritizeNavigationBar className="mt-12" />
    </>
  );
}
