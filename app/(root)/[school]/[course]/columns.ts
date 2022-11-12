import { createColumnHelper } from "@tanstack/react-table";
import { Professor } from "app/test/types";

const columnHelper = createColumnHelper<Professor>();

export const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    header: "First Name",
    footer: "First Name",
  }),
  columnHelper.accessor("lastName", {
    cell: (info) => info.getValue(),
    header: "Last Name",
    footer: "Last Name",
  }),
];

// export const columns = [
//   columnHelper.accessor("firstName", {
//     cell: (info) => info.getValue(),
//     header: "First Name",
//     footer: "First Name",
//   }),
//   columnHelper.accessor("lastName", {
//     cell: (info) => info.getValue(),
//     header: "Last Name",
//     footer: "Last Name",
//   }),
//   columnHelper.accessor("rating.averageGrade", {
//     cell: (info) => info.getValue(),
//     header: "Average Grade",
//     footer: "Average Grade",
//   }),
//   columnHelper.accessor("rating.totalQualityAverage", {
//     cell: (info) => info.getValue(),
//     header: "Average Quality",
//     footer: "Average Quality",
//   }),
//   columnHelper.accessor("rating.totalDifficultyAverage", {
//     cell: (info) => info.getValue(),
//     header: "Average Difficulty",
//     footer: "Average Difficulty",
//   }),
//   columnHelper.accessor("rating.ratingAmount", {
//     cell: (info) => info.getValue(),
//     header: "# of Ratings",
//     footer: "# of Ratings",
//   }),
// ];
