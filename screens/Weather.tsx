import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchWeather } from '../api/openMeteoApi'; // Importa la nueva API

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!city) {
      setError('Por favor, ingrese una ciudad.');
      return;
    }
    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'Error desconocido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscador de Clima</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese una ciudad"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Buscar" onPress={handleSearch} />

      {loading && <ActivityIndicator size="large" style={styles.loader} />}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.cityName}>{weatherData.cityName}</Text>
          <Text style={styles.tempText}>{Math.round(weatherData.temperature)}°C</Text>
          <Text style={styles.weatherCodeText}>Código de clima: {weatherData.weatherCode}</Text>
          {/* Aquí podrías añadir un componente para mostrar un icono basado en el weatherCode */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  tempText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  weatherCodeText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});

export default Weather;