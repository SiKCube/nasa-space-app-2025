import { useSimulation } from "~/context/simulationCtx"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { useMemo } from "react"

export default function ShowData() {
  const { simulation } = useSimulation()
  const { data } = simulation

  const rounded = useMemo(() => ({
    areaDeCrater: Math.round(data.areaDeCrater),
    areaDevastada: Math.round(data.areaDevastada),
    radioDeZonaDevastda: Math.round(data.radioDeZonaDevastda),
    diametroCrater: Math.round(data.diametroCrater),
    energiaMegatones: Math.round(data.energiaMegatones),
    magnitudSismicaEquivalente: Math.round(data.magnitudSismicaEquivalente),
    alturaInicialDelTsunami: Math.round(data.alturaInicialDelTsunami),
  }), [data])

  return (
    <div className="flex flex-col justify-start gap-5">
      <Card>
        <CardHeader>
          <CardTitle>Damage</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col items-start gap-3">
            <li className="text-sm"><b>Area de Crater:</b> {rounded.areaDeCrater / 1000} km^2</li>
            <li className="text-sm"><b>Area devastada:</b> {rounded.areaDevastada} km^2</li>
            <li className="text-sm"><b>Radio de devastacion:</b> {rounded.radioDeZonaDevastda} km</li>
            <li className="text-sm"><b>Diametro de crater:</b> {rounded.diametroCrater} m</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Desastre</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col items-start gap-3">
            <li className="text-sm"><b>Energia:</b> {rounded.energiaMegatones}MT</li>
            <li className="text-sm"><b>Magnitud sismica:</b> {rounded.magnitudSismicaEquivalente}</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <span className="text-sm"><b>Altura inicial de Tsunami:</b> {rounded.alturaInicialDelTsunami} m</span>
        </CardContent>
      </Card>
    </div>
  )
}