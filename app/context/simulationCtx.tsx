import React, { createContext, useContext, useEffect, useState } from "react";

interface Asteroid {
  diametro: number
  velocidad: number
}

interface Constantes {
  constanteDeAjuste: number
  densidadDeMeteorito: number
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
  },
  constantes: {
    constanteDeAjuste: 1.161,
    constanteEmpirica: 1.5,
    densidadDeMeteorito: 3000,
    fraccionDeEnergiaAOndasSismicas: 0.05,
    gravedad: 9.81
  },
  data: {
    areaDeCrater: 0,
    areaDevastada: 0,
    diametroCrater: 0,
    energiaMegatones: 0,
    magnitudSismicaEquivalente: 0,
    radioDeZonaDevastda: 0
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

  useEffect(() => {
    const changeSimulation = simulation

    changeSimulation.data.diametroCrater = changeSimulation.constantes.constanteDeAjuste * (changeSimulation.constantes.gravedad ** -0.17) * (changeSimulation.asteroid.velocidad ** 0.44) * (changeSimulation.asteroid.diametro ** 0.78)
    
    changeSimulation.data.areaDeCrater = Math.PI * ((changeSimulation.data.diametroCrater / 2) ** 2)

    const masaMeteorito = 4/3 * Math.PI * ((changeSimulation.asteroid.diametro / 2) ** 3) * changeSimulation.constantes.densidadDeMeteorito
    const energiaCineticaDelImpacto = 1/2 * masaMeteorito * (changeSimulation.asteroid.velocidad ** 2)

    changeSimulation.data.energiaMegatones = energiaCineticaDelImpacto / 4.184e15

    changeSimulation.data.radioDeZonaDevastda = changeSimulation.constantes.constanteEmpirica * (changeSimulation.asteroid.diametro ** 0.78)

    changeSimulation.data.areaDevastada = Math.PI * (changeSimulation.data.radioDeZonaDevastda ** 2)

    const energiaSismicaAcoplada = changeSimulation.constantes.fraccionDeEnergiaAOndasSismicas * energiaCineticaDelImpacto

    changeSimulation.data.magnitudSismicaEquivalente = 2/3 * (Math.log10(energiaSismicaAcoplada) - 4.8)

    setSimulation(changeSimulation)
  }, [simulation])

  return (
    <simulationCtx.Provider value={{ simulation, setSimulation }}>
      {children}
    </simulationCtx.Provider>
  )
}

export const useSimulation = () => useContext(simulationCtx)