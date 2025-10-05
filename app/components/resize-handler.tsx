import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function ResizeHandler() {
  const map = useMap();
  useEffect(() => {
    const id = window.setTimeout(() => map.invalidateSize(), 50);
    return () => window.clearTimeout(id);
  }, [map]);
  return null;
}