import "app/globals.css";
import { Navbar } from "./components/Navbar";
import { inter } from "app/font";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head></head>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto w-full max-w-screen-lg px-4">{children}</div>
      </body>
    </html>
  );
}
