import {
  GeocodeResponse,
  NaverMapInstance,
  NaverMarker,
} from "@/components/common/NaverMap";
import { useEffect, RefObject } from "react";

interface UseGeocodeProps {
  address?: string;
  isLoaded: boolean;
  mapInstanceRef: RefObject<NaverMapInstance | null>;
  markerRef: RefObject<NaverMarker | null>;
}

export const useGeocode = ({
  address,
  isLoaded,
  mapInstanceRef,
  markerRef,
}: UseGeocodeProps) => {
  useEffect(() => {
    if (!address || !isLoaded || !window.naver || !mapInstanceRef.current)
      return;

    console.log("주소 처리 시작:", address);

    // Geocoder가 로드되었는지 확인
    if (typeof window.naver.maps.Service.geocode !== "function") {
      console.log("Geocoder가 아직 로드되지 않았습니다.");
      return;
    }

    try {
      window.naver.maps.Service.geocode(
        {
          query: address,
        },
        (status: string, response: GeocodeResponse) => {
          if (status !== window.naver.maps.Service.Status.OK) {
            console.log("주소를 찾을 수 없습니다:", address);
            return;
          }

          if (!response || !response.v2 || !response.v2.addresses) {
            console.log("응답 구조가 올바르지 않습니다:", response);
            return;
          }

          const items = response.v2.addresses;

          if (items.length === 0) {
            console.log("검색 결과가 없습니다:", address);
            return;
          }

          const item = items[0];
          const point = new window.naver.maps.LatLng(
            parseFloat(item.y),
            parseFloat(item.x),
          );

          console.log("point", point);

          // 기존 마커 제거
          if (markerRef.current) {
            markerRef.current.setMap(null);
          }

          // 새 마커 생성
          if (mapInstanceRef.current) {
            markerRef.current = new window.naver.maps.Marker({
              position: point,
              map: mapInstanceRef.current,
            });

            // 지도 중심 이동
            mapInstanceRef.current.setCenter(point);
            mapInstanceRef.current.setZoom(15);
          }
        },
      );
    } catch (error) {
      console.error("Geocoder 오류:", error);
    }
  }, [address, isLoaded, mapInstanceRef, markerRef]);
};
