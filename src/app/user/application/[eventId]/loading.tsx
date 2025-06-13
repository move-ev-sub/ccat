import { Spinner } from '@/components/spinner';

export default async function Test2Loading() {
  return (
    <div className="py-32">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center px-8 text-center">
        <Spinner />
        <p className="text-foreground mt-12 font-medium">
          Bitte, warte einen Moment.
        </p>
        <p className="text-secondary mt-2 text-sm">
          Wir bereiten deine Bewerbung gerade vor. Das kann einige Sekunden
          dauern.
        </p>
      </div>
    </div>
  );
}
