var searchEl = document.getElementById("submit");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humdEl = document.getElementById("humid");
var dateEl = document.getElementById("date");

var currentHeading = document.getElementById("current-heading");
var currentWeather = document.getElementById("current-weather");

//Click event calling function
function searchByCity(event) {
  //check here
  event.preventDefault();
  var city = document.querySelector("#city-search").value;

  if (city) {
    getFeaturedRepos(city);
  }
}

//Get Current weather input from user
var getFeaturedRepos = function (cityName) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    " &units=metric&limit=5&appid=cb4e1eb2ddfd04be05240608cc0d201b";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var city = data.name;
      var latitude = data.coord.lat;
      var longitude = data.coord.lon;
      var todaysDate = dayjs().format("DD/MM/YYYY");

      //Display hidden block currentweather and forecast
      currentWeather.classList.remove("d-none");
      var forecast = document.getElementById("forecast");
      forecast.classList.remove("d-none");

      //Display current weather
      currentHeading.textContent = "Current Weather in " + city;
      dateEl.textContent = `Today is :  ${todaysDate}`;
      var weatherIconEl = document.createElement("img");
      var iconLink = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      weatherIconEl.setAttribute("src", iconLink);
      dateEl.append(weatherIconEl);
      tempEl.textContent = `Temp is:  ${data.main.temp} °C`;
      windEl.textContent = `Wind is:  ${data.wind.speed} km/h`;
      humdEl.textContent = `Humidity is:  ${data.main.humidity}%`;

      forecastWeather(latitude, longitude);
    });
};

//Fetch data for Forecast weather
function forecastWeather(lat, lon) {
  var forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=cb4e1eb2ddfd04be05240608cc0d201b`;
  fetch(forecastAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayForecast(data);
    });
}

//Display forecast weather for 5 days
function displayForecast(data) {
  //forecast weather --First Day
  var temp1 = document.getElementById("card1-temp");
  var wind1 = document.getElementById("card1-wind");
  var humid1 = document.getElementById("card1-humid");
  //  var date1 = document.getElementById("card1-date");
  var iconLink = `https://api.openweathermap.org/img/w/${data.list[1].weather[0].icon}.png`;
  document.getElementById("card1-icon").src = iconLink;
  //
  // date1.textContent = `Date is:  ${data.list[1].dt_txt}`;
  temp1.textContent = `Temp is:  ${data.list[1].main.temp} °C`;
  wind1.textContent = `Wind is:  ${data.list[1].wind.speed} km/h`;
  humid1.textContent = `Humidity is:  ${data.list[1].main.humidity}%`;

  //forecast weather --second Day
  var temp2 = document.getElementById("card2-temp");
  var wind2 = document.getElementById("card2-wind");
  var humid2 = document.getElementById("card2-humid");
  var iconLink = `https://api.openweathermap.org/img/w/${data.list[9].weather[0].icon}.png`;
  document.getElementById("card2-icon").src = iconLink;
  temp2.textContent = `Temp is:  ${data.list[9].main.temp} °C`;
  wind2.textContent = `Wind is:  ${data.list[9].wind.speed} km/h`;
  humid2.textContent = `Humidity is:  ${data.list[9].main.humidity}%`;

  //forecast weather --third Day
  var temp3 = document.getElementById("card3-temp");
  var wind3 = document.getElementById("card3-wind");
  var humid3 = document.getElementById("card3-humid");
  var iconLink = `https://api.openweathermap.org/img/w/${data.list[17].weather[0].icon}.png`;
  document.getElementById("card3-icon").src = iconLink;
  temp3.textContent = `Temp is:  ${data.list[17].main.temp} °C`;
  wind3.textContent = `Wind is:  ${data.list[17].wind.speed} km/h`;
  humid3.textContent = `Humidity is:  ${data.list[17].main.humidity}%`;

  //forecast weather --fourth Day
  var temp4 = document.getElementById("card4-temp");
  var wind4 = document.getElementById("card4-wind");
  var humid4 = document.getElementById("card4-humid");
  var iconLink = `https://api.openweathermap.org/img/w/${data.list[25].weather[0].icon}.png`;
  document.getElementById("card4-icon").src = iconLink;
  temp4.textContent = `Temp is:  ${data.list[25].main.temp} °C`;
  wind4.textContent = `Wind is:  ${data.list[25].wind.speed} km/h`;
  humid4.textContent = `Humidity is:  ${data.list[25].main.humidity}%`;

  //forecast weather --fifth Day
  var temp5 = document.getElementById("card5-temp");
  var wind5 = document.getElementById("card5-wind");
  var humid5 = document.getElementById("card5-humid");
  var iconLink = `https://api.openweathermap.org/img/w/${data.list[33].weather[0].icon}.png`;
  document.getElementById("card5-icon").src = iconLink;
  temp5.textContent = `Temp is:  ${data.list[33].main.temp} °C`;
  wind5.textContent = `Wind is:  ${data.list[33].wind.speed} km/h`;
  humid5.textContent = `Humidity is:  ${data.list[33].main.humidity}%`;
}

searchEl.addEventListener("click", searchByCity);
