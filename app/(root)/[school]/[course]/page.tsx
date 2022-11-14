import DebouncedInput from "./components/DebouncedInput";
import Table from "./components/Table";
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
