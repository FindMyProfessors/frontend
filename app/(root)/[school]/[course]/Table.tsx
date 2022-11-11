"use client";

import React from "react";
import { columns } from "./columns";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
export default function Table({ data }: { data: any }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-12 overflow-auto rounded border">
      <table className="w-full">
        <thead className="bg-black text-left text-xs uppercase text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-8 py-4">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          <tr className="even:bg-gray-100">
            <td className="px-8 py-4">Caleb</td>
            <td className="px-8 py-4">Rivera</td>
            <td className="px-8 py-4">5.00</td>
            <td className="px-8 py-4">5.00</td>
            <td className="px-8 py-4">5.00</td>
            <td className="px-8 py-4">69</td>
          </tr>
          <tr className="even:bg-gray-100">
            <td className="px-8 py-4">Caleb</td>
            <td className="px-8 py-4">Rivera</td>
            <td className="px-8 py-4">5.00</td>
            <td className="px-8 py-4">5.00</td>
            <td className="px-8 py-4">5.00</td>
            <td className="px-8 py-4">69</td>
          </tr>
          <tr className="even:bg-gray-100">
            <td className="px-8 py-4">Caleb</td>
            <td className="px-8 py-4">Rivera</td>
            <td className="px-8 py-4">5.00</td>
            <td className="px-8 py-4">5.00</td>
            <td className="px-8 py-4">5.00</td>
            <td className="px-8 py-4">69</td>
          </tr>
          <tr className="even:bg-gray-100">
            <td className="px-8 py-4">Caleb</td>
            <td className="px-8 py-4">Rivera</td>
            <td className="px-8 py-4">5.00</td>
            <td className="px-8 py-4">5.00</td>
            <td className="px-8 py-4">5.00</td>
            <td className="px-8 py-4">69</td>
          </tr>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-black text-left text-xs uppercase text-white">
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} className="px-8 py-4">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
