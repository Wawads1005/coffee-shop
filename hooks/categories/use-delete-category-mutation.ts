"use client";

import { deleteCategory } from "@/actions/categories/delete-category";
import { useMutation } from "@tanstack/react-query";

function useDeleteCategoryMutation() {
  const deleteCategoryMutation = useMutation({ mutationFn: deleteCategory });

  return deleteCategoryMutation;
}

export { useDeleteCategoryMutation };
