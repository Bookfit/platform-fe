import FormCategorySelector from "@/components/common/FormCategorySelector";
import FormInput from "@/components/common/FormInput";
import { NaverMap } from "@/components/common/NaverMap";
import BusinessTime from "@/components/features/bookspace/detail/BusinessTime/BusinessTime";
import DaumPostCode from "@/components/features/bookspace/detail/DaumPostCode/DaumPostCode";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormTextarea } from "@/components/ui/textarea";
import { BookSpaceDetailRequest } from "@/services/bookspace/detail/type";
import { useDetails } from "@/state/mutations/bookspace/detail/useDetails";
import { useCategories } from "@/state/queries/bookspace/detail/useCategories";
import { useNaverMapStore } from "@/store/bookspace/detail/naverMarkerStore";

import React from "react";
import { Controller, Form, useFormContext } from "react-hook-form";

export default function RegisterDetailForm() {
  const { control, watch } = useFormContext();
  const { data: categories } = useCategories();
  const { mutate: createBookSpace } = useDetails();
  const { lat, lng } = useNaverMapStore();

  return (
    <Form
      onSubmit={async (formData) => {
        /**TODO: 유저 정보 수정 필요 **/

        const onSubmitData = {
          ...formData?.data,
          userId: 4,
          loginType: "kakao",
          lat,
          lon: lng,
        };

        await createBookSpace(onSubmitData as BookSpaceDetailRequest);
      }}
    >
      <FormInput
        formName="name"
        label="장소명"
        placeholder="장소를 입력해주세요"
        required
      />

      <FormCategorySelector
        name="categories"
        label="카테고리"
        required
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
      <div className="w-full h-[300px] mb-6">
        <NaverMap address={watch("address")} />
      </div>

      <Label>운영 시간</Label>

      <BusinessTime name="weekdayHours" title="평일" className="mb-2" />
      <BusinessTime name="weekendHours" title="주말" className="mb-6" />

      <FormCategorySelector
        name="facilities"
        label="시설 정보"
        className="mb-6"
        categories={categories?.facilities ?? []}
      />

      <FormTextarea
        name="description"
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
