import { Label } from "@/components/ui/label";
import React, { useState } from "react";

interface CategorySelectorProps {
  categories: string[];
  label?: string;
  required?: boolean;
  onChange?: (category: string) => void;
  className?: string;
  defaultValue?: string;
}

export default function CategorySelector({
  categories,
  label,
  required = false,
  onChange,
  className = "",
  defaultValue = "",
}: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState(defaultValue);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onChange?.(category);
  };

  return (
    <div className={`rounded-b-xl ${className}`}>
      {label && (
        <Label className="text-sm mb-2 block">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </Label>
      )}
      <div className="grid grid-cols-4 gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleCategoryClick(category)}
            className={`py-2 rounded-lg text-sm transition-colors border border-gray-300 ${
              selectedCategory === category
                ? "bg-primary text-white"
                : "bg-white text-gray-500 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
