"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const Home = () => {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { school, course } = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );

    router.push(`/${school}?q=${course}`);
  };

  return (
    <div className="mx-auto flex max-w-screen-sm flex-col py-40 text-center">
      <div className="whitespace-nowrap py-1.5 text-4xl font-extrabold sm:text-5xl lg:text-6xl">
        FIND MY PROFESSORS
      </div>
      <div className="text-lg text-gray-600 sm:text-xl lg:text-2xl">
        A better way to search for classes
      </div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 flex w-[400px] text-sm sm:w-[500px] sm:text-base lg:w-[550px] lg:text-lg"
      >
        <select
          name="school"
          className="rounded-l border p-3 outline-none ring-blue-500 focus:z-10 focus:ring-2 "
        >
          <option value="ucf">UCF</option>
          <option value="uf">UF</option>
        </select>
        <input
          name="course"
          className="w-0 flex-1 rounded-r border-y border-r px-3.5 py-3 outline-none ring-blue-500 focus:z-10 focus:ring-2 "
          placeholder="Course name"
          type="text"
        />
      </form>
    </div>
  );
};

export default Home;
