"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent } from "react";

export const Navbar = () => {
  const path = usePathname();
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    console.log(data);
    // router.push(`/${school}/${course}`);
  };

  return (
    <div className="mx-auto flex h-16 w-full max-w-screen-xl items-center justify-between gap-4 px-4 text-sm">
      <div className="text-xl tracking-wider">FMP</div>
      {path != "/" ? (
        <form onSubmit={handleSubmit} className="flex">
          <select
            name="school"
            className="rounded-l border-y border-l p-2 outline-none focus:z-10 focus:ring-2"
          >
            <option value="ucf">UCF</option>
            <option value="uf">UF</option>
          </select>
          <input
            name="course"
            className="rounded-r border border-y border-r px-3 py-2 outline-none ring-blue-500 focus:z-10 focus:ring-2"
            placeholder="Course name"
            type="text"
          />
        </form>
      ) : null}
      <div className="flex items-center">
        <Link
          className="mr-0.5 whitespace-nowrap rounded px-4 py-2 outline-none ring-blue-500 focus:z-10 focus:ring-2"
          href="/login"
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
