function resizePage() {
  // Helps center the content vertically
  $('#entire-page').height($(window).height());
}

$(document).ready(function () {
  resizePage();
  $(window).on('resize', resizePage);

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
      currentWeather = json.currently;
      // console.log(currentWeather);
      $.ajax({
        url: urlPos,
        dataType: 'json',
      })
      .done(function(json) {
        user_location = json.results[6].formatted_address;
        $('#entire-page').html(`${currentWeather}, ${user_location}`);
      })
      .fail(function() {
        user_location = "your location";
      });
    });
    console.log(user_location, currentWeather);
  });
});