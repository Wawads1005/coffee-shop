"use client";

import * as React from "react";
import { CellContext, ColumnDef, HeaderContext } from "@tanstack/react-table";
import { Product } from "@/drizzle/schemas";
import { useCategoryQuery } from "@/hooks/categories/use-category-query";

import {
  CircleAlertIcon,
  CircleCheckIcon,
  EditIcon,
  EllipsisIcon,
  TrashIcon,
} from "lucide-react";
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
import { useUpdateProductMutation } from "@/hooks/products/use-update-product-mutation";
import { slugify } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

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
    cell: ProductRowCategory,
  },
  {
    id: "price",
    accessorKey: "priceCents",
    header: DataTableColumnSorter,
    cell: ProductRowPrice,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "createdAt",
    header: DataTableColumnSorter,
    cell: ProductRowDate,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "updatedAt",
    header: DataTableColumnSorter,
    cell: ProductRowDate,
    enableGlobalFilter: false,
  },
  {
    id: "actions",
    header: ProductColumnAction,
    cell: ProductRowAction,
    enableHiding: false,
    enableGlobalFilter: false,
  },
];

interface ProductRowCategoryProps extends CellContext<Product, string> {}

function ProductRowCategory({ getValue }: ProductRowCategoryProps) {
  const categoryId = getValue();
  const categoryQuery = useCategoryQuery({ id: categoryId });
  const category = categoryQuery.data ? categoryQuery.data.category : null;

  if (!category) {
    return null;
  }

  return <span>{category.name}</span>;
}

interface ProductRowPriceProps extends CellContext<Product, number> {}

function ProductRowPrice({ getValue }: ProductRowPriceProps) {
  const priceCents = getValue();
  const price = Math.floor(priceCents / 100);

  return <span>&#8369;{price.toFixed(2)}</span>;
}

interface ProductRowDateProps extends CellContext<Product, Date> {}

function ProductRowDate({ getValue }: ProductRowDateProps) {
  const date = getValue();
  const dateFormatter = new Intl.DateTimeFormat("en");

  return <span>{dateFormatter.format(date)}</span>;
}

interface ProductColumnActionProps extends HeaderContext<Product, unknown> {}

function ProductColumnAction({ table }: ProductColumnActionProps) {
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const { rowSelection } = table.getState();

  const selectedRowIds = Object.keys(rowSelection);

  return (
    <React.Fragment>
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

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
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
    </React.Fragment>
  );
}

interface ProductRowActionProps extends CellContext<Product, unknown> {}

function ProductRowAction({ row }: ProductRowActionProps) {
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const updateProductMutation = useUpdateProductMutation();

  return (
    <React.Fragment>
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

            <DropdownMenuItem
              onClick={(event) => {
                event.preventBaseUIHandler();
                setIsDropdownOpen(false);
                setIsSheetOpen(true);
              }}
            >
              <EditIcon />
              <span>Edit</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              variant="destructive"
              onClick={(event) => {
                event.preventBaseUIHandler();
                setIsDropdownOpen(false);
                setIsAlertOpen(true);
              }}
            >
              <TrashIcon />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit product</SheetTitle>
            <SheetDescription>
              Update the product details below.
            </SheetDescription>
          </SheetHeader>
          <div className="px-4">
            <ProductForm
              onSubmit={(values, form) => {
                updateProductMutation.mutate(
                  {
                    params: { id: row.original.id },
                    data: { ...values, slug: slugify(values.name) },
                  },
                  { onSuccess: () => form.reset() },
                );
              }}
              defaultValues={row.original}
            >
              {(updateProductMutation.isError ||
                updateProductMutation.isSuccess) && (
                <Alert
                  variant={
                    updateProductMutation.isError ? "destructive" : "success"
                  }
                >
                  {updateProductMutation.isError ? (
                    <CircleAlertIcon />
                  ) : (
                    <CircleCheckIcon />
                  )}
                  <AlertTitle>
                    {updateProductMutation.isError
                      ? "Uh-oh, something went wrong!"
                      : "Yehey, congrats"}
                  </AlertTitle>
                  <AlertDescription>
                    {updateProductMutation.isError
                      ? updateProductMutation.error.message
                      : updateProductMutation.data.message}
                  </AlertDescription>
                </Alert>
              )}
            </ProductForm>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Clicking continue will delete the
              selected product.
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
    </React.Fragment>
  );
}

export { productColumns };
