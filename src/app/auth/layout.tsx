export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="flex h-full min-h-svh w-full items-center justify-center py-24">
        {children}
      </div>
    </main>
  );
}
