"use client";

import { createCategory } from "@/actions/categories/create-category";
import { useMutation } from "@tanstack/react-query";

function useCreateCategoryMutation() {
  const createCategoryMutation = useMutation({ mutationFn: createCategory });

  return createCategoryMutation;
}

export { useCreateCategoryMutation };
