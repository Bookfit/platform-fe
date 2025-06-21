import { useState } from 'react';
import { FormField, FormItem } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';

interface MainImageUploadProps {
  form: UseFormReturn<{
    [key: string]: File[];
  }>;
  name: string;
}

export default function MainImageUpload({ name }: MainImageUploadProps) {
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: { onChange: (value: File[]) => void },
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      field.onChange(files);

      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreview(previews);
    }
  };

  return (
    <FormField
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
        <FormItem>
          <div className="mt-2">
            {/* 이미지 업로드 영역 */}
            <label
              htmlFor="imageUpload"
              className="border border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 cursor-pointer"
            >
              <input
                {...field}
                type="file"
                id="imageUpload"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleImageChange(e, { onChange })}
              />
              <div className="text-gray-400 text-center">
                <span className="block mb-1">+</span>
                이미지 추가하기
              </div>
            </label>

            {/* 이미지 미리보기 */}
            {imagePreview.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {imagePreview.map((url, index) => (
                  <div key={index} className="relative aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                      onClick={() => {
                        const newPreview = imagePreview.filter(
                          (_, i) => i !== index,
                        );
                        setImagePreview(newPreview);
                        const newFiles = (value as File[])?.filter(
                          (_, i) => i !== index,
                        );
                        onChange(newFiles);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </FormItem>
      )}
    />
  );
}
