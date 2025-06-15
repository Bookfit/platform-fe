"use client";
import RegisterDetailForm from "@/components/features/bookspace/detail/RegisterDetail/RegisterDetailForm";
import DetailLayout from "@/layout/common/DetailLayout";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";

export default function RegisterDetailPage() {
  const router = useRouter();
  const methods = useForm({ mode: "onChange" });

  return (
    <FormProvider {...methods}>
      <DetailLayout
        title="< 세부 정보"
        onClick={() => {
          router.back();
        }}
      >
        <RegisterDetailForm />
      </DetailLayout>
    </FormProvider>
  );
}
