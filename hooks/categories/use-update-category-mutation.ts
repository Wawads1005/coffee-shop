"use client";

import { updateCategory } from "@/actions/categories/update-category";
import {
  UpdateCategoryDataSchema,
  UpdateCategoryParamsSchema,
} from "@/validators/categories/update-category";
import { useMutation } from "@tanstack/react-query";

function useUpdateCategoryMutation() {
  const updateCategoryMutation = useMutation({
    mutationFn: async (props: {
      params: UpdateCategoryParamsSchema;
      data: UpdateCategoryDataSchema;
    }) => updateCategory(props.params, props.data),
  });

  return updateCategoryMutation;
}

export { useUpdateCategoryMutation };
