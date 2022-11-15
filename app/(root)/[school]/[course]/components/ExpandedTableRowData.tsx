"use client";

import { Line, Radar } from "react-chartjs-2";
import "chart.js/auto";

const ExpandedTableRowData = ({
  professorAnalysis,
}: {
  professorAnalysis: any;
}) => {
  console.log(professorAnalysis);

  function toTitleCase(str: string) {
    return str.replaceAll("_", " ").replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const tabLabels = professorAnalysis.tagAmount
    .sort((a: any, b: any) => (a.amount < b.amount ? 1 : -1))
    .map((t: any) => toTitleCase(t.tag));

  const tagData = professorAnalysis.tagAmount
    .sort((a: any, b: any) => (a.amount < b.amount ? 1 : -1))
    .map((t: any) => t.amount);

  const ratingDates = professorAnalysis.averageRatingValues
    .sort((a: any, b: any) => (a.year > b.year ? 1 : -1))
    .map((r: any) => `${r.year} ${r.month}`);

  const ratingData = professorAnalysis.averageRatingValues
    .sort((a: any, b: any) => (a.year > b.year ? 1 : -1))
    .map((r: any) => r.value);

  return (
    <div className="flex flex-col items-center justify-around gap-8 sm:flex-row">
      <div>
        <Radar
          width={500}
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
              },
            },
          }}
          data={{
            labels: tabLabels.slice(0, 8),
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
      </div>
      <div>
        <Line
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
                min: 0,
                max: 5,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ExpandedTableRowData;
