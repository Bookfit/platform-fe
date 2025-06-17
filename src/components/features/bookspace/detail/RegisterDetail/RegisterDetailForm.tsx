import CategorySelector from "@/components/common/CategorySelector";
import FormInput from "@/components/common/FormInput";
import BusinessTime from "@/components/features/bookspace/detail/BusinessTime/BusinessTime";
import DaumPostCode from "@/components/features/bookspace/detail/DaumPostCode/DaumPostCode";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/state/queries/bookspace/useCategories";

import React from "react";
import { Controller, Form, useFormContext } from "react-hook-form";

export default function RegisterDetailForm() {
  const { control } = useFormContext();
  const { data: categories } = useCategories();

  return (
    <Form
      onSubmit={(formData) => {
        console.log(formData);
      }}
    >
      <FormInput
        formName="location"
        label="장소명"
        placeholder="장소를 입력해주세요"
        required
      />

      <CategorySelector
        required
        label="카테고리"
        className="mb-2"
        categories={categories?.categories ?? []}
      />

      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <DaumPostCode label="주소" onComplete={field.onChange}>
            {(onClick) => (
              <div className="input-base" onClick={onClick}>
                <span className="text-gray-500">
                  {field.value ? field.value : "주소 검색"}
                </span>
              </div>
            )}
          </DaumPostCode>
        )}
      />

      <FormInput
        className="mb-6"
        formName="detailAddress"
        label="상세 주소"
        placeholder="상세 주소를 입력해주세요"
      />

      <Label>위치 확인</Label>
      <Label className="text-gray-400 text-[12px]">
        * 주소 입력 시 자동으로 지도에 표시됩니다
      </Label>

      <Label>운영 시간</Label>
      <BusinessTime className="mb-2" title="평일" />
      <BusinessTime className="mb-6" title="주말" />

      <CategorySelector
        label="시설 정보"
        className="mb-6"
        categories={categories?.facilities ?? []}
      />

      <Textarea
        id="introduction"
        placeholder="소개글을 입력해주세요"
        required
        label="소개"
        className="min-h-24 max-h-12"
      />

      <Button
        type="submit"
        className="w-full mt-4 bg-primary py-4 rounded-lg h-12 cursor-pointer"
      >
        <label className="text-lg ">등록</label>
      </Button>
    </Form>
  );
}
