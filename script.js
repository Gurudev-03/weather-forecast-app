const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const message = document.getElementById("message");
const result = document.getElementById("weather-result");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const celsiusButton = document.getElementById("celsius-button");
const fahrenheitButton = document.getElementById("fahrenheit-button");

let currentWeather = null;
let currentUnit = "C";

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (!city) {
    message.textContent = "Please enter a city name.";
    return;
  }

  searchButton.disabled = true;
  message.textContent = "Loading weather...";
  result.classList.add("hidden");

  try {
    const locationResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );
    if (!locationResponse.ok) throw new Error("Could not search for that city.");

    const locationData = await locationResponse.json();
    if (!locationData.results || locationData.results.length === 0) {
      throw new Error("City not found. Check the spelling and try again.");
    }

    const place = locationData.results[0];
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`
    );
    if (!weatherResponse.ok) throw new Error("Could not load weather data.");

    const weatherData = await weatherResponse.json();
    currentWeather = {
      city: `${place.name}${place.admin1 ? ", " + place.admin1 : ""}, ${place.country}`,
      temperature: weatherData.current.temperature_2m,
      feelsLike: weatherData.current.apparent_temperature,
      humidity: weatherData.current.relative_humidity_2m,
      wind: weatherData.current.wind_speed_10m,
      code: weatherData.current.weather_code,
      isDay: weatherData.current.is_day
    };

    currentUnit = "C";
    renderWeather();
    message.textContent = "";
    result.classList.remove("hidden");
  } catch (error) {
    message.textContent = error.message || "Something went wrong. Please try again.";
  } finally {
    searchButton.disabled = false;
  }
});

function getWeatherDescription(code) {
  if (code === 0) return "Clear sky";
  if ([1, 2, 3].includes(code)) return "Partly cloudy";
  if ([45, 48].includes(code)) return "Fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";
  return "Weather conditions unavailable";
}

function convertTemperature(value, unit) {
  // BUG: This formula is incorrect. Fix it in your bug-fix branch.
  if (unit === "F") {
    return (value * 9 / 5) + 32;
  }
  return value;
}

function renderWeather() {
  if (!currentWeather) return;

  const temp = convertTemperature(currentWeather.temperature, currentUnit);
  const feels = convertTemperature(currentWeather.feelsLike, currentUnit);

  cityName.textContent = currentWeather.city;
  temperature.textContent = `${Math.round(temp)}°${currentUnit}`;
  feelsLike.textContent = `${Math.round(feels)}°${currentUnit}`;
  humidity.textContent = `${currentWeather.humidity}%`;
  wind.textContent = `${currentWeather.wind} km/h`;
  description.textContent = getWeatherDescription(currentWeather.code);
  document.getElementById("weather-icon").textContent =
    currentWeather.code === 0 ? (currentWeather.isDay ? "☀️" : "🌙") : "🌤️";

  celsiusButton.classList.toggle("active", currentUnit === "C");
  fahrenheitButton.classList.toggle("active", currentUnit === "F");
}

celsiusButton.addEventListener("click", () => {
  currentUnit = "C";
  renderWeather();
});

fahrenheitButton.addEventListener("click", () => {
  currentUnit = "F";
  renderWeather();
});
