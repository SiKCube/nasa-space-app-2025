import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from "react-leaflet";
import { type MetaArgs } from "react-router";
import ClickHandle from '~/components/click-handler';
import Form from '~/components/form';
import ResizeHandler from "~/components/resize-handler";

export function meta({ }: MetaArgs) {
  return [
    { title: "Meteorito xd" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="layout-grid">
      <div>
        <MapContainer
          {...({ center: [-17.78629, -63.18117], zoom: 10, scrollWheelZoom: false, style: { height: "100vh", width: "100%" } } as any)}
        >
          <TileLayer
            {...({ attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" } as any)}
          />
          <ClickHandle />
          <ResizeHandler />
        </MapContainer>
      </div>
      <Form />
    </main>
  )
}

