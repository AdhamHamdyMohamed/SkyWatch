// Weather API Configuration
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "9285d1263d76d6ca8771d8b2a8e3313e";

// Theme Toggle - GOOD
function toggleTheme() {
  const root = document.documentElement;
  const themeIcon = document.getElementById("theme-icon");
  const currentTheme = root.getAttribute("data-theme");

  if (currentTheme === "dark") {
    root.removeAttribute("data-theme");
    themeIcon.src =
      "/assets/moon_stars_35dp_FFFFFF_FILL0_wght400_GRAD0_opsz40.svg";
  } else {
    root.setAttribute("data-theme", "dark");
    themeIcon.src = "/assets/sunny_35dp_FFFFFF_FILL0_wght400_GRAD0_opsz40.svg";
  }
}

// Search Weather Function - GOOD structure
async function searchWeather() {
  const cityInput = document.getElementById("cityInput");
  const city = cityInput.value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  try {
    const response = await fetch(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    // Error handling is good
    document.getElementById("weatherContent").innerHTML = `
      <div class="text-center">
        <div class="weather-icon">
          <img class='err' src="/assets/message/Errores-Web-404-403-503-502-401.-Significado-y-soluciones-1.jpg"/>
        </div>
        <p class="content-text">City not found. Please try again.</p>
      </div>
    `;
  }
}

// Display Weather Function - GOOD
function displayWeather(data) {
  const weatherContent = document.getElementById("weatherContent");
  const weatherIcon = getWeatherIcon(data.weather[0].main);

  weatherContent.innerHTML = `
    <div class="text-center">
      <div class="weather-icon">${weatherIcon}</div>
      <h2 class="text-white mb-3">${data.name}, ${data.sys.country}</h2>
      <div class="content-text">
        <p><strong>Temperature:</strong> ${Math.round(data.main.temp)}°C</p>
        <p><strong>Feels Like:</strong> ${Math.round(
          data.main.feels_like
        )}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      </div>
    </div>
  `;
}

// Get Weather Icon - GOOD approach
function getWeatherIcon(weather) {
  const icons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Fog: "🌫️",
    Haze: "🌫️",
  };
  return icons[weather] || "🌤️";
}

// Enter key support - GOOD
document.getElementById("cityInput").addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    searchWeather();
  }
});
