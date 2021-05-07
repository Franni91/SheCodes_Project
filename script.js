function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let weekDay = days[date.getDay()];
  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${weekDay} ${day}. ${month} ${year}, ${hour}:${minutes}`;
}

let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;

  document.querySelector("#maxTemp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#minTemp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(city) {
  let apiKey = "57f90989b2361880c06c7c47952cf68c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;

  axios.get(`${apiUrl}&appid=${apiKey}&units=${units}`).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("Frankfurt am Main");

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${latitude}, ${longitude}`;
  let apiKey = "57f90989b2361880c06c7c47952cf68c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}`;

  axios.get(`${apiUrl}&appid=${apiKey}&units=${units}`).then(showTemperature);
}

let current = document.querySelector("#current");
current.addEventListener("click", getCurrentLocation);
