"use client";

import { createProduct } from "@/actions/products/create-product";
import { useMutation } from "@tanstack/react-query";

function useCreateProductMutation() {
  const createProductMutation = useMutation({
    mutationFn: createProduct,
  });

  return createProductMutation;
}

export { useCreateProductMutation };
