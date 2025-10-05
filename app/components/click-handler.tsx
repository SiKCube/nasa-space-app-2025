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
    <Circle {... ({ center: pos, pathOptions: { fillColor: "blue" }, radius: data.radioDeBolaDeFuego }) as any}>
      <Tooltip {...({ sticky: true }) as any} >Zona incenedaracion {Math.round(simulation.data.radioDeBolaDeFuego)} m</Tooltip>
      <Circle {...({ center: pos, pathOptions: { fillColor: "red" }, radius: data.diametroCrater / 2 } as any)} >
        <Tooltip {...({ sticky: true })}>Crater {Math.round(simulation.data.diametroCrater)} m</Tooltip>
        <Circle {...({ center: pos, pathOptions: { fillColor: "green" }, radius: data.radioDeZonaDevastda * 1000 } as any)} >
          <Tooltip {...({ sticky: true })}>Zona devastada {Math.round(simulation.data.radioDeZonaDevastda)} km</Tooltip>
        </Circle>
      </Circle>
    </Circle>
  )
  return null
}