"use client";

import "chart.js/auto";
import { Line, Radar } from "react-chartjs-2";
import { Maybe, ProfessorAnalysis } from "app/types";
import { capitalizeWord } from "../utils/functions";

const ExpandedTableRowData = ({
  professorAnalysis,
}: {
  professorAnalysis?: Maybe<ProfessorAnalysis>;
}) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


  if (
    !professorAnalysis ||
    (!professorAnalysis.averageRatingValues?.length &&
      !professorAnalysis.tagAmount?.length)
  )
    return (
      <div className="text-center">
        There are no RMP reviews for this professor
      </div>
    );

  const toTitleCase = (str: string) => {
    return str
      .split("_")
      .map((s) => {
        const prepositions = ["OF", "TO", "BY"];
        if (prepositions.includes(s)) return s.toLowerCase();
        return capitalizeWord(s);
      })
      .join(" ");
  };

  const tagLabels = professorAnalysis?.tagAmount
    .sort((a, b) => a.amount - b.amount)
    .map((t) => toTitleCase(t.tag));

  const tagData = professorAnalysis?.tagAmount
    .sort((a, b) => a.amount - b.amount)
    .map((t) => t.amount);

  const ratingDates = professorAnalysis?.averageRatingValues
    ?.sort(
      (a, b) =>
        new Date(a.year, months.indexOf(a.month)).getMilliseconds() -
        new Date(b.year, months.indexOf(b.month)).getMilliseconds()
    )
    .map((r) => `'${r.year.toString().slice(-2)} ${r.month.slice(0, 3)}`);

  const ratingData = professorAnalysis?.averageRatingValues
    ?.sort(
      (a, b) =>
        new Date(a.year, months.indexOf(a.month)).getMilliseconds() -
        new Date(b.year, months.indexOf(b.month)).getMilliseconds()
    )
    .map((r) => r.value);

  return (
    <div className="flex flex-col items-center justify-center gap-8 sm:flex-row">
      <div>
        {professorAnalysis?.tagAmount?.length ? (
          <Radar
            width={400}
            height={300}
            options={{
              maintainAspectRatio: false,
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
                  min: 0,
                },
              },
            }}
            data={{
              labels: tagLabels.slice(0, 8),
              datasets: [
                {
                  data: tagData.slice(0, 8),
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
        ) : null}
      </div>
      <div>
        {professorAnalysis.averageRatingValues?.length ? (
          <Line
            width={400}
            height={300}
            data={{
              labels: ratingDates,
              datasets: [
                {
                  yAxisID: "y",
                  label: "Rating Over Time",
                  data: ratingData,
                  fill: false,
                  borderColor: "rgb(75, 192, 192)",
                  tension: 0.1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  grace: "5%",
                },
              },
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ExpandedTableRowData;
