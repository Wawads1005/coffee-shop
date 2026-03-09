"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ProductSearchFormSchema } from "@/validators/products/product-search-form";
import { useProductSearchForm } from "@/hooks/products/use-product-search-form";

import { SearchIcon } from "lucide-react";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

interface ProductSearchFormProps extends Omit<
  React.ComponentProps<"form">,
  "onSubmit"
> {
  onSubmit?: (values: ProductSearchFormSchema) => void;
  defaultValues?: ProductSearchFormSchema;
}

function ProductSearchForm({
  onSubmit,
  defaultValues,
  className,
  ...props
}: ProductSearchFormProps) {
  const productSearchForm = useProductSearchForm({ defaultValues });

  return (
    <form
      className={cn("", className)}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(productSearchForm.state.values);
      }}
      {...props}
    >
      <FieldGroup>
        <productSearchForm.Field
          name="search"
          children={(field) => {
            return (
              <Field>
                <InputGroup className="max-w-sm">
                  <InputGroupInput
                    placeholder="Type to search..."
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.currentTarget.value)}
                    onBlur={() => field.handleBlur()}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton variant="secondary" type="submit">
                      <SearchIcon />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            );
          }}
        />
      </FieldGroup>
    </form>
  );
}

export { ProductSearchForm };
