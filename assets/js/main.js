function fetchWeatherInformation(event) {
  var city = $("#city").val();
  var apiKey = "c5cb20c8c2a0f5cb1e3536e94636a45d";
  if (!city) {
    $("#weather-data").html(`<p>Please enter a city name</p>`);
    return;
  }

  $("#weather-data").html(
    `<div id="loader">
            loading...
        </div>`
  );

  fetch(`api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.status == 404) {
        console.log(response);
        $("#weather-data").html(`<p>No weather data found for ${city}</p>`);
      } else {
        $("#weather-data").html(`<p>${response}</p>`);
      }
    })
    .catch((err) => {
      $("#weather-data").html(`<p>${err}</p>`);
    });
}
