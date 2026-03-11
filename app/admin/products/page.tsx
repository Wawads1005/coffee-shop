"use client";

import * as React from "react";
import { productColumns } from "@/components/products/product-columns";
import {
  DataTable,
  DataTablePagination,
  DataTableViewOptions,
} from "@/components/ui/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { ProductSearchForm } from "@/components/products/product-search-form";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductForm } from "@/components/products/product-form";
import { useProductsQuery } from "@/hooks/products/use-products-query";
import { usePathname, useRouter } from "next/navigation";

interface ProductsPageSearchParams {
  search?: string;
}

interface ProductsPageProps {
  searchParams: Promise<ProductsPageSearchParams>;
}

function ProductsPage({ ...props }: ProductsPageProps) {
  const pathname = usePathname();
  const searchParams = React.use(props.searchParams);
  const router = useRouter();

  const productsQuery = useProductsQuery({
    filter: {
      search: searchParams.search,
    },
  });

  const products = React.useMemo(
    () =>
      productsQuery.data
        ? productsQuery.data.pages.flatMap((page) => page.products)
        : [],
    [productsQuery.data],
  );

  const productsTable = useDataTable({
    data: products,
    columns: productColumns,
  });

  return (
    <div className="container mx-auto w-full max-w-360 space-y-4 px-4 py-4 sm:px-8 md:space-y-8 md:px-16 md:py-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">
            Content Management for Products
          </h1>
          <p className="text-muted-foreground">
            Manage your products by creating, updating, or deleting a category.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <ProductSearchForm
          className="flex-1"
          defaultValues={{ search: searchParams.search ?? "" }}
          onSubmit={(values) => {
            const urlSearchParams = new URLSearchParams({
              ...searchParams,
              search: values.search,
            });

            router.push(`${pathname}?${urlSearchParams.toString()}`);
          }}
        />
        <div className="flex items-center justify-center gap-2">
          <Sheet>
            <SheetTrigger
              render={
                <Button size="icon">
                  <PlusCircleIcon />
                </Button>
              }
            />
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Create a new product</SheetTitle>
                <SheetDescription>
                  Fill up the form below, and click continue to create a new
                  product.
                </SheetDescription>
              </SheetHeader>
              <div className="px-4">
                <ProductForm />
              </div>
            </SheetContent>
          </Sheet>
          <DataTableViewOptions table={productsTable} />
        </div>
      </div>
      <DataTable table={productsTable} />
      <DataTablePagination table={productsTable} />
    </div>
  );
}

export default ProductsPage;
