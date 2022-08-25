//Date
let currentDate = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[currentDate.getDay()];
let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();

let date = document.querySelector("#date");
date.innerHTML = `${day}, ${hour}:${minutes}`;

//Degrees
function changeToCelsius(event) {
  event.preventDefault();
  let changeCelcius = document.querySelector("#display-temp");
  changeCelcius.innerHTML = 18;
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius);

function changeToFahrenheit(event) {
  event.preventDefault();
  let changeFahrenheit = document.querySelector("#display-temp");
  changeFahrenheit.innerHTML = 65;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

//Search form
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#display-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#conditions").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}

function searchCity(city) {
  let apiKey = "9deff0d49319322e8b7031db0c883dd7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "9deff0d49319322e8b7031db0c883dd7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", citySearch);

//Location
let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Dublin");
