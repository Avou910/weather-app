import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useState, useEffect } from 'react';
import WeatherListItem from './weatherListItem';

const API_KEY = '1b4ab700b412c8355c58023eb241af21';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=';

const WeatherForecastScreen = () => {
  const [weatherForecast, setWeatherForecast] = useState({
    city: { name: 'Weather forecast' },
  });

  const [city, setCity] = useState('');

  const fetchWeatherForecast = async () => {
    try {
      const response = await fetch(API_URL + city + '&appid=' + API_KEY);
      if (!response.ok) {
        throw new Error('Failed to fetch weather forecast');
      }
      const jsonWeatherObject = await response.json();
      setWeatherForecast(jsonWeatherObject);
    } catch (err) {
      console.log('Error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}> {weatherForecast.city.name} </Text>
      <FlatList
        data={weatherForecast.list}
        renderItem={({ item }) => (
          <WeatherListItem
            style={styles.textContainer}
            time={item.dt_txt}
            description={item.weather[0].main}
            temperature={(item.main.temp - 273.15).toFixed(1)}
          />
        )}
      />

      <TextInput
        placeholder="Enter city name"
        value={city}
        onChangeText={(text) => setCity(text)}
        style={{ padding: 50, textAlign: 'center', fontSize: 16 }}
      />

      <Button title="Fetch forecast" onPress={() => fetchWeatherForecast()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 20,
    fontSize: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#030303',
    textAlign: 'center',
  },
});

export default WeatherForecastScreen;
