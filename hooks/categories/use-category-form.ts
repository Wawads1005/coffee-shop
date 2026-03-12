"use client";

import {
  CategoryFormSchema,
  categoryFormSchema,
} from "@/validators/categories/category-form";
import { useForm } from "@tanstack/react-form";

interface UseCategoryFormOptions {
  defaultValues?: CategoryFormSchema;
}

function useCategoryForm({ defaultValues }: UseCategoryFormOptions) {
  const categoryForm = useForm({
    validators: {
      onChange: categoryFormSchema,
      onBlur: categoryFormSchema,
      onSubmit: categoryFormSchema,
    },
    defaultValues: {
      name: defaultValues ? defaultValues.name : "",
      description: defaultValues ? defaultValues.description : "",
      parentId: defaultValues
        ? defaultValues.parentId
          ? defaultValues.parentId
          : null
        : null,
    },
  });

  return categoryForm;
}

export { useCategoryForm };
