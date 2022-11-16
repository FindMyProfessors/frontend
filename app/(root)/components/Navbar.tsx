"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchCoursesInput from "./SearchCoursesInput";

export const Navbar = ({
  schools,
}: {
  schools?: { id: number; name: string }[];
}) => {
  const path = usePathname();

  return (
    <div className="mx-auto flex h-16 w-full max-w-screen-lg items-center justify-between gap-4 px-4 text-sm">
      <Link
        className="rounded text-xl font-bold outline-none ring-blue-500 focus:z-10 focus:ring-2"
        href="/"
      >
        FMP
      </Link>
      {path != "/" ? (
        <SearchCoursesInput
          schools={schools}
          formStyles="flex"
          selectStyles="rounded-l  border-y border-l bg-gray-100 p-2 outline-none ring-blue-500  focus:z-10 focus:ring-2"
          inputStyles="rounded-r border border-y border-r px-3 py-2 outline-none ring-blue-500 focus:z-10 focus:ring-2"
        />
      ) : null}
      <div className="flex items-center">
        <Link
          className="mr-0.5 whitespace-nowrap rounded px-4 py-2 outline-none ring-blue-500 focus:z-10 focus:ring-2"
          href="/"
        >
          SIGN IN
        </Link>
        <Link
          className="whitespace-nowrap rounded bg-black px-4 py-2 text-white outline-none ring-blue-500 focus:z-10 focus:ring-2"
          href="/"
        >
          SIGN UP
        </Link>
      </div>
    </div>
  );
};
