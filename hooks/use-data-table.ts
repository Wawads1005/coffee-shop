"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  RowSelectionState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

interface Data {
  id: string;
}

interface UseDataTableProps<TData extends Data> {
  data: TData[];
  columns: ColumnDef<TData>[];
}

function useDataTable<TData extends Data>({
  data,
  columns,
}: UseDataTableProps<TData>) {
  "use memo";
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      createdAt: false,
      updatedAt: false,
    });

  const productsTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: (row) => row.id,
    state: {
      rowSelection,
      columnFilters,
      columnVisibility,
    },
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
  });

  return productsTable;
}

export { useDataTable };
