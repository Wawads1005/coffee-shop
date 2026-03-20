"use client";

import { deleteProduct } from "@/actions/products/delete-product";
import { useMutation } from "@tanstack/react-query";

function useDeleteProductMutation() {
  const deleteProductMutation = useMutation({ mutationFn: deleteProduct });

  return deleteProductMutation;
}

export { useDeleteProductMutation };
