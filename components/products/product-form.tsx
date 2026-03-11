"use client";

import * as React from "react";
import { useProductForm } from "@/hooks/products/use-product-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ProductFormSchema } from "@/validators/products/product-form";
import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { useCategoriesQuery } from "@/hooks/categories/use-categories-query";

interface ProductFormProps extends Omit<
  React.ComponentProps<"form">,
  "onSubmit"
> {
  defaultValues?: ProductFormSchema;
  onSubmit?: (values: ProductFormSchema) => void;
}

function ProductForm({
  onSubmit,
  defaultValues,
  children,
  className,
  ...props
}: ProductFormProps) {
  const categoriesQuery = useCategoriesQuery();
  const categories = React.useMemo(
    () => (categoriesQuery.data ? categoriesQuery.data.categories : []),
    [categoriesQuery.data],
  );
  const productForm = useProductForm({ defaultValues });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(productForm.state.values);
      }}
      className={cn("grid gap-2", className)}
      {...props}
    >
      <FieldGroup>
        <productForm.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} className="capitalize">
                  {field.name}
                </FieldLabel>
                <Input
                  name={field.name}
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.currentTarget.value)}
                  onBlur={() => field.handleBlur()}
                  placeholder="Espresso"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <productForm.Field
          name="description"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldLabel htmlFor={field.name} className="capitalize">
                  {field.name}
                </FieldLabel>
                <Textarea
                  name={field.name}
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.currentTarget.value)}
                  onBlur={() => field.handleBlur()}
                  placeholder="Rich and concentrated shot of espresso"
                  className="h-24"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <div className="grid grid-cols-2 gap-4">
          <productForm.Field
            name="priceCents"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field>
                  <FieldLabel htmlFor={field.name} className="capitalize">
                    {field.name}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <InputGroupText>&#8369;</InputGroupText>
                    </InputGroupAddon>
                    <InputGroupInput
                      name={field.name}
                      id={field.name}
                      type="number"
                      min={0}
                      value={field.state.value / 100}
                      onChange={(e) => {
                        const price = parseFloat(e.currentTarget.value) * 100;

                        field.handleChange(price);
                      }}
                      onBlur={() => field.handleBlur()}
                    />
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <productForm.Field
            name="categoryId"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              const items = categories.map((category) => ({
                value: category.id,
                label: category.name,
              }));

              return (
                <Field>
                  <FieldLabel htmlFor={field.name} className="capitalize">
                    Category
                  </FieldLabel>
                  <Select items={items} defaultValue={field.state.value}>
                    <SelectTrigger id={field.name} name={field.name}>
                      <SelectValue placeholder="Select a category..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {categories.map((category) => {
                          return (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </div>
        <productForm.Field
          name="image"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field>
                <FieldLabel htmlFor={field.name} className="capitalize">
                  {field.name}
                </FieldLabel>
                <Input type="file" />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <productForm.Subscribe
          selector={({ canSubmit }) => ({ canSubmit })}
          children={({ canSubmit }) => {
            return (
              <Button type="submit" disabled={!canSubmit}>
                Continue
              </Button>
            );
          }}
        />
      </FieldGroup>
    </form>
  );
}

export { ProductForm };
