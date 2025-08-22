import React, { useState, useEffect } from "react";
import "./WeatherWidget.css";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Pune");
  const [inputCity, setInputCity] = useState("Pune");
  const [unit, setUnit] = useState("C"); // "C" for Celsius, "F" for Fahrenheit

  const fetchWeather = async (selectedCity) => {
    try {
      // Using WeatherAPI.com with your API key.
      const apiKey = "cd3c3be78e3b4695ae070638251706";
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${selectedCity}&aqi=no`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  // Fetch weather every time "city" changes.
  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleCityChange = (e) => {
    setInputCity(e.target.value);
  };

  const updateCity = () => {
    if (inputCity.trim() !== "") {
      setCity(inputCity.trim());
    }
  };

  const toggleUnit = () => {
    // Toggle between Celsius and Fahrenheit
    setUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  return (
    <div className="weather-widget">
      <p className="city-prompt">Enter the city for realtime weather:</p>
      <div className="city-input-container">
        <input
          type="text"
          value={inputCity}
          onChange={handleCityChange}
          placeholder="Enter city"
          className="city-input"
        />
        <button onClick={updateCity} className="change-city-btn">
          Change City
        </button>
      </div>
      <button onClick={toggleUnit} className="unit-toggle-btn">
        {unit === "C" ? "Show °F" : "Show °C"}
      </button>
      {error ? (
        <p className="weather-error">Error: {error}</p>
      ) : !weather ? (
        <p className="weather-loading">Loading weather...</p>
      ) : (
        <div className="weather-details">
          <h3 className="weather-city">
            {weather.location.name}, {weather.location.region},{" "}
            {weather.location.country}
          </h3>
          <p className="weather-temp">
            {unit === "C"
              ? `${Math.round(weather.current.temp_c)}°C`
              : `${Math.round(weather.current.temp_f)}°F`}
            &nbsp;
            <span className="weather-feelslike">
              (Feels like{" "}
              {unit === "C"
                ? `${Math.round(weather.current.feelslike_c)}°C`
                : `${Math.round(weather.current.feelslike_f)}°F`}
              )
            </span>
          </p>
          <p className="weather-condition">
            {weather.current.condition.text}
          </p>
          <img
            className="weather-icon"
            src={
              weather.current.condition.icon.startsWith("//")
                ? "https:" + weather.current.condition.icon
                : weather.current.condition.icon
            }
            alt={weather.current.condition.text}
          />
          <p className="weather-updated">
            Last updated: {weather.current.last_updated}
          </p>
          <p className="weather-humidity">
            Humidity: {weather.current.humidity}%
          </p>
          <p className="weather-wind">
            Wind: {weather.current.wind_kph} km/h
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;