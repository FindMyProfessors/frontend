"use client";
import "chart.js/auto";
import { Fragment } from "react";
import { columns } from "../utils/columns";
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

import DebouncedInput from "../components/DebouncedInput";
import ExpandedTableRowData from "./ExpandedTableRowData";
import { ApolloProvider } from "@apollo/client";
import { client } from "app/gql/client";

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
        className="mt-16 rounded border px-4 py-2 outline-none ring-blue-500 focus:z-10 focus:ring-2"
        value={globalFilter}
        onChange={(value) => setGlobalFilter(value)}
        placeholder="Search by all columns"
      />
      <div className="mb-2 mt-4 flex items-center gap-4">
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
          className="h-9 rounded bg-gray-100 px-3 outline-none ring-blue-500 focus:z-10 focus:ring-2"
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
      <div className="mb-20 overflow-auto rounded border shadow">
        <table className="w-full">
          <thead className="bg-black text-left text-xs uppercase text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th className="w-12"></th>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    className={`h-16 items-center px-4 ${
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    }`}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ChevronUpIcon className=" h-6 w-6" />,
                          desc: <ChevronDownIcon className=" h-6 w-6" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-sm">
            {table.getRowModel().rows.map((row, i) => (
              <Fragment key={row.id}>
                <tr
                  onClick={() => row.toggleExpanded()}
                  className={`cursor-pointer ${
                    row.getIsExpanded() ? "border-b-0" : "border-b"
                  } hover:bg-blue-100 ${
                    (i + 1) % 2 == 0 ? "bg-gray-50" : null
                  }`}
                >
                  <td className="w-min px-4 py-4">
                    {row.getIsExpanded() ? (
                      <ChevronDownIcon className="h-4 w-4" />
                    ) : (
                      <ChevronRightIcon className="h-4 w-4 " />
                    )}
                  </td>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-4">
                      <div>{row.getIsExpanded()}</div>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() ? (
                  <tr
                    className={`border-b last:border-b-0 ${
                      (i + 1) % 2 == 0 ? "bg-gray-50" : null
                    }`}
                  >
                    <td className="gap-6 p-6" colSpan={columns.length + 1}>
                      <ApolloProvider client={client}>
                        <ExpandedTableRowData professorId={row.original.id} />
                      </ApolloProvider>
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            ))}
          </tbody>
          <tfoot className="bg-black text-left text-xs uppercase text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                <th className="w-12"></th>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    className={`h-12 items-center px-4 ${
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
    </>
  );
}
