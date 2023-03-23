var searchEl = document.getElementById("submit");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humdEl = document.getElementById("humid");
var dateEl = document.getElementById("date");
//var searchForm = document.getElementById("search-form");
var historyButton = document.getElementById("history-btn");

var currentHeading = document.getElementById("current-heading");
var currentWeather = document.getElementById("current-weather");

//Click event calling function
function searchByCity(event) {
  //check here
  event.preventDefault();
  var city = document.getElementById("city-search").value.trim();
  //city = city.trim();
  if (city) {
    getWeatherApi(city);
  } else {
    alert("Please enter a valid city name");
  }

  saveSearchCity(city);
}

//Get Current weather input from user
var getWeatherApi = function (cityName) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    " &units=metric&limit=5&appid=cb4e1eb2ddfd04be05240608cc0d201b";
  fetch(requestUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          currrentWeather(data);
        });
      } else {
        alert("Error." + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Wrong City Name!!");
    });
};

var currrentWeather = function (data) {
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
};

//Fetch data for Forecast weather
function forecastWeather(lat, lon) {
  var forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=cb4e1eb2ddfd04be05240608cc0d201b`;
  fetch(forecastAPI)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          //console.log(data);
          displayForecast(data);
        });
      } else {
        alert("Error." + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to API");
    });
}

function displayForecast(data) {
  console.log(data);
  var j = 0;
  for (var i = 1; i < 6; i++) {
    var temp = document.getElementById("card" + i + "-temp");
    var wind = document.getElementById("card" + i + "-wind");
    var humid = document.getElementById("card" + i + "-humid");
    var date = document.getElementById("card" + i + "-date");
    var iconLink = `https://api.openweathermap.org/img/w/${data.list[j].weather[0].icon}.png`;
    document.getElementById("card" + i + "-icon").src = iconLink;
    var dateVal = data.list[j].dt_txt.split(" ");
    var foreDate = dayjs(dateVal[0]).format("DD/MM/YYYY");
    date.textContent = foreDate;
    temp.textContent = `Temp is:  ${data.list[j].main.temp} °C`;
    wind.textContent = `Wind is:  ${data.list[j].wind.speed} km/h`;
    humid.textContent = `Humidity is:  ${data.list[j].main.humidity}%`;
    j = j + 8;
  }
}

function saveSearchCity(cityName) {
  var searchCity = JSON.parse(localStorage.getItem("searchCity") || "[]");
  searchCity.push(cityName);
  localStorage.setItem("searchCity", JSON.stringify(searchCity));
  displaySearchCity();
}

function displaySearchCity() {
  var searchCity = JSON.parse(localStorage.getItem("searchCity")) || [];
  console.log(searchCity);
  // for (var i = 0; i < searchCity.length; i++) {
  //   var cityName = searchCity[i];
  //   var searchHistoryButton = document.createElement("button");

  //   searchHistoryButton.setAttribute("value", cityName);
  //   searchHistoryButton.setAttribute(
  //     "style",
  //     "padding:8px; margin:8px;font-size:16px;width:100%;background-color:gray"
  //   );
  //   searchHistoryButton.textContent = cityName;
  //   searchForm.appendChild(searchHistoryButton);
  // }
  // searchHistoryButton.addEventListener("click", searchByCity);
}
//

function deleteSearchHistory() {
  localStorage.clear();
}

//Local Storage to be done
//display history in buttons nad click on that button again go for search
//delete localstorage

searchEl.addEventListener("click", searchByCity);
historyButton.addEventListener("click", searchByCity);
