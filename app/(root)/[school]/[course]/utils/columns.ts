import { createColumnHelper } from "@tanstack/react-table";
import { Professor } from "app/types";

const columnHelper = createColumnHelper<Professor>();

export const columns = [
  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: "Full Name",
  }),
  columnHelper.accessor("rating.averageGrade", {
    cell: (info) =>
      info.getValue().replace("_PLUS", "+").replace("_MINUS", "-"),
    header: "Average Grade",
    footer: "Average Grade",
  }),
  columnHelper.accessor("rating.totalQualityAverage", {
    cell: (info) => info.getValue().toFixed(2),
    header: "Average Quality",
    footer: "Average Quality",
  }),
  columnHelper.accessor("rating.totalDifficultyAverage", {
    cell: (info) => info.getValue().toFixed(2),
    header: "Average Difficulty",
    footer: "Average Difficulty",
  }),
  columnHelper.accessor("rating.ratingAmount", {
    cell: (info) => info.getValue(),
    header: "# of Ratings",
    footer: "# of Ratings",
  }),
  columnHelper.accessor("rating.topKMostRecentDifficultyAverage", {
    cell: (info) => info.getValue().toFixed(2),
    header: "Recent Difficult Average",
    footer: "Recent Difficult Average",
  }),
  columnHelper.accessor("rating.topKMostRecentQualityAverage", {
    cell: (info) => info.getValue().toFixed(2),
    header: "Recent Quality Average",
    footer: "Recent Quality Average",
  }),
];
