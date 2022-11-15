import { client } from "app/gql/client";
import Table from "./components/Table";

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
