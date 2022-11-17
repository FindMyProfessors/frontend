import SetTitle from "app/(root)/components/SetTitle";
import { client } from "app/gql/client";
import { GET_PROFESSORS } from "app/gql/queries";
import { Professor } from "app/types";
import Table from "./components/Table";

export default async function Courses({
  params,
}: {
  params: { school: string; course: string };
}) {
  const { data, error } = await client.query({
    query: GET_PROFESSORS,
    variables: {
      courseId: params.course,
      termInput: {
        year: 2023,
        semester: "SPRING",
      },
      professorAmount: 50,
    },
  });

  if (error) return <div>An error has occured</div>;

  const professors = data.course.taughtBy?.professors.filter(
    (p: Professor) => p.firstName != "Not"
  );

  return (
    <>
      <SetTitle title="Professors" />
      <Table data={professors} />
    </>
  );
}
