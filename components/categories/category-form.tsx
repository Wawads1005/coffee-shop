import * as React from "react";
import { cn } from "@/lib/utils";
import { CategoryFormSchema } from "@/validators/categories/category-form";
import { useCategoryForm } from "@/hooks/categories/use-category-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CategoryFormProps extends Omit<
  React.ComponentProps<"form">,
  "onSubmit"
> {
  defaultValues?: CategoryFormSchema;
  onSubmit?: (values: CategoryFormSchema) => void;
}

function CategoryForm({
  defaultValues,
  onSubmit,
  children,
  className,
  ...props
}: CategoryFormProps) {
  const categoryForm = useCategoryForm({ defaultValues });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        onSubmit?.(categoryForm.state.values);
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
