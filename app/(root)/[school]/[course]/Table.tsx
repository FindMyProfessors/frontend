"use client";
import "chart.js/auto";
import React, { Fragment } from "react";
import { columns } from "./columns";
import { useState } from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import {
  useReactTable,
  getCoreRowModel,
  SortingState,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
  ExpandedState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Line, Radar } from "react-chartjs-2";
import DebouncedInput from "./DebouncedInput";

export default function Table({ data }: { data: any[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      expanded,
      globalFilter,
    },
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <DebouncedInput
        className="mt-20 mb-2 rounded border px-4 py-2 outline-none ring-blue-500 focus:z-10 focus:ring-2"
        value={globalFilter}
        onChange={(value) => setGlobalFilter(value)}
        placeholder="Search by all columns"
      />
      <div className="overflow-auto rounded border">
        <table className="w-full table-fixed">
          <thead className="bg-black text-left text-xs uppercase text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    className={`h-12 items-center px-8 ${
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    }`}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ChevronUpIcon className="h-6 w-6" />,
                          desc: <ChevronDownIcon className="h-6 w-6" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <tr
                  onClick={() => row.toggleExpanded()}
                  className="cursor-pointer border-b last:border-b-0 "
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-8 py-4">
                      <div>{row.getIsExpanded()}</div>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() ? (
                  <tr className="border-b last:border-b-0">
                    <td className="flex gap-6 p-6" colSpan={columns.length}>
                      <div className="h-64 w-64">
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
                      <div className="grid place-items-center">
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
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            ))}
          </tbody>
          <tfoot className="bg-black text-left text-xs uppercase text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    className={`h-12 items-center px-8 ${
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    }`}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ChevronUpIcon className="h-6 w-6" />,
                          desc: <ChevronDownIcon className="h-6 w-6" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="flex gap-2">
          <button
            className="rounded bg-black p-1 text-white"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronDoubleLeftIcon className="h-6 w-6" />
          </button>
          <button
            className="rounded bg-black p-1 text-white"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            className="rounded bg-black p-1 text-white"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
          <button
            className="rounded bg-black p-1 text-white"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronDoubleRightIcon className="h-6 w-6" />
          </button>
        </div>
        <div>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center gap-2">
          Go to page
          <input
            type="number"
            min={1}
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="h-9 w-16 rounded border px-3 outline-none ring-blue-500 focus:z-10 focus:ring-2"
          />
        </div>
        <select
          className="h-9 rounded px-3 outline-none ring-blue-500 focus:z-10 focus:ring-2"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
