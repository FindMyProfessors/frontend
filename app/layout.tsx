import "./globals.css";
import { Footer } from "components/layout/Footer";
import { Navbar } from "components/layout/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <div className="px-4">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
