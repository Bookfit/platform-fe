import * as React from "react";
import { Controller, useFormContext, RegisterOptions } from "react-hook-form";
import { cn } from "@/lib/utils/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  label?: string;
  required?: boolean;
}

interface FormTextareaProps extends React.ComponentProps<"textarea"> {
  label?: string;
  required?: boolean;
  name?: string;
  rules?: RegisterOptions;
  showLabel?: boolean;
}

function Textarea({
  className,
  label,
  required = false,
  ...props
}: TextareaProps) {
  return (
    <>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        {...props}
      />
    </>
  );
}

// 새로운 FormTextarea 컴포넌트 (Controller와 함께 사용)
function FormTextarea({
  className,
  label,
  required = false,
  name,
  rules,
  showLabel = true,
  ...props
}: FormTextareaProps) {
  const formContext = useFormContext();

  if (!name || !formContext) {
    return (
      <>
        {showLabel && label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <textarea
          data-slot="textarea"
          className={cn(
            "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          {...props}
        />
      </>
    );
  }

  return (
    <Controller
      name={name}
      control={formContext.control}
      rules={rules}
      render={({ field, fieldState }) => (
        <>
          {showLabel && label && (
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}

          <Textarea
            {...field}
            {...props}
            className={cn(
              fieldState.error && "border-red-500 focus:border-red-500",
              className
            )}
          />

          {fieldState.error && (
            <span className="text-red-500 text-xs mt-1">
              {fieldState.error.message}
            </span>
          )}
        </>
      )}
    />
  );
}

export { Textarea, FormTextarea };
