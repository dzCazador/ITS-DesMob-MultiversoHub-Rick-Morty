import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// Función para obtener la latitud y longitud de una ciudad
const getCoordinates = async (cityName) => {
  try {
    const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`);
    if (response.data.results && response.data.results.length > 0) {
      const city = response.data.results[0];
      return {
        latitude: city.latitude,
        longitude: city.longitude,
        name: city.name,
      };
    }
    return null;
  } catch (error) {
    console.error("Error al obtener las coordenadas:", error);
    throw new Error('No se pudo encontrar la ciudad.');
  }
};

// Función principal para obtener el clima usando coordenadas
export const fetchWeather = async (cityName) => {
  try {
    const coords = await getCoordinates(cityName);
    if (!coords) {
      throw new Error('No se pudo encontrar la ciudad.');
    }

    const { latitude, longitude, name } = coords;

    const response = await axios.get(BASE_URL, {
      params: {
        latitude: latitude,
        longitude: longitude,
        current: 'temperature_2m,weather_code', // Campos que queremos
        timezone: 'auto',
        temperature_unit: 'celsius',
      },
    });

    const weatherData = response.data;

    return {
      cityName: name,
      temperature: weatherData.current.temperature_2m,
      weatherCode: weatherData.current.weather_code,
    };

  } catch (error) {
    console.error("Error al obtener los datos del clima:", error);
    throw error;
  }
};