const NEO_FEED_URL = "https://api.nasa.gov/neo/rest/v1/feed";
const API_KEY = "Ylmk2SRwhflHf4GiwwZHGFFSyYZuSMm0JiYa5ciV"

// 🪐 Interfaces para tipar la respuesta básica de la API
interface NeoDiameter {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
}

interface CloseApproachData {
  close_approach_date: string;
  relative_velocity: { kilometers_per_second: string };
  miss_distance: { kilometers: string };
}

export interface NearEarthObject {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: { kilometers: NeoDiameter };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproachData[];
}

interface NeoFeedResponse {
  element_count: number;
  near_earth_objects: Record<string, NearEarthObject[]>;
}

// ⚙️ Función principal
export async function getNearEarthObjects(
  startDate: string,
  endDate: string
): Promise<NearEarthObject[]> {
  const url = `${NEO_FEED_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error HTTP ${res.status}: ${res.statusText}`);

  const data: NeoFeedResponse = await res.json();

  // Aplanar los objetos de todas las fechas
  const neos = Object.values(data.near_earth_objects).flat();

  console.log(`🛰️ Se encontraron ${neos.length} objetos cercanos a la Tierra.`);
  return neos;
}
