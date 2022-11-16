import { createColumnHelper } from "@tanstack/react-table";
import { Professor } from "app/types";
import { capitalizeWord } from "./functions";

const columnHelper = createColumnHelper<Professor>();

export const columns = [
  columnHelper.accessor(
    (row) => `${capitalizeWord(row.firstName)} ${capitalizeWord(row.lastName)}`,
    {
      id: "Full Name",
    }
  ),
  columnHelper.accessor(
    (row) =>
      row.rating?.averageGrade.replace("_MINUS", "-").replace("_PLUS", "+") ??
      "N/A",
    {
      id: "Average Grade",
    }
  ),
  columnHelper.accessor(
    (row) => row.rating?.totalQualityAverage?.toFixed(2) ?? "N/A",
    {
      id: "Average Quality",
    }
  ),
  columnHelper.accessor(
    (row) => row.rating?.totalDifficultyAverage?.toFixed(2) ?? "N/A",
    {
      id: "Average Difficulty",
    }
  ),
  columnHelper.accessor(
    (row) => row.rating?.topKMostRecentQualityAverage?.toFixed(2) ?? "N/A",
    {
      id: "Recent Quality Average",
    }
  ),
  columnHelper.accessor(
    (row) => row.rating?.topKMostRecentDifficultyAverage?.toFixed(2) ?? "N/A",
    {
      id: "Recent Difficulty Average",
    }
  ),
  columnHelper.accessor((row) => row.rating?.ratingAmount ?? "N/A", {
    id: "Ratings Count",
  }),
];
