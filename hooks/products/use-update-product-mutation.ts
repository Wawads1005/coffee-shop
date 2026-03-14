"use client";

import { updateProduct } from "@/actions/products/update-product";
import {
  UpdateProductDataSchema,
  UpdateProductParamsSchema,
} from "@/validators/products/update-product";
import { useMutation } from "@tanstack/react-query";

function useUpdateProductMutation() {
  const updateProductMutation = useMutation({
    mutationFn: async (props: {
      params: UpdateProductParamsSchema;
      data: UpdateProductDataSchema;
    }) => await updateProduct(props.params, props.data),
  });

  return updateProductMutation;
}

export { useUpdateProductMutation };
