import { client } from "app/gql/client";
import { GET_COURSES, GET_SCHOOLS } from "app/gql/queries";
import { Course, School } from "app/types";
import SearchCoursesInput from "./components/SearchCoursesInput";

const Home = async () => {
  const { data: schoolsData } = await client.query({ query: GET_SCHOOLS });
  const { data: coursesData } = await client.query({
    query: GET_COURSES,
    variables: {
      schoolId: 1,
      input: {
        year: 2023,
        semester: "SPRING",
      },
      first: 3200,
    },
  });

  const schools = schoolsData.schools.schools.map((s: School) => ({
    id: s.id,
    name: s.name
      .split(" ")
      .filter((s) => s[0] != s[0].toLowerCase()) // Filter uncapitalized words
      .map((s) => s[0]) // ["Univerity", "Central", "Florida"] => ["U", "C", "F"]
      .join(""), // "UCF"
  }));

  let courses: Course[] = coursesData.school.courses.courses;
  console.log(courses);
  return (
    <div className="mx-auto flex max-w-screen-sm flex-col py-40 text-center">
      <div className="whitespace-nowrap py-1.5 text-4xl font-extrabold sm:text-5xl lg:text-6xl">
        FIND MY PROFESSORS
      </div>
      <div className="text-lg sm:text-xl lg:text-2xl">
        A better way to search for professors
      </div>
      <SearchCoursesInput
        formStyles="mx-auto mt-8 flex w-[400px] text-sm sm:w-[500px] sm:text-base lg:w-[550px] lg:text-lg relative"
        selectStyles="rounded-l border bg-gray-100 p-3 outline-none ring-blue-500 focus:z-10 focus:ring-2"
        inputStyles="w-0 flex-1 border-y px-3.5 py-3 outline-none ring-blue-500 focus:z-10 focus:ring-2 w-full"
        optionStyles="absolute w-full rounded border bg-white py-2 top-16"
        buttonStyles="grid place-content-center rounded-r border bg-gray-100 px-4"
        iconStyles="h-7 w-7 text-gray-500"
        schools={schools}
        courses={courses}
      />
    </div>
  );
};

export default Home;
