import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Location from 'expo-location';

const CurrentWeatherScreen = () => {
  const [weatherForecast, setWeatherForecast] = useState({});
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Location permission not granted');
      setLoading(false);
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const API_KEY = '1b4ab700b412c8355c58023eb241af21';
    const API_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=`;
    try {
      const response = await fetch(API_URL + API_KEY);
      const jsonWeatherObject = await response.json();
      setWeatherForecast(jsonWeatherObject);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Location: {weatherForecast.name}</Text>
      {weatherForecast.main && (
        <Text style={styles.text}>
          Temperature: {(weatherForecast.main.temp - 273.15).toFixed(1)}°C
        </Text>
      )}

      {weatherForecast.main && (
        <Text style={styles.text}>
          Feels like:{(weatherForecast.main.feels_like - 273.15).toFixed(1)}°C
        </Text>
      )}

      <Button title="Check current Weather" onPress={getWeather} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#030303',
    textAlign: 'center',
  },
});

export default CurrentWeatherScreen;
