"use client";
import React, { useEffect, useRef, useState } from "react";
import { NaverMapInstance, NaverMarker } from "@/components/common/NaverMap";
import { BookSpaceListItem } from "@/services/bookspace/list/type";

interface MapSectionProps {
  className?: string;
  bookspaces?: BookSpaceListItem[];
  onSpaceSelect?: (space: BookSpaceListItem) => void;
  selectedSpaceId?: number | null;
}

export default function MapSection({
  className = "",
  bookspaces = [],
  onSpaceSelect,
  selectedSpaceId,
}: MapSectionProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<NaverMapInstance | null>(null);
  const markersRef = useRef<{ [key: number]: NaverMarker }>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // 지도 초기화
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=dfjysptqd9&submodules=geocoder`;
    script.async = true;
    script.onload = () => {
      if (!window.naver || !mapRef.current) return;

      mapInstanceRef.current = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(37.5665, 126.978),
        zoom: 13,
      });
      setIsLoaded(true);
    };
    document.head.appendChild(script);
  }, []);

  // 마커 생성 및 표시
  useEffect(() => {
    if (!isLoaded || !mapInstanceRef.current || !window.naver) return;

    // 기존 마커들 제거
    Object.values(markersRef.current).forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current = {};

    // 유효한 좌표를 가진 bookspace만 필터링
    const validBookspaces = bookspaces.filter(
      (space) => space.lat !== null && space.lon !== null,
    );

    if (validBookspaces.length === 0) return;

    // 마커 생성
    validBookspaces.forEach((space) => {
      if (space.lat && space.lon) {
        const position = new window.naver.maps.LatLng(space.lat, space.lon);

        // 선택된 마커인지 확인하여 다른 스타일 적용
        const isSelected = selectedSpaceId === space.id;

        const marker = new window.naver.maps.Marker({
          position,
          map: mapInstanceRef.current!,
          icon: {
            content: `
              <div style="
                background-color: ${isSelected ? "#3B82F6" : "#EF4444"};
                color: white;
                padding: ${isSelected ? "8px 12px" : "4px 8px"};
                border-radius: 12px;
                font-size: ${isSelected ? "11px" : "12px"};
                font-weight: bold;
                border: 2px solid white;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                transform: translate(-50%, -100%);
                max-width: ${isSelected ? "200px" : "120px"};
                white-space: ${isSelected ? "normal" : "nowrap"};
                text-align: center;
              ">
                ${
                  isSelected
                    ? `<div style="margin-bottom: 4px;">${space.name}</div>
                     <div style="font-size: 9px; font-weight: normal; opacity: 0.9;">
                       ${space.address || ""}
                     </div>`
                    : space.name.length > 8
                    ? space.name.substring(0, 8) + "..."
                    : space.name
                }
              </div>
            `,
            size: new window.naver.maps.Size(0, 0),
            anchor: new window.naver.maps.Point(0, 0),
          },
        });

        window.naver.maps.Event.addListener(marker, "click", () => {
          onSpaceSelect?.(space);
        });

        markersRef.current[space.id] = marker;
      }
    });

    // 모든 마커가 보이도록 지도 영역 조정
    if (validBookspaces.length > 0) {
      const bounds = new window.naver.maps.LatLngBounds();
      validBookspaces.forEach((space) => {
        if (space.lat && space.lon) {
          bounds.extend(new window.naver.maps.LatLng(space.lat, space.lon));
        }
      });
      mapInstanceRef.current.fitBounds(bounds);
    }
  }, [isLoaded, bookspaces, onSpaceSelect, selectedSpaceId]);

  // 선택된 공간이 변경되면 해당 위치로 지도 중심 이동
  useEffect(() => {
    if (
      !isLoaded ||
      !mapInstanceRef.current ||
      !window.naver ||
      !selectedSpaceId
    )
      return;

    const selectedSpace = bookspaces.find(
      (space) => space.id === selectedSpaceId,
    );

    if (selectedSpace && selectedSpace.lat && selectedSpace.lon) {
      const position = new window.naver.maps.LatLng(
        selectedSpace.lat,
        selectedSpace.lon,
      );

      // 지도 중심 이동
      mapInstanceRef.current.setCenter(position);

      // 줌 레벨 조정 (선택된 마커에 더 가깝게)
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setZoom(15);
        }
      }, 100);
    }
  }, [selectedSpaceId, bookspaces, isLoaded]);

  const validBookspaces = bookspaces.filter(
    (space) => space.lat !== null && space.lon !== null,
  );

  return (
    <section className={`w-full ${className}`}>
      <div className="px-4 py-2">
        <div className="flex gap-2">
          {/* 지도 영역 */}
          <div className="flex-1 h-96 rounded-lg overflow-hidden border border-gray-200">
            <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
          </div>

          {/* 마커 정보 리스트 */}
          <div className="w-35 h-96 overflow-y-auto border border-gray-200 rounded-lg">
            <div className="p-2 bg-gray-50 border-b border-gray-200">
              <h4 className="font-medium text-gray-900 text-sm">
                주변 공간 ({validBookspaces.length}개)
              </h4>
            </div>
            <div className="divide-y divide-gray-200">
              {validBookspaces.map((space) => (
                <div
                  key={space.id}
                  className={`p-2 cursor-pointer transition-colors ${
                    selectedSpaceId === space.id
                      ? "bg-blue-50 border-l-4 border-blue-500"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    onSpaceSelect?.(space);
                  }}
                >
                  <h5 className="font-medium text-gray-900 text-xs mb-1">
                    {space.name}
                  </h5>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {space.address}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
