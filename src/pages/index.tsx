import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Find My Courses</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center py-28 text-center">
        <div className="py-1.5 px-4 text-4xl font-extrabold tracking-wider sm:text-5xl">
          FIND MY COURSES
        </div>
        <div className="sm:text-lg">A better way to search for classes</div>
        <div className="mt-8 flex w-[500px]">
          <select className="border px-2 py-3 outline-none">
            <option value="UCF">UCF</option>
            <option value="UF">UF</option>
          </select>
          <input
            className="flex-1 border px-3.5 py-3 outline-none"
            placeholder="Course name"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
