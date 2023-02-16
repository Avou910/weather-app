import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CurrentWeatherScreen from './components/CurrentWeatherScreen';
import WeatherForecastScreen from './components/WeatherForecastScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Forecast" component={WeatherForecastScreen} />
        <Tab.Screen name="Current" component={CurrentWeatherScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;
