"use client";

import * as React from "react";
import Link from "next/link";
import { useProductQuery } from "@/hooks/products/use-product-query";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  HomeIcon,
  PackageIcon,
  PackageOpenIcon,
  ShoppingCartIcon,
} from "lucide-react";

interface ProductPageParams {
  id: string;
}

interface ProductPageProps {
  params: Promise<ProductPageParams>;
}

function ProductPage({ ...props }: ProductPageProps) {
  const params = React.use(props.params);
  const productQuery = useProductQuery(params);
  const product = productQuery.data ? productQuery.data.product : null;

  if (!product) {
    return (
      <div className="container mx-auto mt-16">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PackageOpenIcon />
            </EmptyMedia>
            <EmptyTitle>No product found.</EmptyTitle>
            <EmptyDescription>
              Product doesn't exists in our database, please enter a valid url.
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
    );
  }

  return (
    <div className="container mx-auto grid w-full max-w-360 grid-cols-1 gap-4 p-4 md:grid-cols-2 md:gap-8 md:p-8">
      <div className="relative aspect-video overflow-hidden rounded-md">
        <img
          src="/placeholder.svg"
          alt={product.name}
          className="size-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="space-y-2">
          <div className="text-base font-semibold md:text-lg">
            {product.name}
          </div>
          <div className="text-muted-foreground text-sm md:text-base">
            {product.description}
          </div>
          <div className="font-mono text-lg font-bold">
            &#8369;{Math.floor(product.priceCents / 100).toFixed(2)}
          </div>
          <Button>
            <ShoppingCartIcon />
            <span>Buy Now</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
