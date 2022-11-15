"use client";

import { useQuery } from "@apollo/client";
import { GET_PROFESSOR_ANALYSIS, GET_SCHOOLS } from "app/gql/queries";
import { use } from "react";
import { Line, Radar } from "react-chartjs-2";

const getProfessorAnalysis = fetch("http://localhost:8080/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  body: JSON.stringify({
    query: GET_PROFESSOR_ANALYSIS,
    variables: {
      professorId: 5,
    },
  }),
}).then((res) => res.json());

const ExpandedTableRowData = ({ professorId }: { professorId: string }) => {
  // const { data, error, loading } = useQuery(GET_SCHOOLS, {

  //   notifyOnNetworkStatusChange: true,
  // });

  // if (loading) return <div>Loading...</div>;

  // if (error) {
  //   return <div>Hello</div>;
  // }

  const data = use(getProfessorAnalysis);

  return (
    <div className="flex flex-col items-center justify-around gap-8 sm:flex-row">
      {JSON.stringify(data)}
      <div className="grid h-64 w-64 place-items-center">
        <Radar
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              r: {
                ticks: {
                  display: false,
                },
              },
            },
          }}
          data={{
            labels: [
              "Eating",
              "Drinking",
              "Sleeping",
              "Designing",
              "Coding",
              "Cycling",
              "Running",
            ],
            datasets: [
              {
                data: [65, 59, 90, 81, 56, 55, 40],
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgb(54, 162, 235)",
                pointBackgroundColor: "rgb(54, 162, 235)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgb(54, 162, 235)",
              },
            ],
          }}
        />
      </div>
      <div className="grid h-64 w-96 place-items-center">
        <Line
          data={{
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
            ],
            datasets: [
              {
                label: "Rating Over Time",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default ExpandedTableRowData;
