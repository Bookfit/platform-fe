import React, { ReactNode } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

interface DaumPostCodeProps {
  label?: string;
  children?: ReactNode | ((onClick: () => void) => ReactNode);
  onComplete?: (address: string) => void;
}

interface DaumPostCodeData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
}

export default function DaumPostCode({
  label,
  children,
  onComplete,
}: DaumPostCodeProps) {
  const open = useDaumPostcodePopup(process.env.NEXT_PUBLIC_DAUM_POSTCODE_URL);

  const handleComplete = (data: DaumPostCodeData) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    onComplete?.(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  if (typeof children === "function") {
    return (
      <div className="flex flex-col gap-2 cursor-pointer">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        {children(handleClick)}
      </div>
    );
  }

  return (
    <div onClick={handleClick}>
      {children || <button type="button">주소 검색</button>}
    </div>
  );
}
