var searchEl = document.getElementById("search");

// var requestUrl =
//   "http://api.openweathermap.org/geo/1.0/direct?q=Sydney&limit=5&appid=cb4e1eb2ddfd04be05240608cc0d201b";
//"http://api.openweathermap.org/geo/1.0/reverse?lat=51.5098&lon=-0.1180&limit=5&appid=cb4e1eb2ddfd04be05240608cc0d201b";
//9cf34e2a28704208b105434feb2d65c2

function searchByCity(event) {
  event.preventDefault();
  var cityName = document.querySelector("#city").value;

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
      //build current weather
      var cityNameEl = document.createElement("h2");
      var dateEl = document.createElement("p");
      var weatherIconEl = document.createElement("img");
      var tempEl = document.createElement("p");
      var windEl = document.createElement("p");
      var humdEl = document.createElement("p");
      cityNameEl.textContent = city;
      dateEl.textContent = dayjs().format("MM/DD/YYYY");
      //dateEl.textContent = "Today's Date:";
      //console.log(dateEl.textContent);
      weatherIconEl.setAttribute(
        "src",
        `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
      );
      tempEl.textContent = `Temp: ${data.main.temp}`;
      windEl.textContent = `Wind: ${data.wind.speed}`;
      humdEl.textContent = `Humidity: ${data.main.humidity}`;
      document
        .querySelector("#today")
        .append(cityNameEl, dateEl, weatherIconEl, tempEl, windEl, humdEl);

      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=cb4e1eb2ddfd04be05240608cc0d201b`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          // Build forecast weather
        });
    });
};

searchEl.addEventListener("click", searchByCity);
