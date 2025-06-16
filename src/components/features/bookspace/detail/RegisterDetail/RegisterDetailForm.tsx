import CategorySelector from "@/components/common/CategorySelector";
import FormInput from "@/components/common/FormInput";
import BusinessTime from "@/components/features/bookspace/detail/BusinessTime/BusinessTime";
import DaumPostCode from "@/components/features/bookspace/detail/DaumPostCode/DaumPostCode";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  FACILITY_INFORMATION_CATEGORIES,
  LOCATION_CATEGORIES,
} from "@/lib/utils/bookspace/register/detail";
import { useBookSpaceStore } from "@/store/bookspace/bookspaceStore";

import { useRouter } from "next/navigation";
import React from "react";

export default function RegisterDetailForm() {
  const router = useRouter();
  const { address, setAddress } = useBookSpaceStore();

  return (
    <>
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
        categories={LOCATION_CATEGORIES}
      />

      <DaumPostCode
        label="주소"
        onComplete={(address) => {
          setAddress(address);
        }}
      >
        {(onClick) => (
          <div className="input-base" onClick={onClick}>
            <span className="text-gray-500">
              {address ? address : "주소 검색"}
            </span>
          </div>
        )}
      </DaumPostCode>

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
        categories={FACILITY_INFORMATION_CATEGORIES}
      />

      <Textarea
        placeholder="소개글을 입력해주세요"
        required
        label="소개"
        className="min-h-24 max-h-12"
      />

      <Button
        className="w-full mt-4 bg-primary py-4 rounded-lg h-12 cursor-pointer"
        onClick={() => {
          router.push("/bookspace");
        }}
      >
        <label className="text-lg ">확인</label>
      </Button>
    </>
  );
}
