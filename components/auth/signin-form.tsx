"use client";

import * as React from "react";
import { SignInFormSchema } from "@/validators/auth/signin-form";

import { useSignInForm } from "@/hooks/auth/use-signin-form";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

interface SignInFormProps extends Omit<
  React.ComponentProps<"form">,
  "onSubmit"
> {
  defaultValues?: SignInFormSchema;
  onSubmit?: (
    values: SignInFormSchema,
    form: ReturnType<typeof useSignInForm>,
  ) => void;
}

function SignInForm({
  defaultValues,
  children,
  className,
  onSubmit,
  ...props
}: SignInFormProps) {
  const [isViewingPassword, setIsViewingPassword] = React.useState(false);
  const signInForm = useSignInForm({ defaultValues });

  return (
    <form
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(signInForm.state.values, signInForm);
      }}
    >
      <FieldGroup className={cn("gap-4", className)}>
        <signInForm.Field
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  type="email"
                  name={field.name}
                  id={field.name}
                  placeholder="foobar@example.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.currentTarget.value)}
                  onBlur={() => field.handleBlur()}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <signInForm.Field
          name="password"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    type={isViewingPassword ? "text" : "password"}
                    name={field.name}
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.currentTarget.value)}
                    onBlur={() => field.handleBlur()}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      onClick={() => setIsViewingPassword(!isViewingPassword)}
                    >
                      {isViewingPassword ? <EyeClosedIcon /> : <EyeIcon />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <signInForm.Field
          name="rememberMe"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field data-invalid={isInvalid} orientation="horizontal">
                <Checkbox
                  id={field.name}
                  name={field.name}
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(checked)}
                />
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Remember me</FieldLabel>
                  <FieldDescription>
                    By clicking this checkbox, your browser will remember your
                    session.
                  </FieldDescription>
                </FieldContent>
              </Field>
            );
          }}
        />
        {children && <Field>{children}</Field>}
        <signInForm.Subscribe
          selector={({ canSubmit }) => ({ canSubmit })}
          children={({ canSubmit }) => {
            return (
              <Field>
                <Button type="submit" disabled={!canSubmit}>
                  Continue
                </Button>
              </Field>
            );
          }}
        />
      </FieldGroup>
    </form>
  );
}

export { SignInForm };
