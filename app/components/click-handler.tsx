import { Circle, Tooltip } from "react-leaflet"
import { useEffect, useState } from "react"
import { useMapEvents } from "react-leaflet"
import { useSimulation } from "~/context/simulationCtx"

export default function ClickHandle() {
  const [pos, setPos] = useState<[number, number] | null>(null)
  const { simulation } = useSimulation()

  const { data } = simulation

  useEffect(() => {
    setPos(null)
  }, [simulation])

  useMapEvents({
    click(e: any) {
      setPos([e.latlng.lat, e.latlng.lng])
    }
  })

  if (pos) return (
    <Circle {...({ center: pos, pathOptions: { fillColor: "red" }, radius: data.diametroCrater / 2 } as any)} >
      <Circle {...({ center: pos, pathOptions: { fillColor: "green" }, radius: data.radioDeZonaDevastda * 1000 } as any)} >
        <Tooltip sticky>Zona devastada {Math.round(simulation.data.radioDeZonaDevastda)} km</Tooltip>
      </Circle>
      <Tooltip sticky>Crater {Math.round(simulation.data.diametroCrater)} m</Tooltip>
    </Circle>
  )
  return null
}