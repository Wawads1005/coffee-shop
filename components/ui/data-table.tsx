"use client";

import * as React from "react";
import {
  CellContext,
  flexRender,
  HeaderContext,
  PaginationState,
  Table as ReactTable,
} from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon, FilterIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DATA_TABLE_MAXIMUM_PAGE = 5;

interface DataTableProps<TData> {
  table: ReactTable<TData>;
}

function DataTable<TData>({ table }: DataTableProps<TData>) {
  const { getRowModel, getHeaderGroups } = table;

  const headerGroups = getHeaderGroups();
  const rowModel = getRowModel();

  return (
    <Table>
      <TableHeader>
        {headerGroups.map((headerGroup) => {
          return (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const context = header.getContext();
                const template = header.column.columnDef.header;

                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(template, context)}
                  </TableHead>
                );
              })}
            </TableRow>
          );
        })}
      </TableHeader>
      <TableBody>
        {rowModel.rows.length ? (
          rowModel.rows.map((row) => {
            const visibleCells = row.getVisibleCells();
            const isSelected = row.getIsSelected();

            return (
              <TableRow key={row.id} data-state={isSelected && "selected"}>
                {visibleCells.map((cell) => {
                  const context = cell.getContext();
                  const template = cell.column.columnDef.cell;

                  return (
                    <TableCell key={cell.id}>
                      {flexRender(template, context)}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell
              colSpan={
                headerGroups.flatMap((headerGroup) => headerGroup.headers)
                  .length
              }
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

interface DataTableColumnSorterProps<TData> extends HeaderContext<
  TData,
  unknown
> {}

function DataTableColumnSorter<TData>({
  column,
}: DataTableColumnSorterProps<TData>) {
  return (
    <Button
      variant="ghost"
      role="button"
      onClick={column.getToggleSortingHandler()}
      className="w-full justify-between"
    >
      <span className="capitalize">{column.id}</span>
      {column.getIsSorted() === "asc" ? (
        <ChevronUpIcon />
      ) : column.getIsSorted() === "desc" ? (
        <ChevronDownIcon />
      ) : null}
    </Button>
  );
}

interface DataTableColumnSelectorProps<TData> extends HeaderContext<
  TData,
  unknown
> {}

function DataTableColumnSelector<TData>({
  table,
}: DataTableColumnSelectorProps<TData>) {
  return (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      indeterminate={table.getIsSomePageRowsSelected()}
      onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked)}
    />
  );
}
interface DataTableRowSelectorProps<TData> extends CellContext<
  TData,
  unknown
> {}

function DataTableRowSelector<TData>({
  row,
}: DataTableRowSelectorProps<TData>) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(checked) => row.toggleSelected(!!checked)}
    />
  );
}

function getPages(
  pageCount: number,
  pagination: PaginationState,
  maxPage = DATA_TABLE_MAXIMUM_PAGE,
) {
  const windowSize = Math.min(maxPage, pageCount);

  const middlePage = Math.floor(windowSize / 2);
  const startPage = Math.min(
    pageCount - windowSize,
    Math.max(0, pagination.pageIndex - middlePage),
  );

  const pages = Array.from({ length: windowSize }, (_, i) => i + startPage);

  return pages;
}

interface DataTablePaginationProps<TData> {
  table: ReactTable<TData>;
  pageCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: (pagination: PaginationState) => void;
}

function DataTablePagination<TData>({
  table,
  pagination = { pageIndex: 0, pageSize: 10 },
  pageCount = 5,
  onPaginationChange,
}: DataTablePaginationProps<TData>) {
  const pages = React.useMemo(
    () => getPages(pageCount, pagination),
    [pageCount, pagination],
  );
  const pageSizes = React.useMemo(() => [5, 10, 15, 20, 25], []);

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="text-muted-foreground text-sm">
        Selected {Object.keys(table.getState().rowSelection).length} out of{" "}
        {pageCount * pagination.pageSize} items.
      </div>
      <Pagination className="mr-0 w-auto sm:mx-auto sm:w-full">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious className="aria-disabled:bg-muted aria-disabled:text-muted-foreground cursor-pointer aria-disabled:cursor-not-allowed" />
          </PaginationItem>
          {pages.map((page) => {
            const isActive = pagination.pageIndex === page;

            return (
              <PaginationItem key={page} className="hidden sm:block">
                <PaginationLink
                  isActive={isActive}
                  onClick={() => {
                    onPaginationChange?.({ ...pagination, pageIndex: page });
                  }}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationNext className="aria-disabled:bg-muted aria-disabled:text-muted-foreground cursor-pointer aria-disabled:cursor-not-allowed" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Select
        value={pagination.pageSize}
        onValueChange={(pageSize) =>
          pageSize && onPaginationChange?.({ ...pagination, pageSize })
        }
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger>
          <SelectGroup>
            <SelectLabel>Page Size</SelectLabel>
            {pageSizes.map((pageSize) => {
              return (
                <SelectItem key={pageSize} value={pageSize}>
                  {pageSize}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

interface DataTableViewOptionsProps<TData> {
  table: ReactTable<TData>;
}

function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button size="icon" variant="outline">
            <FilterIcon />
          </Button>
        }
      />
      <DropdownMenuContent className="min-w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(checked) =>
                    column.toggleVisibility(checked)
                  }
                  className="capitalize"
                >
                  <span>{column.id}</span>
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export {
  DataTable,
  DataTableColumnSorter,
  DataTableColumnSelector,
  DataTableRowSelector,
  DataTablePagination,
  DataTableViewOptions,
};
