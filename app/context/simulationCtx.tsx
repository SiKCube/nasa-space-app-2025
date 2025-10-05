import React, { createContext, useContext, useEffect, useState } from "react";

interface Asteroid {
  diametro: number
  velocidad: number
  densidad: number
}

interface Constantes {
  constanteDeAjuste: number
  gravedad: number
  constanteEmpirica: number
  fraccionDeEnergiaAOndasSismicas: number
}

interface ShowData {
  energiaMegatones: number
  diametroCrater: number
  areaDeCrater: number
  areaDevastada: number
  magnitudSismicaEquivalente: number
  radioDeZonaDevastda: number
  alturaInicialDelTsunami: number
  radioDeBolaDeFuego: number
}

interface SimulationProps {
  asteroid: Asteroid
  constantes: Constantes
  data: ShowData
}

const DEFAULT_VALUES: SimulationProps = {
  asteroid: {
    diametro: 100, // m
    velocidad: 10000, // m/s
    densidad: 3000,
  },
  constantes: {
    constanteDeAjuste: 1.161,
    constanteEmpirica: 1.5,
    fraccionDeEnergiaAOndasSismicas: 0.05,
    gravedad: 9.81
  },
  data: {
    areaDeCrater: 0,
    areaDevastada: 0,
    diametroCrater: 0,
    energiaMegatones: 0,
    magnitudSismicaEquivalente: 0,
    radioDeZonaDevastda: 0,
    alturaInicialDelTsunami: 0,
    radioDeBolaDeFuego: 0
  }
}

const simulationCtx = createContext<{
  simulation: SimulationProps
  setSimulation: React.Dispatch<React.SetStateAction<SimulationProps>>

}>({
  simulation: DEFAULT_VALUES,
  setSimulation: () => { },
})

export function SimulationCtxProvider({ children }: { children: React.ReactNode }) {
  const [simulation, setSimulation] = useState<SimulationProps>(DEFAULT_VALUES)

  // Recalculate derived `data` immutably when inputs change.
  // Depend on the specific input fields to avoid running on unrelated changes.
  useEffect(() => {
    const { asteroid, constantes } = simulation

    const diametroCrater = constantes.constanteDeAjuste * (constantes.gravedad ** -0.17) * (asteroid.velocidad ** 0.44) * (asteroid.diametro ** 0.78)
    const areaDeCrater = Math.PI * ((diametroCrater / 2) ** 2)

    const masaMeteorito = (4 / 3) * Math.PI * ((asteroid.diametro / 2) ** 3) * asteroid.densidad
    const energiaCineticaDelImpacto = 0.5 * masaMeteorito * (asteroid.velocidad ** 2)

    const energiaMegatones = energiaCineticaDelImpacto / 4.184e15

    const radioDeZonaDevastda = constantes.constanteEmpirica * (asteroid.diametro ** 0.78)
    const areaDevastada = Math.PI * (radioDeZonaDevastda ** 2)

    const energiaSismicaAcoplada = constantes.fraccionDeEnergiaAOndasSismicas * energiaCineticaDelImpacto
    const magnitudSismicaEquivalente = (2 / 3) * (Math.log10(Math.max(1, energiaSismicaAcoplada)) - 4.8)

    const alturaInicialDelTsunami = 1.4 * 0.1 * (asteroid.diametro ** 0.78) * (asteroid.velocidad ** 0.44)

    const radioDeBolaDeFuego = 0.0023 * energiaCineticaDelImpacto ** (1 / 3)

    const newData: ShowData = {
      diametroCrater,
      areaDeCrater,
      energiaMegatones,
      radioDeZonaDevastda,
      areaDevastada,
      magnitudSismicaEquivalente,
      alturaInicialDelTsunami,
      radioDeBolaDeFuego
    }

    // Shallow compare to avoid unnecessary updates
    const dataChanged = Object.keys(newData).some((k) => {
      // @ts-ignore
      return simulation.data[k] !== (newData as any)[k]
    })

    if (dataChanged) {
      setSimulation(prev => ({ ...prev, data: newData }))
    }
    // Only re-run when inputs that affect calculations change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },
    [
      simulation.asteroid.diametro,
      simulation.asteroid.velocidad,
      simulation.asteroid.densidad,
      simulation.constantes.constanteDeAjuste,
      simulation.constantes.gravedad,
      simulation.constantes.constanteEmpirica,
      simulation.constantes.fraccionDeEnergiaAOndasSismicas
    ])

  return (
    <simulationCtx.Provider value={{ simulation, setSimulation }}>
      {children}
    </simulationCtx.Provider>
  )
}

export const useSimulation = () => useContext(simulationCtx)