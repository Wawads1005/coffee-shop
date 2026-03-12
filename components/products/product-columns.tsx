"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/drizzle/schemas";
import { useCategoryQuery } from "@/hooks/categories/use-category-query";

import { EditIcon, EllipsisIcon, TrashIcon } from "lucide-react";
import {
  DataTableColumnSelector,
  DataTableColumnSorter,
  DataTableRowSelector,
} from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProductForm } from "@/components/products/product-form";

const productColumns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: DataTableColumnSelector,
    cell: DataTableRowSelector,
    enableHiding: false,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "name",
    header: DataTableColumnSorter,
    enableHiding: false,
  },
  { accessorKey: "description", header: "Description" },
  {
    id: "Category",
    header: "Category",
    accessorKey: "categoryId",
    cell: (info) => {
      const categoryId = info.getValue<string>();
      const categoryQuery = useCategoryQuery({ id: categoryId });
      const category = categoryQuery.data ? categoryQuery.data.category : null;

      if (!category) {
        return null;
      }

      return <span>{category.name}</span>;
    },
  },
  {
    id: "price",
    accessorKey: "priceCents",
    header: DataTableColumnSorter,
    cell: (info) => {
      const priceCents = Math.floor(info.getValue<number>() / 100);

      return <span>&#8369;{priceCents.toFixed(2)}</span>;
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "createdAt",
    header: DataTableColumnSorter,
    cell: (info) => {
      const createdAt = info.getValue<Date>();
      const dateFormatter = new Intl.DateTimeFormat("en");

      return <span>{dateFormatter.format(createdAt)}</span>;
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "updatedAt",
    header: DataTableColumnSorter,
    cell: (info) => {
      const createdAt = info.getValue<Date>();
      const dateFormatter = new Intl.DateTimeFormat("en");

      return <span>{dateFormatter.format(createdAt)}</span>;
    },
    enableGlobalFilter: false,
  },
  {
    id: "actions",
    header: (info) => {
      const [isAlertOpen, setIsAlertOpen] = React.useState(false);
      const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
      const { rowSelection } = info.table.getState();

      const selectedRowIds = Object.keys(rowSelection);

      return (
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger
              hidden={selectedRowIds.length <= 0}
              render={
                <Button variant="ghost">
                  <EllipsisIcon />
                </Button>
              }
            />
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsAlertOpen(true);
                  }}
                >
                  <TrashIcon />
                  <span>Delete</span>
                  <Badge variant="destructive" className="ml-auto">
                    {selectedRowIds.length}
                  </Badge>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Clicking continue will delete all
                selected products.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
    cell: (info) => {
      const [isAlertOpen, setIsAlertOpen] = React.useState(false);
      const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
      const [isSheetOpen, setIsSheetOpen] = React.useState(false);

      return (
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost">
                <EllipsisIcon />
              </Button>
            }
          />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Sheet
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                onOpenChangeComplete={(open) =>
                  !open && setIsDropdownOpen(false)
                }
              >
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventBaseUIHandler();
                    setIsSheetOpen(true);
                  }}
                >
                  <EditIcon />
                  <span>Edit</span>
                </DropdownMenuItem>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Create a new product</SheetTitle>
                    <SheetDescription>
                      Fill up the form below, and click continue to create a new
                      product.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="px-4">
                    <ProductForm defaultValues={info.row.original} />
                  </div>
                </SheetContent>
              </Sheet>
              <AlertDialog
                open={isAlertOpen}
                onOpenChange={setIsAlertOpen}
                onOpenChangeComplete={(open) =>
                  !open && setIsDropdownOpen(false)
                }
              >
                <DropdownMenuItem
                  variant="destructive"
                  onClick={(e) => {
                    e.preventBaseUIHandler();
                    setIsAlertOpen(true);
                  }}
                >
                  <TrashIcon />
                  <span>Delete</span>
                </DropdownMenuItem>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. Clicking continue will
                      delete selected product.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive">
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
    enableGlobalFilter: false,
  },
];

export { productColumns };
