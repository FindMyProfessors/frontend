import { createColumnHelper } from "@tanstack/react-table";
import { Professor } from "app/types";

const columnHelper = createColumnHelper<Professor>();

export const columns = [
  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: "Full Name",
  }),
  columnHelper.accessor((row) => row.rating?.averageGrade, {
    id: "Average Grade",
  }),
  columnHelper.accessor((row) => row.rating?.totalQualityAverage, {
    id: "Average Quality",
  }),
  columnHelper.accessor((row) => row.rating?.totalDifficultyAverage, {
    id: "Average Difficulty",
  }),
  columnHelper.accessor((row) => row.rating?.ratingAmount, {
    id: "Ratings Count",
  }),
  columnHelper.accessor((row) => row.rating?.topKMostRecentDifficultyAverage, {
    id: "Recent Difficulty Average",
  }),
  columnHelper.accessor((row) => row.rating?.topKMostRecentQualityAverage, {
    id: "Recent Quality Average",
  }),
];
