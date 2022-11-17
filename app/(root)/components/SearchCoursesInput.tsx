"use client";

import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
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
  buttonStyles,
  iconStyles,
}: {
  schools: { id: number; name: string }[];
  courses: Course[];
  formStyles: string;
  selectStyles: string;
  inputStyles: string;
  optionStyles: string;
  buttonStyles: string;
  iconStyles: string;
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

    if (courses.find((c) => c.id === selectedCourse?.id)) {
      router.push(`/${selectedSchool}/${selectedCourse?.id}`);
      return;
    }

    router.push(`/${selectedSchool}?q=${selectedCourse?.name ?? ""}`);
  };

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
          <Combobox.Option
            className={({ active }) =>
              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                active ? "bg-blue-50" : null
              }`
            }
            value={{ id: null, name: query, code: query }}
          >
            Search &#34;{query}&#34;
          </Combobox.Option>
          {filteredCourses.slice(0, 5).map((c) => (
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
      <button className={buttonStyles}>
        <MagnifyingGlassIcon className={iconStyles} />
      </button>
    </form>
  );
};

export default SearchCoursesInput;
