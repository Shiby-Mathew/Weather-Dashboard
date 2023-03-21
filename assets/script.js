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
  city = city.trim();

  if (city) {
    getFeaturedRepos(city);
  } else {
    alert("Please enter a valid city name");
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
  var j = 1;
  for (var i = 1; i < 6; i++) {
    var temp = document.getElementById("card" + i + "-temp");
    var wind = document.getElementById("card" + i + "-wind");
    var humid = document.getElementById("card" + i + "-humid");
    var date = document.getElementById("card" + i + "-date");
    var iconLink = `https://api.openweathermap.org/img/w/${data.list[j].weather[0].icon}.png`;
    document.getElementById("card" + i + "-icon").src = iconLink;
    //
    // date1.textContent = `Date is:  ${data.list[1].dt_txt}`;
    var dateVal = data.list[j].dt_txt.split(" ");
    var foreDate = dayjs(dateVal[0]).format("DD/MM/YYYY");
    date.textContent = foreDate;
    temp.textContent = `Temp is:  ${data.list[j].main.temp} °C`;
    wind.textContent = `Wind is:  ${data.list[j].wind.speed} km/h`;
    humid.textContent = `Humidity is:  ${data.list[j].main.humidity}%`;
    j = j + 8;
  }
}

//Local Storage to be done

//display history in buttons nad click on that button again go for search
//delete localstorage

searchEl.addEventListener("click", searchByCity);
