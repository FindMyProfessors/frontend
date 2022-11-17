"use client";

import { Combobox } from "@headlessui/react";
import { Course } from "app/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const SearchCoursesInput = ({
  schools,
  courses,
  formStyles,
  selectStyles,
  inputStyles,
  optionStyles,
}: {
  schools: { id: number; name: string }[];
  courses: Course[];
  formStyles: string;
  selectStyles: string;
  inputStyles: string;
  optionStyles: string;
}) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedSchool, setSelectedSchool] = useState(
    schools[0].id.toString()
  );
  const [query, setQuery] = useState("");

  const filteredCourses =
    query === ""
      ? courses
      : courses.filter((c) =>
          c.code.toLowerCase().includes(query.toLowerCase())
        );

  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(selectedCourse);
    console.log(selectedSchool);

    // const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));

    if (courses.find((c) => c.id === selectedCourse?.id)) {
      router.push(`/${selectedSchool}/${selectedCourse?.id}`);
      return;
    }

    router.push(`/${selectedSchool}?=${selectedCourse?.name ?? ""}`);

    // console.log(data["course[code]"]);
    // if (courseCodes.includes((data["course[code]"] as string).toLowerCase())) {
    //   router.push(`/${data.school}/${data["course[id]"]}`);
    //   return;
    // }

    // router.push(
    //   `/${data.school}?q=${(data["course[code]"] as string).toLowerCase()}`
    // );
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
      <select
        value={selectedSchool}
        onChange={(e) => setSelectedSchool(e.target.value)}
        name="school"
        className={selectStyles}
      >
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
          {!filteredCourses.length && query
            ? query.length > 0 && (
                <Combobox.Option
                  className="cursor-pointer py-2 hover:bg-blue-50"
                  value={{ id: null, name: query }}
                >
                  Create &#34;{query}&#34;
                </Combobox.Option>
              )
            : filteredCourses.slice(0, 5).map((c) => (
                <Combobox.Option
                  // className="cursor-pointer py-2 hover:bg-blue-50 active:bg-blue-50"
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-blue-50" : null
                    }`
                  }
                  key={c.code}
                  value={c}
                >
                  {c.code}
                </Combobox.Option>
              ))}
        </Combobox.Options>
      </Combobox>
    </form>
  );
};

export default SearchCoursesInput;
