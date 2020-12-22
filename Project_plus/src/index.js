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

function displayCity(event) {
  event.preventDefault();

  let apiKey = "e46c43536b53db7462b3c442cf88a50c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=e46c43536b53db7462b3c442cf88a50`;
  console.log(apiUrl);
}
//let possiblecity = document.querySelector("#type-city");
//let cityDisplayed = document.querySelector(".h5text");
// cityDisplayed.innerHTML = possiblecity.value;

/*function showTemp(response) {
  console.log(response.data);
  let temp = document.querySelector("#currentTemperature");
  let currentTemp = Math.round(response.data.main.temp);
  temp.innerHTML = `${currentTemp}`;
}

//axios.get(apiUrl).then(showTemp);

let city = document.querySelector("#search-form");
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
}

function showPosition(position) {
  let gross = document.querySelector("#gross"); //cambiare #gross
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  gross.innerHTML = ` ${lat}  ${lon}`;
  let apiKey1 = "e46c43536b53db7462b3c442cf88a50c";
  let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey1}&units=metric`;
}

//axios.get(apiUrl).then(showPosition);

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let geobutton = document.querySelector("#geobutton");
geobutton.addEventListener("click", getCurrentPosition);*/
