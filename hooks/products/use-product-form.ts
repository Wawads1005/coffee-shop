"use client";

import {
  ProductFormSchema,
  productFormSchema,
} from "@/validators/products/product-form";
import { useForm } from "@tanstack/react-form";

interface UseProductFormProps {
  defaultValues?: ProductFormSchema;
}

function useProductForm({ defaultValues }: UseProductFormProps) {
  const productForm = useForm({
    validators: {
      onChange: productFormSchema,
      onSubmit: productFormSchema,
    },
    defaultValues: {
      categoryId: defaultValues ? defaultValues.categoryId : "",
      name: defaultValues ? defaultValues.name : "",
      description: defaultValues ? defaultValues.description : "",
      priceCents: defaultValues ? defaultValues.priceCents : 0,
      image: defaultValues ? defaultValues.image : "",
    },
  });

  return productForm;
}

export { useProductForm };
