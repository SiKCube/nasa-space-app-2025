import axios from "axios"
const apiKey = '7tlm59CgKUKUBOEB7OPF1HuSIXQBDZCEELJ35a7h';

export async function getAllNEOs(page: number | null, size: number | null) {
    const url = `https://api.nasa.gov/neo/rest/v1/neo/browse/?page=${page ?? 0}&size=${size ?? 0}&api_key=${apiKey}`;
    const response = await axios(url);

    if (!response.status) return { error: "Error" }

    const neos = response.data.near_earth_objects.map((neo: any) => {
      const kd = neo.estimated_diameter?.kilometers;
      const diameter = kd
        ? { minKm: kd.estimated_diameter_min, maxKm: kd.estimated_diameter_max }
        : null;

      // Obtener datos de aproximación si existen
      const cad = (neo.close_approach_data && neo.close_approach_data[0]) || {};
      const velocity = cad.relative_velocity
        ? {
          kmh: parseFloat(cad.relative_velocity.kilometers_per_hour),
          kms: parseFloat(cad.relative_velocity.kilometers_per_second)
        }
        : null;

      const missDistance = cad.miss_distance ? parseFloat(cad.miss_distance.kilometers) : null;
      const approach_date = cad.close_approach_date || null;

      return {
        name: neo.name || '—',
        neo_reference_id: neo.neo_reference_id || '—',
        hazardous: neo.is_potentially_hazardous_asteroid || false,
        diameter,
        velocity,
        miss_distance: missDistance,
        approach_date
      };
    });

    return { page: response.data.page.number, size: response.data.near_earth_objects.length, neos }
  
}

export async function getOneNEO(id: string) {
  try {
    const url = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      return { error: response.statusText }
    }

    const data = await response.json();

    // Extraer datos relevantes
    const kd = data.estimated_diameter?.kilometers;
    const diameter = kd
      ? { minKm: kd.estimated_diameter_min, maxKm: kd.estimated_diameter_max }
      : null;

    const cad = data.close_approach_data?.[0] || {};
    const velocity = cad.relative_velocity
      ? {
        kmh: parseFloat(cad.relative_velocity.kilometers_per_hour),
        kms: parseFloat(cad.relative_velocity.kilometers_per_second),
      }
      : null;

    const missDistance = cad.miss_distance
      ? parseFloat(cad.miss_distance.kilometers)
      : null;

    const result = {
      name: data.name,
      neo_reference_id: data.neo_reference_id,
      is_potentially_hazardous: data.is_potentially_hazardous_asteroid,
      absolute_magnitude_h: data.absolute_magnitude_h,
      diameter,
      velocity,
      miss_distance: missDistance,
      approach_date: cad.close_approach_date || null,
    };

    return result
  } catch (error) {
    return { error: "Error al hacer fetch"}
  }
}

