var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('Accuracy: ' + crd.accuracy + ' meters.');
  window.location.replace('/feeds/new/?lat='+ crd.latitude + '&lng=' + crd.longitude)
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

$(document).ready(function() {
  $("#get").on("click", function() {
    // console.log("#get clicked")
    navigator.geolocation.getCurrentPosition(success, error, options);


  })
})
