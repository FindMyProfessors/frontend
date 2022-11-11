import Link from "next/link";

export default function page({
  searchParams,
  params,
}: {
  searchParams: { q: string };
  params: { school: string };
}) {
  const courses = [
    "cot3100",
    "cda3103",
    "cis3360",
    "cop3502",
    "sta4163",
  ].filter((course) => course.startsWith(searchParams.q));

  return (
    <div>
      {courses.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {courses.map((course, i) => (
            <Link
              className="rounded bg-gray-100 p-4 text-center"
              key={i}
              href={`${params.school}/${course}`}
            >
              {course}
            </Link>
          ))}
        </div>
      ) : (
        <div>Your search did not match any courses in our system</div>
      )}
    </div>
  );
}
