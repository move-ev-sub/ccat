import React from 'react';

export default async function CreateLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <section className="py-20">
      <div className="container max-w-2xl">{children}</div>
    </section>
  );
}
