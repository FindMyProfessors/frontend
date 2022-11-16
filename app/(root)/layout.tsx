import "app/globals.css";
import { Navbar } from "./components/Navbar";
import { inter } from "app/font";
import { client } from "app/gql/client";
import { GET_SCHOOLS } from "app/gql/queries";
import { School } from "app/types";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await client.query({ query: GET_SCHOOLS });

  const schools = data.schools.schools.map((s: School) => ({
    id: s.id,
    name: s.name
      .split(" ")
      .filter((s) => s[0] != s[0].toLowerCase()) // Filter uncapitalized words
      .map((s) => s[0]) // ["Univerity", "Central", "Florida"] => ["U", "C", "F"]
      .join(""), // "UCF"
  }));

  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="flex min-h-screen flex-col">
        <Navbar schools={schools} />
        <div className="mx-auto w-full max-w-screen-lg px-4">{children}</div>
      </body>
    </html>
  );
}
