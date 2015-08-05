$(document).on('ready page:load', function(){
  // Provide your access token
  L.mapbox.accessToken = 'pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImJkN2FkOTFjNDM4OGQzNWUyYzY3NjU4ODM4ZDYwNDJmIn0.FLniij4ORShXSqRe6pcw-A';
  // Create a map in the div #map

  var marker
  var cir
  var map = L.mapbox.map('map', 'mattficke.6b6c9269');

  map.on("click", function(e) {
    console.log(e.latlng);
    setMarker(e.latlng)

  })

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function setMarker(latlng) {
    // window.location.replace('/feeds/new/?lat='+ crd.latitude + '&lng=' + crd.longitude)
    if (!marker) {
      marker = L.marker(latlng).addTo(map);
      cir = L.circle(latlng, 1000).addTo(map);
    } else {
      marker.setLatLng(latlng);
      cir.setLatLng(latlng);
    };
    var markerLocation = marker.getLatLng();
    var cirRadius = cir.getRadius();
    console.log(markerLocation.lat)
    console.log(markerLocation.lng)
    var link = '<a href="/feeds/?lat='+ markerLocation.lat + '&lng=' + markerLocation.lng+ '&radius=' + cirRadius + '">Go There</a>'
    console.log(link)
    marker.bindPopup(link).openPopup();
    map.setView(latlng);
  }

  function success(pos) {
    var crd = pos.coords;
    var latlng = L.latLng(crd.latitude, crd.longitude)
    console.log(crd.latitude);
    console.log(crd.longitude);
    map.setZoom(14)
    setMarker(latlng);
  };

  function error(err) {
    alert('ERROR(' + err.code + '): ' + err.message);
  };
  $("#get").on("click", function() {
    navigator.geolocation.getCurrentPosition(success, error, options);
  })
})
