"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NaverMap } from "@/components/common/NaverMap";

// 샘플 데이터
const SPACES = [
  {
    id: 1,
    name: "강남 라임 스퀘어(북핏아지트)",
    address: "서울 강남구 역삼로5길 5\n라임 스퀘어 지하 1층",
    categories: ["기타"],
    status: "등록",
    highlight: true,
  },
  {
    id: 2,
    name: "센트럴시티 000 카페 스터디룸",
    address: "상세정보 미기재",
    categories: ["스터디룸"],
    status: "등록",
    highlight: true,
  },
  {
    id: 3,
    name: "책방 이음",
    address: "서울 강남구 역삼로 123",
    categories: ["서점", "북카페"],
    status: "",
    highlight: false,
  },
  {
    id: 4,
    name: "스터디 카페 코너",
    address: "서울 강남구 선릉로 428",
    categories: ["스터디룸"],
    status: "",
    highlight: false,
  },
];

export default function BookSpaceListPage() {
  const router = useRouter();

  return (
    <div className="max-w-[420px] mx-auto min-h-screen bg-white pb-20 relative shadow-lg">
      {/* 상단 필터/타이틀 */}
      <header className="px-4 pt-6">
        <h1 className="text-lg font-bold mb-3">
          <button
            type="button"
            onClick={() => router.push("/bookspace")}
            className="text-gray-500 mr-1 hover:text-primary transition"
            aria-label="메인으로 이동"
          >
            {"<"}
          </button>
          <span className="text-lg font-bold">등록 공간 조회</span>
        </h1>
        <div className="flex gap-2 mb-4">
          <Button variant="outline" className="rounded-full px-4 py-1 text-sm">
            필터
          </Button>
          <Button variant="outline" className="rounded-full px-4 py-1 text-sm">
            북카페
          </Button>
          <Button variant="outline" className="rounded-full px-4 py-1 text-sm">
            스터디룸
          </Button>
          <Button variant="outline" className="rounded-full px-4 py-1 text-sm">
            서점
          </Button>
        </div>
      </header>

      {/* 지도/리스트 영역 */}
      <section className="flex gap-2">
        <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center text-xs text-gray-400">
          <NaverMap />
        </div>
      </section>

      {/* 공간 리스트 */}
      <section>
        {SPACES.map((space) => (
          <div
            key={space.id}
            className="flex items-center justify-between px-4 py-4 border-b border-gray-200"
          >
            <div className="flex-1 flex items-center gap-2">
              <div className="w-15 h-15 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="flex-4">
              <div>
                <h2 className="text-sm font-bold">{space.name}</h2>
                <p className="text-xs text-gray-500">{space.address}</p>
              </div>
              <div className="flex items-center gap-2 justify-between mt-2">
                <div className="flex items-center gap-2">
                  {space.categories.map((category) => (
                    <p
                      key={category}
                      className="text-xs text-gray-500 bg-gray-200 rounded-full px-2 py-1"
                    >
                      {category}
                    </p>
                  ))}
                </div>
                {space.status === "등록" && (
                  <Button
                    variant="outline"
                    className="rounded-full px-2 py-1 text-xs py-0 h-6"
                  >
                    등록
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
