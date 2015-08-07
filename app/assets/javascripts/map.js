$(document).on('ready page:load', function(){
  // Provide your access token
  L.mapbox.accessToken = 'pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImJkN2FkOTFjNDM4OGQzNWUyYzY3NjU4ODM4ZDYwNDJmIn0.FLniij4ORShXSqRe6pcw-A';

  // Create a map in the div #map
  var map = L.mapbox.map('map', 'mattficke.6b6c9269')
      .addControl(L.mapbox.geocoderControl('mapbox.places', {
        autocomplete: true
      }));

  var marker
  var cir
  var latlng = L.latLng(38.8975, -77.0367);
  map.setZoom(14)
  setMarker(latlng);
  //
  if (window.location.href.indexOf("?") >= 0) {
    var url = parseURL(window.location.href)
    console.log(url)
    console.log(1)
    var location = L.latLng(url.searchObject["lat"], url.searchObject["lng"]);
    setMarker(location);
  }
  // Initialise the FeatureGroup to store editable layers
  // var drawnItems = new L.FeatureGroup();
  // map.addLayer(drawnItems);

  // Initialise the draw control and pass it the FeatureGroup of editable layers
  // var drawControl = new L.Control.Draw({
  //     edit: {
  //         featureGroup: drawnItems
  //     }
  // });
  // map.addControl(drawControl);
  // var shape = new L.Draw.Circle(map, drawControl.options.polyline).enable();
  //   console.log(2)
  //   // var latlng = L.latLng(38.904, -77.016);
  //   console.log(3)
  //   // console.log(latlng)
  // }

  map.on("click", function(e) {
    console.log(e.latlng);

    // shape.addTo(map);
    // console.log(shape)
    // cir = L.circle(e.latlng, shape.radius).addTo(map);
    setMarker(e.latlng)
  })

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function parseURL(url) {
    var parser = document.createElement('a'),
        searchObject = {},
        queries, split, i;
    // Let the browser do the work
    parser.href = url;
    // Convert query string to object
    queries = parser.search.replace(/^\?/, '').split('&');
    for( i = 0; i < queries.length; i++ ) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    };
}

  function setMarker(latlng) {
    // window.location.replace('/feeds/new/?lat='+ crd.latitude + '&lng=' + crd.longitude)
    if (!marker) {
      marker = L.marker(latlng).addTo(map);
      cir = L.circle(latlng, 1000).addTo(map);
    } else {
      marker.setLatLng(latlng);
      cir.setLatLng(latlng);
    }
    var markerLocation = marker.getLatLng();
    var cirRadius = cir.getRadius();
    console.log(markerLocation.lat);
    console.log(markerLocation.lng);
    var link = '<a href="/feeds/new/?lat='+ markerLocation.lat + '&lng=' + markerLocation.lng+ '&radius=' + cirRadius + '">Go There</a>';
    console.log(link);
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
