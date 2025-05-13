import { PhaseSetupForm } from '@/components/forms/phase-setup-form';
import { PageContainer } from '@/components/page-container';
import { PageDesc, PageHeader, PageTitle } from '@/components/page-header';
import { fetchPhasesForEvent } from '@/features/phase/services/phaseService';
import { Phase, PhaseType } from '@/generated/prisma/client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phasen',
  description: 'Hier können Sie die Phasen des Events bearbeiten.',
};

export default async function AdminEventPhasesPage({
  params: paramPromise,
}: {
  params: Promise<{
    eventId: string;
  }>;
}) {
  const params = await paramPromise;
  const eventId = params.eventId;

  const res = await fetchPhasesForEvent({
    eventId,
  });

  // TODO: Handle error case
  if (!res.ok) {
    return <p>Error: {res.error}</p>;
  }

  const phases = res.data;

  // Extract the phases for each phase type
  const prepPhase = await extractPhase(phases, 'PREP');
  const applicationPhase = await extractPhase(phases, 'APPLICATION');
  const selectionOnePhase = await extractPhase(phases, 'SELECTION_ONE');
  const selectionTwoPhase = await extractPhase(phases, 'SELECTION_TWO');
  const eventPhase = await extractPhase(phases, 'EVENT');
  const postEventPhase = await extractPhase(phases, 'POST_EVENT');

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Phasen</PageTitle>
        <PageDesc>Hier können Sie die Phasen des Events bearbeiten.</PageDesc>
      </PageHeader>
      <ul className="mt-to-header container">
        <PhaseSetupForm
          phaseIndex={0}
          title="Vorbereitungsphase"
          description={
            'In der Vorebereitungsphase hast du Zeit die Veranstaltungen und Unternehmen einzurichten.'
          }
          phaseType={'PREP'}
          phase={prepPhase}
          eventId={eventId}
        />
        <PhaseSetupForm
          phaseIndex={1}
          title="Bewerbungsphase"
          description={
            'In der Bewerbungsphase haben die Teilnehmer:innen die Möglichkeit sich für die Veranstaltung zu bewerben.'
          }
          phaseType={'APPLICATION'}
          phase={applicationPhase}
          eventId={eventId}
        />
        <PhaseSetupForm
          phaseIndex={2}
          title="1. Auswahlphase"
          description={
            'In der 1. Auswahlphase kannst du die Bewerbungen sichten und die Teilnehmer:innen auswählen.'
          }
          phaseType={'SELECTION_ONE'}
          phase={selectionOnePhase}
          eventId={eventId}
        />
        <PhaseSetupForm
          phaseIndex={3}
          title="2. Auswahlphase"
          description={
            'In der 2. Auswahlphase kannst du die Bewerbungen sichten und die Teilnehmer:innen auswählen.'
          }
          phaseType={'SELECTION_TWO'}
          phase={selectionTwoPhase}
          eventId={eventId}
        />
        <PhaseSetupForm
          phaseIndex={4}
          title="Eventphase"
          description={
            'In der Eventphase findet die Veranstaltung statt. Hier kannst du die Teilnehmer:innen und Unternehmen verwalten.'
          }
          phaseType={'EVENT'}
          phase={eventPhase}
          eventId={eventId}
        />
        <PhaseSetupForm
          phaseIndex={5}
          title="Nachbereitungsphase"
          description={
            'In der Nachbereitungsphase kannst du die Veranstaltung abschließen und Feedback sammeln.'
          }
          phaseType={'POST_EVENT'}
          phase={postEventPhase}
          eventId={eventId}
        />
      </ul>
    </PageContainer>
  );
}

/**
 * Extracts one phase from the list of phases for a given phase type.
 *
 */
async function extractPhase(
  phases: Omit<Phase, 'createdById'>[],
  phaseType: PhaseType
): Promise<Omit<Phase, 'createdById'> | undefined> {
  return phases.find((phase) => phase.type === phaseType);
}
