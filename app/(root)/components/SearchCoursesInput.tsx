"use client";

import { Combobox } from "@headlessui/react";
import courses from "app/gql/courses.json";
import { Course } from "app/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const SearchCoursesInput = ({
  schools,
  formStyles,
  selectStyles,
  inputStyles,
  optionStyles,
}: {
  schools?: { id: number; name: string }[];
  formStyles: string;
  selectStyles: string;
  inputStyles: string;
  optionStyles: string;
}) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [query, setQuery] = useState("");

  const filteredCourses =
    query === ""
      ? courses
      : courses.filter((c) => c.code.toLowerCase().includes(query));

  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));

    console.log(data);
    router.push(
      `/${data.school}?q=${(data["course[code]"] as string).toLowerCase()}`
    );
  };

  // return (
  //   <form onSubmit={handleSubmit} className={formStyles}>
  //     <select name="school" className={selectStyles}>
  //       {schools?.map((school) => (
  //         <option key={school.id} value={school.id}>
  //           {school.name}
  //         </option>
  //       ))}
  //     </select>
  //     <input
  //       name="course"
  //       className={inputStyles}
  //       placeholder="Course code"
  //       type="text"
  //     />
  //   </form>
  // );

  return (
    <form className={formStyles} onSubmit={handleSubmit}>
      <select name="school" className={selectStyles}>
        {schools?.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      <Combobox
        name="course"
        value={selectedCourse}
        onChange={setSelectedCourse}
      >
        <Combobox.Input
          placeholder="Course code"
          className={inputStyles}
          onChange={(e) => setQuery(e.target.value)}
          displayValue={(c: Course) => c?.code}
        />
        <Combobox.Options className={optionStyles}>
          {!filteredCourses.length && query ? (
            <div className="py-2">Nothing found</div>
          ) : (
            filteredCourses.slice(0, 8).map((c) => (
              <Combobox.Option
                className="cursor-pointer py-2 hover:bg-blue-50"
                key={c.code}
                value={c}
              >
                {c.code}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Combobox>
    </form>
  );
};

export default SearchCoursesInput;
