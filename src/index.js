/* Формат даты */
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuersday",
    "Wendnesday",
    "Thursdae",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

let h4 = document.querySelector("h4");
let date = new Date();

h4.innerHTML = formatDate(date);

/* Дополнительная информация о погоде */

function displayWeatherCondition(response) {
  let iconElement = document.querySelector("#icon");
  let temperatureElement = document.querySelector("#temperature");
  celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celciusTemperature);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  console.log(response.data);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
/* Поиск города */

function handleSabmit(event) {
  event.preventDefault();
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let units = "metric";
  let searchInput = document.querySelector("#city-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(displayWeatherCondition);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSabmit);

function search(response) {
  let cityElement = document.querySelector("#city");
  let cityName = response.data.name;
  h3.innerHTML = `📍 ${cityName}`;
}

/* Текущее местоположение */
function searchLocation(position) {
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#сurrent-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

/* Конвертация температуры в Фаренгейт */

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  // remove the active class the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function search(city) {
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
search("New York");
