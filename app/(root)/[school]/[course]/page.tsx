import { client } from "app/gql/client";
import { GET_PROFESSORS } from "app/gql/queries";
import Table from "./components/Table";

export default async function Courses({
  params,
}: {
  params: { school: string; course: string };
}) {
  const {} = await client.query({ query: GET_PROFESSORS, variables:{} });

  return (
    <>
      <Table data={[]} />
    </>
  );
}
