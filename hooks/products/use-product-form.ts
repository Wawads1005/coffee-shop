"use client";

import {
  ProductFormSchema,
  productFormSchema,
} from "@/validators/products/product-form";
import { useForm } from "@tanstack/react-form";

interface UseProductFormProps {
  defaultValues?: ProductFormSchema;
}

function useProductForm(props?: UseProductFormProps) {
  const productForm = useForm({
    validators: {
      onChange: productFormSchema,
      onBlur: productFormSchema,
      onSubmit: productFormSchema,
    },
    defaultValues: {
      categoryId: props?.defaultValues ? props?.defaultValues.categoryId : "",
      name: props?.defaultValues ? props?.defaultValues.name : "",
      description: props?.defaultValues ? props?.defaultValues.description : "",
      priceCents: props?.defaultValues ? props?.defaultValues.priceCents : 0,
      image: props?.defaultValues ? props?.defaultValues.image : "",
    },
  });

  return productForm;
}

export { useProductForm };
