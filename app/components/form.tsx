import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { useSimulation } from "~/context/simulationCtx";
import { useEffect, useState } from "react";
import { CircleAlertIcon, CircleDashedIcon, DiameterIcon, FastForwardIcon } from "lucide-react";

export default function Form() {
  const { simulation, setSimulation } = useSimulation()

  const [diametro, setDiametro] = useState<number>(simulation?.asteroid?.diametro ?? 0)
  const [velocidad, setVelocidad] = useState<number>(simulation?.asteroid?.velocidad ?? 0)
  const [densidad, setDensidad] = useState<number>(simulation?.asteroid?.densidad ?? 0)

  useEffect(() => {
    setDiametro(simulation?.asteroid?.diametro ?? 0)
    setVelocidad(simulation?.asteroid?.velocidad ?? 0)
    setDensidad(simulation?.asteroid.densidad ?? 0)
  }, [simulation.asteroid])

  const handleForm = () => {
    setSimulation(prev => ({
      ...prev,
      asteroid: {
        ...prev?.asteroid,
        diametro,
        velocidad,
        densidad
      },
    }))
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor="diametro">
          <DiameterIcon /> Diametro (m)
        </Label>
        <Input
          id="diametro"
          type="number"
          min={1}
          max={10000000}
          placeholder="Diametro (m)"
          onChange={(e) => setDiametro(Number(e.target.value))}
          defaultValue={simulation.asteroid.diametro}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="velocidad">
          <FastForwardIcon /> Velocidad (m/s)
        </Label>
        <Input
          id="velocidad"
          type="number"
          min={1}
          max={100000}
          placeholder="Velocidad (m/s)"
          onChange={(e) => setVelocidad(Number(e.target.value))}
          defaultValue={simulation.asteroid.velocidad}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="densidad">
          <CircleDashedIcon /> Densidad
        </Label>
        <Input
          id="densidad"
          type="number"
          min={1}
          max={100000}
          placeholder="Densidad"
          onChange={(e) => setDensidad(Number(e.target.value))}
          defaultValue={simulation.asteroid.densidad}
        />
      </div>
      <div>
        <Button onClick={handleForm}>Cambiar datos</Button>
      </div>
    </>
  )
}