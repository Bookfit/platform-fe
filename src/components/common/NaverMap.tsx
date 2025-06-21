import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    naver: {
      maps: {
        Map: new (
          element: HTMLElement,
          options: { center: { lat: number; lng: number }; zoom: number },
        ) => {
          center: { lat: number; lng: number };
          zoom: number;
        };
        LatLng: new (lat: number, lng: number) => { lat: number; lng: number };
      };
    };
  }
}

interface NaverMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  style?: React.CSSProperties;
}

const NaverMap = ({
  center = { lat: 37.5665, lng: 126.978 },
  zoom = 13,
  className = '',
  style = { width: '100%', height: '100%' },
}: NaverMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=dfjysptqd9`;
    script.async = true;
    script.onload = () => {
      if (!window.naver || !mapRef.current) return;

      new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(center.lat, center.lng),
        zoom: zoom,
      });
    };
    document.head.appendChild(script);
  }, [center.lat, center.lng, zoom]);

  return <div ref={mapRef} className={className} style={style} />;
};

export default NaverMap;
