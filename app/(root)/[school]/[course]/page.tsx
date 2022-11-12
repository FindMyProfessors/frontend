import DebouncedInput from "./DebouncedInput";
import Table from "./Table";
import professors from "app/test/professors.json";

export default async function Courses({
  params,
}: {
  params: { school: string; course: string };
}) {
  return (
    <>
      <Table data={professors} />
    </>
  );
}
