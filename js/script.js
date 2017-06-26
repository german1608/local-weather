var celsius = true;

function resizePage() {
  // Helps center the content vertically
  $('#entire-page').height($(window).height());
}

function convertCtoF(celsius) {
  return roundTo2((celsius * 9 / 5 + 32) * 100);
}

function convertFtoC(farenheit) {
  return roundTo2((farenheit - 32) * 5 / 9);
}

function roundTo2(n) {
  return Math.round(n * 100) / 100;
}

/*function toggleGrades() {
  if (celsius) {
    celsius = false;
    var cur = parseInt($('#temperature').html());
  }
}*/


$(document).ready(function () {
  resizePage();

  navigator.geolocation.getCurrentPosition(
  function (position) {
    var long = position.coords.longitude,
        lat = position.coords.latitude,
    // This API will get the weather
    urlWeather = "https://api.darksky.net/forecast/1974cc7f739ce40da31733af089ed026/" + lat + "," + long,
    // This API will get the current location
    urlPos = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&sensor=true";
    let currWeather = "", user_location = "";
    $.ajax({
      url: urlWeather,
      dataType: 'jsonp',
    })
    .done(function(json) {
      // Guardamos la info del clima
      /* Data que me interesa de json.currently:
        * icon: [
          clear-day, *
          clear-night, *
          rain, 
          snow, 
          sleet, 
          wind, 
          fog, 
          cloudy, 
          partly-cloudy-day,
          partly-cloudy-night
        ]
        * precipType
        * pressure
        * summary
        * temperature
        * windSpeed
      */
      currWeather = json.currently;
      console.log(json);
      $('#icon').html(`
        <img src="icons/${currWeather.icon}.png" alt="${currWeather.icon}" class="responsive-img"/>`);
      $('#summary').text(currWeather.summary);
      $('#wind-speed').text(roundTo2(currWeather.windSpeed * 1.6) + " km/h");
      $('#humidity').text(roundTo2(currWeather.humidity));
      $('#pressure').text(roundTo2(currWeather.pressure) + " mbar");
      // console.table(currentWeather);
      // console.log(convertFtoC(currentWeather));
      // Hacemos la llamada al api de google para obtener la ubicacion actual
    });

    $.ajax({
      url: urlPos,
      dataType: 'json',
    })
    .done(function(json) {
      user_location = json.results[5].address_components[0].short_name;
      console.log(user_location);
      $('#title').text(user_location);
    })
    .fail(function() {
      user_location = "your location";
    });
  });
  $('#box').addClass('visible');
  $(window).on('resize', resizePage);
});
