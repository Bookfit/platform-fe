import { Label } from '@/components/ui/label';
import { CategoryItem } from '@/services/bookspace/detail/type';
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface CategorySelectorProps {
  categories: CategoryItem[];
  label?: string;
  required?: boolean;
  onChange?: (category: string) => void;
  className?: string;
  defaultValue?: string;
  loading?: boolean;
}

export default function CategorySelector({
  categories,
  label,
  required = false,
  onChange,
  className = '',
  defaultValue = '',
  loading = false,
}: CategorySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState(defaultValue);

  const handleCategoryClick = (category: string) => {
    if (loading) return; // 로딩 중에는 클릭 방지
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

      {loading ? (
        // 로딩 상태
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="py-2 rounded-lg text-sm border border-gray-300 bg-gray-100 flex items-center justify-center"
            >
              <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
            </div>
          ))}
        </div>
      ) : (
        // 카테고리 버튼들
        <div className="grid grid-cols-4 gap-2">
          {categories?.map((category) => (
            <button
              key={category.code}
              type="button"
              onClick={() => handleCategoryClick(category.code)}
              disabled={loading}
              className={`py-2 rounded-lg text-sm transition-colors border border-gray-300 ${
                selectedCategory === category.code
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-100'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
