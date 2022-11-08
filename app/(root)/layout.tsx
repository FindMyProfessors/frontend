import "app/globals.css";
import { Footer } from "components/layout/Footer";
import { Navbar } from "components/layout/Navbar";
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
        <div className="px-4">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
