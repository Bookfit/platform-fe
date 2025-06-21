import { Label } from "@/components/ui/label";
import { useCategoryHandler } from "@/hooks/bookspace/detail/category/useCategoryHandler";
import { CategoryItem } from "@/services/bookspace/detail/type";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface CategorySelectorProps {
  categories: CategoryItem[];
  label?: string;
  required?: boolean;
  className?: string;
  name: string; // react-hook-form field name
  multiple?: boolean; // 다중 선택 지원
  maxSelection?: number; // 최대 선택 개수 (multiple이 true일 때)
}

export default function FormCategorySelector({
  categories,
  label,
  required = false,
  className = "",
  name,
  multiple = false,
  maxSelection,
}: CategorySelectorProps) {
  const { control } = useFormContext();

  const { renderCategoryButton, validationRules } = useCategoryHandler({
    multiple,
    required,
    label,
    maxSelection,
  });

  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules}
      render={({ field, fieldState }) => (
        <div className={`rounded-b-xl ${className}`}>
          {label && (
            <Label className="text-sm mb-2 block">
              {label}
              {required && <span className="text-red-600 ml-1">*</span>}
            </Label>
          )}
          <div className="grid grid-cols-4 gap-2">
            {categories?.map((category) =>
              renderCategoryButton(category, field.value, field.onChange)
            )}
          </div>
          {fieldState.error && (
            <p className="text-red-500 text-sm mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
