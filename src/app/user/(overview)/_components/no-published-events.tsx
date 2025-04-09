export default async function NoPublishedEvents() {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center text-center lg:col-span-2">
      <p className="text-foreground font-medium">
        Es gibt derzeit keine offenen Veranstaltungen.
      </p>
      <p className="text-secondary mt-1 text-sm">
        Wir informieren dich, sobald eine Veranstaltung verfügbar ist.
      </p>
    </div>
  );
}
