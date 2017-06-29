var celsius = true;

function resizePage() {
  // Helps center the content vertically
  $('#entire-page').height($(window).height());
}

function convertCtoF(celsius) {
  // Function to convert celsius to farenheit
  return Math.round((celsius * 9 / 5 + 32) * 100);
}

function convertFtoC(farenheit) {
  // Function to convert farenheit to celsius
  return Math.round((farenheit - 32) * 5 / 9);
}

function roundTo2(n) {
  // Function that returns the 2-most significants digits
  return Math.round(n * 100) / 100;
}

$(document).ready(function () {
  // Store the current temperature. This helps me convert it from celsius to farenheit and vice-versa
  // without making repeated requests.
  let temperature = 0;

  // Some variables to handle the show.
  let done1, done2;

  // Center the content at pageload
  resizePage();

  // Handle the navigator object
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
    function (position) {

      // Save the longitude and latitude.
      var long = position.coords.longitude,
          lat = position.coords.latitude,

      // This API will get the weather.
      urlWeather = "https://api.darksky.net/forecast/1974cc7f739ce40da31733af089ed026/" + lat + "," + long,
      // This API will get the current location.
      urlPos = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&sensor=true";
      let currWeather = "", user_location = "";

      // Making the request for weather.
      $.ajax({
        url: urlWeather,
        dataType: 'jsonp', // IMPORTANT!!!!!!!
      })
      .done(function(json) {
        // Save the info of the request:

        currWeather = json.currently;
        temperature = currWeather.temperature;

        // Change the content of the weather-box
        $('#temperature').html(`
          ${convertFtoC(currWeather.temperature)}<span style="font-weight: 200;">&#176;C</span>`);
        $('#icon').html(`
          <img src="icons/${currWeather.icon}.png" alt="${currWeather.icon}" class="responsive-img"/>`);
        $('#summary').text(currWeather.summary);
        $('#wind-speed').text(roundTo2(currWeather.windSpeed * 1.6) + " km/h");
        $('#humidity').text(roundTo2(currWeather.humidity));
        $('#pressure').text(roundTo2(currWeather.pressure) + " mbar");
      })
      .complete(function() {
        // When the job is done, we toggle done1. If done1 && done2, then both weather and location
        // request are done and we show the content of the page.
        done1 = true;
        if (done1 && done2){
          $('.preloader-wrapper').removeClass('visible');
          
          $('#box').addClass('visible');
        }
      });

      // Making the request for location.
      $.ajax({
        url: urlPos,
        dataType: 'json',
      })
      .done(function(json) {

        // By google maps developer page, the .types property of each result in the response
        // has the type of place of each result. 'administrative_area_level_1' or 'locality'
        // will give us the city/state name. Always the last one is the one we're looking for
        user_location = json.results.filter(
          function (item) {
            for (var i = 0; i < item.types.length; i++) {
              switch (item.types[i]) {
                case 'locality':
                case 'administrative_area_level_1':
                  return true;
                default:
                  break;
              }
            }
            return false;
        });

        // We only care of the name, not the entire object. Then we change the title
        user_location = user_location[user_location.length - 1 ].address_components[0].short_name;
      })
      .fail(function() {

        // default 
        user_location = "Your location";
      })
      .complete(function() {

        // Same as above.
        $('#title').text(user_location);
        done2 = true;
        if (done1 && done2){
          $('.preloader-wrapper').removeClass('visible');
          
          $('#box').addClass('visible');
        }
      });
    });
  } else {
    // If the browser doesn't support navigator, we tell the user.
    $('#weather-box').addClass('hide');
    $('#title').text("Your browser does'nt support navigator.");
  }
  $(window).on('resize', resizePage);
});
