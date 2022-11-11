import Table from "./Table";

export default async function Courses({
  params,
}: {
  params: { school: string; course: string };
}) {
  return (
    <>
      <Table data={[]} />
    </>
  );
}
