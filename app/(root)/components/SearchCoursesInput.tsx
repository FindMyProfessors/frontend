"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const SearchCoursesInput = ({
  schools,
  formStyles,
  selectStyles,
  inputStyles,
}: {
  schools?: { id: number; name: string }[];
  formStyles: string;
  selectStyles: string;
  inputStyles: string;
}) => {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { school, course } = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );

    router.push(`/${school}?q=${course.toString().replaceAll(" ", "")}`);
  };

  return (
    <form onSubmit={handleSubmit} className={formStyles}>
      <select name="school" className={selectStyles}>
        <option value="1">UCF</option>
      </select>
      <input
        name="course"
        className={inputStyles}
        placeholder="Course name"
        type="text"
      />
    </form>
  );
};

export default SearchCoursesInput;
