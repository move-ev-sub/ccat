import { PageContainer } from '@/components/page-container';
import { StepContent } from '@/flows/_lib/steps/step-content';
import { StepsProgress } from '@/flows/_lib/steps/steps-progress';
import { MultiStepForm } from '@/flows/_lib/ui/multi-step-form';
import { ApplicationStoreProvider } from '@/flows/application/stores/application.store';
import { ApplicationReview } from '@/flows/application/ui/application-review';
import { CoverLettersForm } from '@/flows/application/ui/forms/cover-letters-form';
import { GeneralForm } from '@/flows/application/ui/forms/general-form';
import { PrioritizeForm } from '@/flows/application/ui/forms/prioritize-form';
import { SelectForm } from '@/flows/application/ui/forms/select-form';
import { prepareApplicationForm } from '@/flows/application/utils/prepareForm';

const steps = [
  {
    id: 'general',
    label: 'Allgemeine Informationen',
    description: 'Informationen über dich und deinen akademischen Hintergrund',
  },
  {
    id: 'select',
    label: 'Veranstaltungen auswählen',
    description: 'Wähle die Veranstaltungen, auf die du dich bewerben möchtest',
  },
  {
    id: 'cover-letters',
    label: 'Anschreiben hinzufügen',
    description: 'Füge Anschreiben zu deinen Veranstaltungen hinzu',
  },
  {
    id: 'prioritize',
    label: 'Veranstaltungen priorisieren',
    description: 'Priorisiere die Veranstaltungen, die du besuchen möchtest',
  },
  {
    id: 'review',
    label: 'Überprüfen',
    description: 'Überprüfe deine Eingaben und sende deine Bewerbung ab',
  },
];

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const eventID = (await params).eventId;

  const res = await prepareApplicationForm(eventID);

  if (!res) {
    throw new Error('Failed to fetch data');
  }

  const { slots, subEvents } = res;

  return (
    <PageContainer>
      <MultiStepForm steps={steps}>
        <ApplicationStoreProvider
          initialState={{
            eventId: eventID,
            slots: Object.fromEntries(slots.map((entry) => [entry.id, entry])),
          }}
        >
          <StepsProgress className="mb-12" />

          <StepContent value="general">
            <GeneralForm />
          </StepContent>
          <StepContent value="select">
            <SelectForm subEvents={subEvents} />
          </StepContent>
          <StepContent value="cover-letters">
            <CoverLettersForm />
          </StepContent>
          <StepContent value="prioritize">
            <PrioritizeForm />
          </StepContent>
          <StepContent value="review">
            <ApplicationReview />
          </StepContent>
        </ApplicationStoreProvider>
      </MultiStepForm>
    </PageContainer>
  );
}
