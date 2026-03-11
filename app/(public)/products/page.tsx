"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { HomeIcon, PackageIcon, PackageOpenIcon } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { ProductSearchForm } from "@/components/products/product-search-form";
import { usePathname, useRouter } from "next/navigation";
import { useProductsQuery } from "@/hooks/products/use-products-query";

interface ProductsPageSearchParams {
  category?: string;
  search?: string;
}

interface ProductsPageProps {
  searchParams: Promise<ProductsPageSearchParams>;
}

function ProductsPage(props: ProductsPageProps) {
  const searchParams = React.use(props.searchParams);
  const pathname = usePathname();
  const router = useRouter();

  const productsQuery = useProductsQuery({ filter: searchParams });
  const products = productsQuery.data ? productsQuery.data.products : [];

  return (
    <div className="container mx-auto w-full max-w-360 space-y-4 p-4 md:space-y-8 md:p-8">
      <div className="flex items-center justify-between gap-4 md:gap-8">
        <ProductSearchForm
          onSubmit={(value) => {
            const urlSearchParams = new URLSearchParams({ ...searchParams });

            if (value.search.length <= 0) {
              urlSearchParams.delete("search");
            } else {
              urlSearchParams.set("search", value.search);
            }

            router.push(`${pathname}?${urlSearchParams.toString()}`);
          }}
          className="ml-auto max-w-sm flex-1"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {products.length < 0 ? (
          <div className="col-span-full">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <PackageOpenIcon />
                </EmptyMedia>
                <EmptyTitle>No products found.</EmptyTitle>
                <EmptyDescription>
                  Products doesn't exists in our database, please enter a valid
                  url.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <ButtonGroup>
                  <Button
                    nativeButton={false}
                    render={
                      <Link href="/products">
                        <PackageIcon />
                        <span>Browse</span>
                      </Link>
                    }
                  />
                  <Button
                    variant="outline"
                    nativeButton={false}
                    render={
                      <Link href="/">
                        <HomeIcon />
                        <span>Home</span>
                      </Link>
                    }
                  />
                </ButtonGroup>
              </EmptyContent>
            </Empty>
          </div>
        ) : (
          products.map((product) => {
            return (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="size-full"
              >
                <Card className="relative size-full overflow-hidden pt-0 hover:shadow">
                  <div className="aspect-video max-h-52">
                    <img
                      src="/placeholder.svg"
                      className="size-full object-cover object-center"
                      alt={product.name}
                    />
                  </div>
                  <CardHeader className="flex-1">
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                    <CardAction>
                      <Badge variant="ghost">
                        &#8369;{Math.floor(product.priceCents / 100).toFixed(2)}
                      </Badge>
                    </CardAction>
                  </CardHeader>
                </Card>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
