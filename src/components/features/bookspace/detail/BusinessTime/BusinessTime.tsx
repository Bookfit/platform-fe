import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface BusinessTimeProps {
  title?: string;
  className?: string;
  name: string;
  required?: boolean;
  label?: string;
}

// 시간을 분으로 변환하는 함수
const timeToMinutes = (time: string): number => {
  if (!time) return 0;
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// 시간 유효성 검사 함수
const validateTimeRange = (value: string): string | true => {
  if (!value) return true;

  const [startTime, endTime] = value.split(" - ");
  if (!startTime || !endTime) return true;

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  if (endMinutes <= startMinutes) {
    return "종료 시간은 시작 시간보다 늦어야 합니다.";
  }

  return true;
};

export default function BusinessTime({
  title,
  className,
  name,
  required = false,
  label,
}: BusinessTimeProps) {
  const { control } = useFormContext();

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <Label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{
          required: required ? `${title || "운영"} 시간을 입력해주세요` : false,
          validate: validateTimeRange,
        }}
        render={({ field, fieldState }) => {
          const currentValue = field.value || "";
          const [startTime, endTime] = currentValue.split(" - ");
          const hasError =
            fieldState.error && fieldState.error.type !== "required";

          return (
            <>
              <div className="flex flex-row gap-4 whitespace-nowrap">
                {title && (
                  <Label className="text-sm font-medium text-gray-700 mb-1 min-w-[60px]">
                    {title}
                  </Label>
                )}

                {/* 시작 시간 */}
                <Input
                  type="time"
                  value={startTime || ""}
                  onChange={(e) => {
                    const start = e.target.value;
                    const currentEnd = currentValue.split(" - ")[1] || "";
                    field.onChange(`${start} - ${currentEnd}`);
                  }}
                  placeholder="09:00"
                  className={`bg-background ${
                    hasError ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />

                <span className="text-gray-500 self-center">~</span>

                {/* 종료 시간 */}
                <Input
                  type="time"
                  value={endTime || ""}
                  onChange={(e) => {
                    const end = e.target.value;
                    const currentStart = currentValue.split(" - ")[0] || "";
                    field.onChange(`${currentStart} - ${end}`);
                  }}
                  placeholder="18:00"
                  className={`bg-background ${
                    hasError ? "border-red-500 focus:border-red-500" : ""
                  }`}
                />
              </div>

              {fieldState.error && (
                <span className="text-red-500 text-xs mt-1">
                  {fieldState.error.message}
                </span>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
