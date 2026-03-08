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
    },
  });

  return categoryForm;
}

export { useCategoryForm };
