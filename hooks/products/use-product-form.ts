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
      onBlur: productFormSchema,
      onSubmit: productFormSchema,
    },
    defaultValues: {
      categoryId: defaultValues ? defaultValues.categoryId : -1,
      name: defaultValues ? defaultValues.name : "",
      description: defaultValues ? defaultValues.description : "",
      price: defaultValues ? defaultValues.price : 0,
      image: defaultValues ? defaultValues.image : "",
    },
  });

  return productForm;
}

export { useProductForm };
