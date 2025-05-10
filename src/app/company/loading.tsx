import { Spinner } from '@/components/spinner';

export default function CompanySubEventLoading() {
  return (
    <div className="w-full" role="status ">
      <div className="container flex min-h-72 max-w-prose flex-col items-center justify-center text-center">
        <Spinner />

        <p className="text-foreground mt-8 text-lg font-medium">
          Diese Seite lädt
        </p>
        <p className="text-secondary mt-2 text-sm">
          Bitte warte bis die Seite geladen ist. Dies kann einige Sekunden
          dauern.
        </p>
      </div>
    </div>
  );
}
