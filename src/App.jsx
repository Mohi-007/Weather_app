import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeatherItem from "./components/HourlyWeather";
import { weatherCodes } from "./constants";
import { useEffect, useRef, useState } from "react";
import NoResultsDiv from "./components/NoResultsDiv";
const App = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecasts, setHourlyForecasts] = useState([]);
  const [hasNoResults, setHasNoResults] = useState(false);
  const searchInputRef = useRef(null);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const filterHourlyForecast = (hourlyData) => {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const next24Hours = currentTimestamp + 24 * 60 * 60;
    // Filter the hourly data to only include the next 24 hours
    const next24HoursData = hourlyData.filter(({ dt }) => {
      return dt >= currentTimestamp && dt <= next24Hours;
    });
    setHourlyForecasts(next24HoursData);
  };
  // Fetches weather details based on the API URL
  const getWeatherDetails = async (API_URL) => {
    setHasNoResults(false);
    window.innerWidth <= 768 && searchInputRef.current.blur();
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error();
      const data = await response.json();
      // Extract current weather data from the first forecast item
      const currentData = data.list[0];
      const temperature = Math.floor(currentData.main.temp);
      const description = currentData.weather[0].description;
      const weatherIcon = Object.keys(weatherCodes).find((icon) =>
        weatherCodes[icon].includes(currentData.weather[0].id)
      );
      setCurrentWeather({ temperature, description, weatherIcon });
      
      searchInputRef.current.value = data.city.name;
      filterHourlyForecast(data.list);
    } catch (error) {
      // Set setHasNoResults state if there's an error
      console.error("Error fetching weather data:", error);
      setHasNoResults(true);
    }
  };
  // Fetch default city (London) weather data on initial render
  useEffect(() => {
    const defaultCity = "London";
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&appid=${API_KEY}&units=metric`;
    getWeatherDetails(API_URL);
  }, []);
  return (
    <div className="container">
      {/* Search section */}
      <SearchSection
        getWeatherDetails={getWeatherDetails}
        searchInputRef={searchInputRef}
      />
      {/* Conditionally render based on hasNoResults state */}
      {hasNoResults ? (
        <NoResultsDiv />
      ) : (
        <div className="weather-section">
          {/* Current weather */}
          <CurrentWeather currentWeather={currentWeather} />
          {/* Hourly weather forecast list */}
          <div className="hourly-forecast">
            <ul className="weather-list">
              {hourlyForecasts.map((hourlyWeather) => (
                <HourlyWeatherItem
                  key={hourlyWeather.dt}
                  hourlyWeather={hourlyWeather}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
