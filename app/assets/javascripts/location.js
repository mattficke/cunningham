var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  window.location.replace('/feeds/?lat='+ crd.latitude + '&lng=' + crd.longitude)
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
