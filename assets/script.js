var searchEl = document.getElementById("search");

// var requestUrl =
//   "http://api.openweathermap.org/geo/1.0/direct?q=Sydney&limit=5&appid=cb4e1eb2ddfd04be05240608cc0d201b";
//"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=cb4e1eb2ddfd04be05240608cc0d201b";
//cb4e1eb2ddfd04be05240608cc0d201b
//cb4e1eb2ddfd04be05240608cc0d201b
//cb4e1eb2ddfd04be05240608cc0d201b0

function searchByCity(event) {
  event.preventDefault();
  var cityName = document.querySelector("#city").value;

  if (cityName) {
    getFeaturedRepos(cityName);
  }
}

var getFeaturedRepos = function (cityName) {
  var requestUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    " &limit=5&appid=cb4e1eb2ddfd04be05240608cc0d201b";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
};

searchEl.addEventListener("click", searchByCity);
