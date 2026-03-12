import * as React from "react";
import { cn } from "@/lib/utils";
import { CategoryFormSchema } from "@/validators/categories/category-form";
import { useCategoryForm } from "@/hooks/categories/use-category-form";
import { useCategoriesQuery } from "@/hooks/categories/use-categories-query";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFormProps extends Omit<
  React.ComponentProps<"form">,
  "onSubmit"
> {
  defaultValues?: CategoryFormSchema;
  onSubmit?: (
    values: CategoryFormSchema,
    form: ReturnType<typeof useCategoryForm>,
  ) => void;
}

function CategoryForm({
  defaultValues,
  onSubmit,
  children,
  className,
  ...props
}: CategoryFormProps) {
  const categoryForm = useCategoryForm({ defaultValues });
  const categoriesQuery = useCategoriesQuery();
  const categories = categoriesQuery.data
    ? categoriesQuery.data.categories
    : [];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        onSubmit?.(categoryForm.state.values, categoryForm);
      }}
      className={cn("grid gap-2", className)}
      {...props}
    >
      <FieldGroup>
        <categoryForm.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Name</FieldLabel>
                <Input
                  name={field.name}
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.currentTarget.value)}
                  onBlur={() => field.handleBlur()}
                  placeholder="Hot Coffee"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <categoryForm.Field
          name="parentId"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            const parents = categories.map((category) => ({
              value: category.id,
              label: category.name,
            }));

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Parent</FieldLabel>
                <Select
                  items={parents}
                  value={field.state.value}
                  onValueChange={(value) =>
                    value !== field.state.value
                      ? field.handleChange(value)
                      : field.handleChange(null)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="(Optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {parents.map((parent) => {
                        return (
                          <SelectItem key={parent.value} value={parent.value}>
                            {parent.label}
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
        <categoryForm.Field
          name="description"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel>Description</FieldLabel>
                <Input
                  name={field.name}
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.currentTarget.value)}
                  onBlur={() => field.handleBlur()}
                  placeholder="Hot Coffee"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        {children && <Field>{children}</Field>}
        <categoryForm.Subscribe
          selector={({ canSubmit }) => {
            return { canSubmit };
          }}
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

export { CategoryForm };
