import { useGeocode } from "@/hooks/common/naverMap/useGeocode";
import { useEffect, useRef, useState } from "react";

interface NaverMapProps {
  address?: string;
  center?: NaverLatLng;
  zoom?: number;
  style?: React.CSSProperties;
}

// Naver Maps API 타입 정의
export interface NaverLatLng {
  lat: number;
  lng: number;
}

export interface NaverMapInstance {
  center: NaverLatLng;
  zoom: number;
  setCenter: (latlng: NaverLatLng) => void;
  setZoom: (zoom: number) => void;
  fitBounds: (bounds: NaverLatLngBounds) => void;
}

export interface NaverMarker {
  setMap: (map: NaverMapInstance | null) => void;
  getPosition: () => NaverLatLng;
}

export interface NaverInfoWindow {
  open: (map: NaverMapInstance, marker: NaverMarker) => void;
  close: () => void;
}

export interface NaverLatLngBounds {
  extend: (latlng: NaverLatLng) => void;
}

export interface NaverSize {
  width: number;
  height: number;
}

export interface NaverPoint {
  x: number;
  y: number;
}

export interface NaverIcon {
  content: string;
  size: NaverSize;
  anchor: NaverPoint;
}

export interface GeocodeResponse {
  v2: {
    addresses: Array<{
      x: string;
      y: string;
    }>;
    meta: {
      totalCount: number;
    };
  };
}

declare global {
  interface Window {
    naver: {
      maps: {
        Map: new (
          element: HTMLElement,
          options: { center: NaverLatLng; zoom: number },
        ) => NaverMapInstance;
        LatLng: new (lat: number, lng: number) => NaverLatLng;
        Marker: new (options: {
          position: NaverLatLng;
          map: NaverMapInstance;
          icon?: NaverIcon;
        }) => NaverMarker;
        Size: new (width: number, height: number) => NaverSize;
        Point: new (x: number, y: number) => NaverPoint;
        InfoWindow: new (options: { content: string }) => NaverInfoWindow;
        LatLngBounds: new () => NaverLatLngBounds;
        Event: {
          addListener: (
            target: NaverMapInstance | NaverMarker | NaverInfoWindow,
            event: string,
            listener: () => void,
          ) => void;
        };
        Service: {
          Status: {
            ERROR: string;
            OK: string;
          };
          geocode: (
            options: { query: string },
            callback: (status: string, response: GeocodeResponse) => void,
          ) => void;
        };
      };
    };
  }
}

export const NaverMap = ({
  address,
  center = { lat: 37.5665, lng: 126.978 },
  zoom = 13,
  style = { width: "100%", height: "100%" },
}: NaverMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<NaverMapInstance | null>(null);
  const markerRef = useRef<NaverMarker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=dfjysptqd9&submodules=geocoder`;
    script.async = true;
    script.onload = () => {
      if (!window.naver || !mapRef.current) return;

      mapInstanceRef.current = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(center.lat, center.lng),
        zoom: zoom,
      });
      setIsLoaded(true);
    };
    document.head.appendChild(script);
  }, [center.lat, center.lng, zoom]);

  //** naver map geocoder 기능 추가 **/
  useGeocode({
    address,
    isLoaded,
    mapInstanceRef,
    markerRef,
  });

  return <div ref={mapRef} style={style} />;
};
