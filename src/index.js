function formatDate(today) {
  let options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let today1 = new Date();
  document.getElementById("currentday").innerHTML = today1.toLocaleDateString(
    "en-GB",
    options
  );
}
formatDate();

function displayWeatherCondition(response) {
  console.log(response.data.name);

  let weatherIcons = {
    "01d": "src/icons/sunny.png",
    "01n": "src/icons/clear sky.png",
    "02d": "src/icons/few clouds d.png",
    "02n": "src/icons/few clouds n.png",
    "03d": "src/icons/scattered clouds.png",
    "03n": "src/icons/scattered clouds.png",
    "04d": "src/icons/light clouds d.png",
    "04n": "src/icons/light clouds n.png",
    "09d": "src/icons/shower rain d.png",
    "09n": "src/icons/shower rain n.png",
    "10d": "src/icons/rain.png",
    "10n": "src/icons/rain.png",
    "11d": "src/icons/thunder.png",
    "11n": "src/icons/thunder.png",
    "13d": "src/icons/snow.png",
    "13n": "src/icons/snow.png",
    "50d": "src/icons/mist.png",
    "50n": "src/icons/mist.png",
  };

  tempCelsius = response.data.main.temp;

  document.querySelector("#citydisplayed").innerHTML = response.data.name;
  document.querySelector("#currentTemperature").innerHTML = Math.round(
    tempCelsius
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#maxtemp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#mintemp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#iconElement")
    .setAttribute("src", weatherIcons[response.data.weather[0].icon]);
  document
    .querySelector("#iconElement")
    .setAttribute("alt", response.data.weather[0].description);

  document.querySelector("#feelslike").innerHTML = Math.round(
    response.data.main.feels_like
  );
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    let weatherIcons = {
      "01d": "src/icons/sunny.png",
      "01n": "src/icons/clear sky.png",
      "02d": "src/icons/few clouds d.png",
      "02n": "src/icons/few clouds n.png",
      "03d": "src/icons/scattered clouds.png",
      "03n": "src/icons/scattered clouds.png",
      "04d": "src/icons/light clouds d.png",
      "04n": "src/icons/light clouds n.png",
      "09d": "src/icons/shower rain d.png",
      "09n": "src/icons/shower rain n.png",
      "10d": "src/icons/rain.png",
      "10n": "src/icons/rain.png",
      "11d": "src/icons/thunder.png",
      "11n": "src/icons/thunder.png",
      "13d": "src/icons/snow.png",
      "13n": "src/icons/snow.png",
      "50d": "src/icons/mist.png",
      "50n": "src/icons/mist.png",
    };
    forecastElement.innerHTML += `
    <div class="card card-day1" style="width: 200px;">
  <div class="card-body">
    <h5 class="card-title">${formatHours(forecast.dt * 1000)}</h5>
    <img class="img-day1" id="iconElements" src="${
      weatherIcons[forecast.weather[0].icon]
    }" class="card-img-top" alt="cloudy">
    <p class="card-text-days">▲ ${Math.round(
      forecast.main.temp_max
    )}° C <br /> ▼ ${Math.round(forecast.main.temp_min)}° C</p>
  </div>
                  </div>
    `;
  }
}

function searchCity(city) {
  let apiKey = "e46c43536b53db7462b3c442cf88a50c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e46c43536b53db7462b3c442cf88a50c&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  let apiUrl1 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric `;
  axios.get(apiUrl1).then(displayForecast);
}

function displayCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#type-city");
  searchCity(cityInputElement.value);
}

function displayFare(event) {
  event.preventDefault();
  let tF = document.querySelector(".third-card-title .temperature");
  let tempFare = (tempCelsius * 9) / 5 + 32;
  tF.innerHTML = Math.round(tempFare);
}

function displayCels(event) {
  event.preventDefault();
  let tC = document.querySelector("#currentTemperature");
  tC.innerHTML = Math.round(tempCelsius);
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("click", displayCity);

searchCity("New York"); //to have a default city when you open the website

function searchLocation(position) {
  let apiKey = "e46c43536b53db7462b3c442cf88a50c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);

  let apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl2).then(displayForecast);
}

function error(err) {
  alert(`ERROR(${err.code}): ${err.message}`);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation, error);
}

let geobutton = document.querySelector("#geobutton");
geobutton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#tempFar");
fahrenheitLink.addEventListener("click", displayFare);

let celsiusLink = document.querySelector("#celsiusTemp");
celsiusLink.addEventListener("click", displayCels);

let tempCelsius = null;

// to be put inside displayForecast function
/*let weatherIcons = {
  "01d":"src/icons/sunny.png", 
  "01n":"src/icons/clear sky.png",
  "02d":"src/icons/few clouds d.png",
  "02n":"src/icons/few clouds n.png",
  "03d":"src/icons/scattered clouds.png",
  "03n":"src/icons/scattered clouds.png",
  "04d":"src/icons/light clouds d.png",
  "04n":"src/icons/light clouds n.png",
  "09d":"src/icons/shower rain d.png", 
  "09n":"src/icons/shower rain n.png",
  "10d": "src/icons/rain.png",
  "10n": "src/icons/rain.png",
  "11d":"src/icons/thunder.png",
  "11n":"src/icons/thunder.png",
  "13d":"src/icons/snow.png",
  "13n":"src/icons/snow.png",
  "50d":"src/icons/mist.png",
  "50n":"src/icons/mist.png"
};

document
    .querySelector("#iconElement")
    .setAttribute(
      "src",
      weatherIcons[response.data.weather[0].icon]
    );


    document
    .querySelector("#iconElements")
    .setAttribute(
      "src",
      weatherIcons[response.data.weather[0].icon]
    );*/
