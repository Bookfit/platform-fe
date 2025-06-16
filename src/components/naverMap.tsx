import { useEffect, useRef } from "react";

declare global {
  interface Window {
    naver: {
      maps: {
        Map: new (
          element: HTMLElement,
          options: { center: { lat: number; lng: number }; zoom: number }
        ) => {
          center: { lat: number; lng: number };
          zoom: number;
        };
        LatLng: new (lat: number, lng: number) => { lat: number; lng: number };
      };
    };
  }
}

const NaverMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=dfjysptqd9`;
    script.async = true;
    script.onload = () => {
      if (!window.naver || !mapRef.current) return;

      new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(37.5665, 126.978),
        zoom: 13,
      });
    };
    document.head.appendChild(script);
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default NaverMap;
