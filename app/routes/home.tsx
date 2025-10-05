import 'leaflet/dist/leaflet.css';
import { LayerGroup, MapContainer, TileLayer } from "react-leaflet";
import { useLoaderData, useOutletContext, type MetaArgs } from "react-router";
import ClickHandle from '~/components/click-handler';
import CoolImg from '~/components/coolImg';
import Form from '~/components/form';
import RealAsteroids from '~/components/realAsteroids';
import ResizeHandler from "~/components/resize-handler";
import ShowData from '~/components/showData';
import { getAllNEOs } from '~/lib/neoNasaAPI';

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
          {...({ center: [-17.78629, -63.18117], zoom: 10, scrollWheelZoom: true, style: { height: "100vh", width: "100%" } } as any)}
        >
          <TileLayer
            {...({ attribution: '&copy; <a href="https://opentopomap.org/credits">OpenTopoMaps</a> credits', url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" } as any)}
          />
          <ClickHandle />
          <ResizeHandler />
        </MapContainer>
      </div>
      <div className="overflow-y-scroll h-[100vh]">
        <CoolImg />
        <div className='p-5 flex flex-col gap-5'>
          <Form />
          <ShowData />
          {/* <RealAsteroids data={[]} /> */}
        </div>
      </div>
    </main>
  )
}

