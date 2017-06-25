$(document).ready(function () {
  navigator.geolocation.getCurrentPosition(
  function (position) {
    var long = position.coords.longitude,
        lat = position.coords.latitude,
    // This API will get the current location
    posAPI = "https://api.darksky.net/forecast/1974cc7f739ce40da31733af089ed026/" + lat + "," + long;
    console.log(posAPI);
    // $.ajax({
    //   url: posAPI,
    //   dataType: 'json',
    //   success: function (json) {
    //     console.log(json);
    //   }
    // })
    // .done(function() {
    //   console.log("success");
    // })
    // .fail(function() {
    //   console.log("error");
    // })
    // .always(function() {
    //   console.log("complete");
    // });
    
  });
});