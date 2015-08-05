$(document).ready(function(){
  // Provide your access token
  L.mapbox.accessToken = 'pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImJkN2FkOTFjNDM4OGQzNWUyYzY3NjU4ODM4ZDYwNDJmIn0.FLniij4ORShXSqRe6pcw-A';
  // Create a map in the div #map
  var map = L.mapbox.map('map', 'mattficke.6b6c9269');

  map.on("click", function(e) {
    console.log(e.latlng);
    map.setView(e.latlng, map.getZoom() + 1);

  })

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function setMarker(crd) {
    // window.location.replace('/feeds/new/?lat='+ crd.latitude + '&lng=' + crd.longitude)
    map.setZoom(14).panTo([crd.latitude, crd.longitude])
    L.marker([crd.latitude, crd.longitude]).addTo(map);
  }

  function success(pos) {
    var crd = pos.coords;
    console.log(crd.latitude);
    console.log(crd.longitude);
    setMarker(crd);
  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  $("#get").on("click", function() {
    navigator.geolocation.getCurrentPosition(success, error, options);
  })
})
