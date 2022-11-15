import { ApolloClient, ApolloProvider } from "@apollo/client";
import { client } from "app/gql/client";
import { GET_PROFESSORS } from "app/gql/queries";
import Table from "./components/Table";

export default async function Courses({
  params,
}: {
  params: { school: string; course: string };
}) {
  const { data } = await client.query({
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

  const professors = data.course.taughtBy.professors;
  return (
    <>
      <Table data={professors} />
    </>
  );
}
