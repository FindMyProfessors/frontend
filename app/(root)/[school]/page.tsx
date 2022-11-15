import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { client } from "app/gql/client";
import { GET_COURSES } from "app/gql/queries";
import { Course } from "app/types";

export default async function CourseSearch({
  searchParams,
  params,
}: {
  searchParams: { q: string };
  params: { school: string };
}) {
  if (params.school.toLowerCase() != "1") {
    return <div>This school is not being supported</div>;
  }

  const { data } = await client.query({
    query: GET_COURSES,
    variables: {
      schoolId: "1",
      input: {
        semester: "SPRING",
        year: 2023,
      },
      searchQuery: searchParams.q?.toUpperCase(),
    },
  });

  let courses = data.school.courses.courses;

  return (
    <div>
      {courses.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {courses.map((course: Course) => (
            <Link
              className="rounded bg-gray-100 p-4"
              key={course.id}
              href={`${params.school}/${course.id}`}
            >
              <div className="text-lg font-semibold">{course.name}</div>
              <div className="text-sm">{course.code}</div>
            </Link>
          ))}
        </div>
      ) : (
        <div>Your search did not match any courses in our system</div>
      )}
    </div>
  );
}
