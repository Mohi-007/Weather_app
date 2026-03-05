import { weatherCodes } from "../constants";
const HourlyWeatherItem = ({ hourlyWeather }) => {
  // Extract and format temperature and time
  const temperature = Math.floor(hourlyWeather.main.temp);
  let time = hourlyWeather.dt_txt.split(" ")[1].substring(0, 5);
  // Find the appropriate weather icon
  const weatherIcon = Object.keys(weatherCodes).find((icon) =>
    weatherCodes[icon].includes(hourlyWeather.weather[0].id)
  );
  return (
    <li className="weather-item">
      <p className="time">{time}</p>
      <img src={`icons/${weatherIcon}.svg`} className="weather-icon" />
      <p className="temperature">{temperature}°</p>
    </li>
  );
};
export default HourlyWeatherItem;
