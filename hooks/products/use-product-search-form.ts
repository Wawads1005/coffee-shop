"use client";

import {
  ProductSearchFormSchema,
  productSearchFormSchema,
} from "@/validators/products/product-search-form";
import { useForm } from "@tanstack/react-form";

interface UseProductSearchFormProps {
  defaultValues?: ProductSearchFormSchema;
}

function useProductSearchForm({ defaultValues }: UseProductSearchFormProps) {
  const productSearchForm = useForm({
    validators: {
      onChange: productSearchFormSchema,
      onBlur: productSearchFormSchema,
      onSubmit: productSearchFormSchema,
    },
    defaultValues: {
      search: defaultValues ? defaultValues.search : "",
    },
  });

  return productSearchForm;
}

export { useProductSearchForm };
