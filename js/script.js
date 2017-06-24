$(document).ready(function () {
  navigator.geolocation.getCurrentPosition(
    function (position) {
    var long = position.coords.longitude,
        lat = position.coords.latitude,
    // This API will get the current location
    posAPI = "https://api.darksky.net/forecast/1974cc7f739ce40da31733af089ed026/" + lat + "," + long;
    $.getJSON(posAPI, function(json, textStatus) {
        console.log(json);
    });
    //     posAPI = 
    // "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&sensor=true";
    // $.getJSON(posAPI, function(json, textStatus) {
    //     console.log(json.results[6]);
    //     var location = json.results[6];
    //     var country = location.address_components[1].short_name,
    //       state = location.address_components[0].short_name,
    //         weatherAPI = 
    //     "http://api.wunderground.com/api/72d4e41a0b24a84b/conditions/q/" + country + "/THE_DESIRED_CITY.json"
    //     console.log(country, state);
    // });
  });
});