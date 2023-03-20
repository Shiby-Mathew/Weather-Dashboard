var searchEl = document.getElementById("submit");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humdEl = document.getElementById("humid");
var dateEl = document.getElementById("date");
//var weatherIconEl = document.getElementById("img");

var currentHeading = document.getElementById("current-heading");
var currentWeather = document.getElementById("current-weather");

// var requestUrl =
//   "http://api.openweathermap.org/geo/1.0/direct?q=Sydney&limit=5&appid=cb4e1eb2ddfd04be05240608cc0d201b";
//"http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid=cb4e1eb2ddfd04be05240608cc0d201b";
//9cf34e2a28704208b105434feb2d65c2

function searchByCity(event) {
  event.preventDefault();
  var cityName = document.querySelector("#city-search").value;

  if (cityName) {
    getFeaturedRepos(cityName);
  }
}

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
      var lat = data.coord.lat;
      var lon = data.coord.lon;

      var todaysDate = dayjs().format("DD/MM/YYYY");
      var currentData = document.getElementById("current-data");
      currentData.classList.remove("d-none");
      currentHeading.textContent = "Current Weather in " + city;
      dateEl.textContent = `Today is:  ${todaysDate}`;
      var weatherIconEl = document.createElement("img");
      var iconLink = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      weatherIconEl.setAttribute("src", iconLink);

      // weatherIconEl.setAttribute(
      //   "src",
      //   `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
      // );

      dateEl.append(weatherIconEl);
      tempEl.textContent = `Temp is:  ${data.main.temp}`;
      windEl.textContent = `Wind is:  ${data.wind.speed}`;
      humdEl.textContent = `Humidity is:  ${data.main.humidity}`;

      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=cb4e1eb2ddfd04be05240608cc0d201b`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          // Build forecast weather

          //forecast weather --First Day
          var display1 = document.getElementById("card1");
          display1.classList.remove("d-none");

          var temp1 = document.getElementById("card1-temp");
          var wind1 = document.getElementById("card1-wind");
          var humid1 = document.getElementById("card1-humid");
          //  var date1 = document.getElementById("card1-date");
          var iconLink = `https://api.openweathermap.org/img/w/${data.list[1].weather[0].icon}.png`;
          document.getElementById("card1-icon").src = iconLink;
          //
          // date1.textContent = `Date is:  ${data.list[1].dt_txt}`;
          temp1.textContent = `Temp is:  ${data.list[1].main.temp}`;
          wind1.textContent = `Wind is:  ${data.list[1].wind.speed}`;
          humid1.textContent = `Humidity is:  ${data.list[1].main.humidity}`;

          //forecast weather --second Day
          var display2 = document.getElementById("card2");
          display2.classList.remove("d-none");
          var temp2 = document.getElementById("card2-temp");
          var wind2 = document.getElementById("card2-wind");
          var humid2 = document.getElementById("card2-humid");
          var iconLink = `https://api.openweathermap.org/img/w/${data.list[9].weather[0].icon}.png`;
          document.getElementById("card2-icon").src = iconLink;
          temp2.textContent = `Temp is:  ${data.list[9].main.temp}`;
          wind2.textContent = `Wind is:  ${data.list[9].wind.speed}`;
          humid2.textContent = `Humidity is:  ${data.list[9].main.humidity}`;

          //forecast weather --third Day
          var display3 = document.getElementById("card3");
          display3.classList.remove("d-none");
          var temp3 = document.getElementById("card3-temp");
          var wind3 = document.getElementById("card3-wind");
          var humid3 = document.getElementById("card3-humid");
          var iconLink = `https://api.openweathermap.org/img/w/${data.list[17].weather[0].icon}.png`;
          document.getElementById("card3-icon").src = iconLink;
          temp3.textContent = `Temp is:  ${data.list[17].main.temp}`;
          wind3.textContent = `Wind is:  ${data.list[17].wind.speed}`;
          humid3.textContent = `Humidity is:  ${data.list[17].main.humidity}`;

          //forecast weather --fourth Day
          var display4 = document.getElementById("card4");
          display4.classList.remove("d-none");
          var temp4 = document.getElementById("card4-temp");
          var wind4 = document.getElementById("card4-wind");
          var humid4 = document.getElementById("card4-humid");
          var iconLink = `https://api.openweathermap.org/img/w/${data.list[25].weather[0].icon}.png`;
          document.getElementById("card4-icon").src = iconLink;
          temp4.textContent = `Temp is:  ${data.list[25].main.temp}`;
          wind4.textContent = `Wind is:  ${data.list[25].wind.speed}`;
          humid4.textContent = `Humidity is:  ${data.list[25].main.humidity}`;

          //forecast weather --fifth Day
          var display5 = document.getElementById("card5");
          display5.classList.remove("d-none");
          var temp5 = document.getElementById("card5-temp");
          var wind5 = document.getElementById("card5-wind");
          var humid5 = document.getElementById("card5-humid");
          var iconLink = `https://api.openweathermap.org/img/w/${data.list[33].weather[0].icon}.png`;
          document.getElementById("card5-icon").src = iconLink;
          temp5.textContent = `Temp is:  ${data.list[33].main.temp}`;
          wind5.textContent = `Wind is:  ${data.list[33].wind.speed}`;
          humid5.textContent = `Humidity is:  ${data.list[33].main.humidity}`;
        });
    });
};

searchEl.addEventListener("click", searchByCity);
