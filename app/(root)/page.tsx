const Home = () => {
  return (
    <div className="mx-auto flex max-w-screen-sm flex-col py-28 text-center">
      <div className="py-1.5 text-4xl font-extrabold tracking-wider sm:text-5xl lg:text-6xl">
        FIND MY PROFESSORS
      </div>
      <div className="text-lg sm:text-xl lg:text-2xl">
        A better way to search for classes
      </div>
      <div className="mx-auto mt-8 flex w-[400px] text-sm sm:w-[500px] sm:text-base lg:w-[550px] lg:text-lg">
        <select className="rounded-l border px-2 py-3 outline-none">
          <option value="UCF">UCF</option>
          <option value="UF">UF</option>
        </select>
        <input
          className="w-0 flex-1 rounded-r border-y border-r px-3.5 py-3 outline-none"
          placeholder="Course name"
          type="text"
        />
      </div>
    </div>
  );
};

export default Home;
