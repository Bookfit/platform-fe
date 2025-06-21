import { useMemo } from "react";
import { CategoryItem } from "@/services/bookspace/detail/type";

interface UseCategoryHandlerProps {
  multiple?: boolean;
  required?: boolean;
  label?: string;
  maxSelection?: number;
}

export const useCategoryHandler = ({
  multiple = false,
  required = false,
  label,
  maxSelection,
}: UseCategoryHandlerProps) => {
  // 카테고리 선택 상태 확인 함수
  const isCategorySelected = (
    category: CategoryItem,
    fieldValue: CategoryItem | CategoryItem[] | undefined
  ): boolean => {
    if (multiple) {
      return (
        Array.isArray(fieldValue) &&
        fieldValue.some((item: CategoryItem) => item.code === category.code)
      );
    }
    return (fieldValue as CategoryItem)?.code === category.code;
  };

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (
    category: CategoryItem,
    fieldValue: CategoryItem | CategoryItem[] | undefined,
    onChange: (value: CategoryItem | CategoryItem[]) => void
  ) => {
    if (multiple) {
      const currentValue = Array.isArray(fieldValue) ? fieldValue : [];
      const isSelected = isCategorySelected(category, fieldValue);

      const newValue = isSelected
        ? currentValue.filter(
            (item: CategoryItem) => item.code !== category.code
          )
        : [...currentValue, category];

      onChange(newValue);
    } else {
      onChange(category);
    }
  };

  // 카테고리 버튼 렌더링
  const renderCategoryButton = (
    category: CategoryItem,
    fieldValue: CategoryItem | CategoryItem[] | undefined,
    onChange: (value: CategoryItem | CategoryItem[]) => void
  ) => {
    const isSelected = isCategorySelected(category, fieldValue);

    return (
      <button
        key={category.code}
        type="button"
        onClick={() => handleCategoryClick(category, fieldValue, onChange)}
        className={`py-2 rounded-lg text-sm transition-colors border border-gray-300 ${
          isSelected
            ? "bg-primary text-white"
            : "bg-white text-gray-500 hover:bg-gray-100"
        }`}
      >
        {category.name}
      </button>
    );
  };

  // validation 규칙
  const validationRules = useMemo(
    () => ({
      required: required ? `${label || "카테고리"}를 선택해주세요` : false,
      validate: (value: CategoryItem | CategoryItem[] | undefined) => {
        if (
          multiple &&
          maxSelection &&
          Array.isArray(value) &&
          value.length > maxSelection
        ) {
          return `최대 ${maxSelection}개까지 선택 가능합니다`;
        }
        return true;
      },
    }),
    [required, label, multiple, maxSelection]
  );

  return {
    renderCategoryButton,
    validationRules,
  };
};
