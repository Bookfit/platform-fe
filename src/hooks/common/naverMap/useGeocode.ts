import {
  GeocodeResponse,
  NaverMapInstance,
  NaverMarker,
} from "@/components/common/NaverMap";
import { useNaverMapStore } from "@/store/bookspace/detail/naverMarkerStore";
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
  const { setMarker } = useNaverMapStore();
  useEffect(() => {
    if (!address || !isLoaded || !window.naver || !mapInstanceRef.current)
      return;

    // Geocoder가 로드되었는지 확인
    if (typeof window.naver.maps.Service.geocode !== "function") {
      return;
    }

    try {
      window.naver.maps.Service.geocode(
        {
          query: address,
        },
        (status: string, response: GeocodeResponse) => {
          if (status !== window.naver.maps.Service.Status.OK) {
            return;
          }

          if (!response || !response.v2 || !response.v2.addresses) {
            return;
          }

          const items = response.v2.addresses;

          if (items.length === 0) {
            return;
          }

          const item = items[0];
          const point = new window.naver.maps.LatLng(
            parseFloat(item.y),
            parseFloat(item.x)
          );

          setMarker(parseFloat(item.y), parseFloat(item.x));

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
        }
      );
    } catch (error) {
      console.error("Geocoder 오류:", error);
    }
  }, [address, isLoaded, mapInstanceRef, markerRef, setMarker]);
};
