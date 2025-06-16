import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface BusinessTimeProps {
  title?: string;
  className?: string;
}

export default function BusinessTime({
  title,

  className,
}: BusinessTimeProps) {
  return (
    <div className={`flex flex-row gap-4 whitespace-nowrap ${className}`}>
      {title && (
        <Label className="text-sm font-medium text-gray-700 mb-1">
          {title}
        </Label>
      )}
      <Input
        type="time"
        id="time"
        step="1"
        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
      <Input
        type="time"
        id="time"
        step="1"
        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </div>
  );
}
