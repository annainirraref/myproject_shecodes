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
  document.querySelector("#citydisplayed").innerHTML = response.data.name;
  document.querySelector("#currentTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#maxtemp").innerHTML = response.data.main.temp_max;
  document.querySelector("#mintemp").innerHTML = response.data.main.temp_min;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#iconElement")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#iconElement")
    .setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "e46c43536b53db7462b3c442cf88a50c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e46c43536b53db7462b3c442cf88a50c&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayCity(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#type-city").value;
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("click", displayCity);

searchCity("New York"); //to have a default city when you open the website

function searchLocation(position) {
  let apiKey = "e46c43536b53db7462b3c442cf88a50c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let geobutton = document.querySelector("#geobutton");
geobutton.addEventListener("click", getCurrentLocation);

//let possiblecity = document.querySelector("#type-city");
//let cityDisplayed = document.querySelector(".h5text");
// cityDisplayed.innerHTML = possiblecity.value;

/*let city = document.querySelector("#search-form");
city.addEventListener("submit", displayCity);
city.addEventListener("submit", showTemp);
function displayTempCelsius(fare) {
  let tempFare = fare;
  let fToCel = ((tempFare - 32) * 5) / 9;
  console.log(fToCel);
  let tC = document.querySelector(".third-card-title .temperature");
  tC.innerHTML = fToCel;
}

function displayTempFare(celsius) {
  let tempCelsius = celsius;
  let tempFare = (tempCelsius * 9) / 5 + 32;
  console.log(tempFare);
  let tF = document.querySelector(".third-card-title .temperature");
  tF.innerHTML = tempFare;
}*/
