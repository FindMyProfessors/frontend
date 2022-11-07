import "app/globals.css";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className="flex min-h-screen flex-col">
        <div className="px-4">{children}</div>
      </body>
    </html>
  );
}
