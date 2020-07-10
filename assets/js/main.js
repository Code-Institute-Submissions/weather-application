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

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      if (response.status == 404) {
        $("#weather-data").html(`<p>No weather data found for ${city}</p>`);
      } else if (response.status == 429) {
        $("#weather-data").html(`<p>Too many requests.Try later</p>`);
      } else if (response.status == 200) {
        return response.json();
      }
    })
    .then(function (res) {
      if (typeof res == "object") {
        $("#weather-data").html(
          `
          <p>${res["name"]},
           ${res["sys"]["country"]}, ${res["weather"][0]["description"]}  </p>
           <p>${toCelsius(res["main"]["temp"])},
            temperature from ${toCelsius(res["main"]["temp_min"])} to
            ${toCelsius(res["main"]["temp_max"])}
           </p>

          `
        );
      }
    })
    .catch((err) => {
      $("#weather-data").html(`<p> Something is wrong ${err}</p>`);
    });
}

function toCelsius(kel) {
  var cels = kel - 273.15;
  return cels.toFixed(2) + "°С";
}
