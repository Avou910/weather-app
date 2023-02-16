import { View, Text, Image, Stylesheet } from 'react-native';

const Icons = {
  Clear: require('../assets/sun.png'),
  Clouds: require('../assets/cloudy.png'),
  Rain: require('../assets/rain.png'),
  Night: require('../assets/night.png'),
  Thunder: require('../assets/thunder.png'),
  Snow: require('../assets/snow.png'),
};

const WeatherListItem = ({ time, description, temperature, icon }) => {
  return (
    <View>
      <Text>{time}</Text>
      <Text>{description}</Text>
      <Text>{temperature}</Text>
      <Image source={Icons[description] || require('../assets/default.png')} />
    </View>
  );
};

export default WeatherListItem;
