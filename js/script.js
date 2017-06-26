function resizePage() {
  // Helps center the content vertically
  $('#entire-page').height($(window).height());
}

function convertCtoF(celsius) {
  return Math.round((celsius * 9 / 5 + 32) * 100) / 100;
}

function convertFtoC(farenheit) {
  return Math.round(((farenheit - 32) * 5 / 9) * 100) / 100;
}

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
    let currentWeather = "", user_location = "";
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
      currentWeather = json.currently;
      console.log(json);
      // console.table(currentWeather);
      // console.log(convertFtoC(currentWeather));
      // Hacemos la llamada al api de google para obtener la ubicacion actual
      $.ajax({
        url: urlPos,
        dataType: 'json',
      })
      .done(function(json) {
        user_location = json.results[6].formatted_address;
        
      })
      .fail(function() {
        user_location = "your location";
      });
    });
  });
  $(window).on('resize', resizePage);
});
