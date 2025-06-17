import ky from "ky";
import { NextResponse } from "next/server";

/**
 * cors에러로 인한 임시 API 연동 테스트 중 입니다.
 * 추후 삭제 예정
 * **/
export async function GET() {
  try {
    const res = await ky(`${process.env.NEXT_PUBLIC_API_URL}/map/details/meta`);

    console.log("res", res);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
