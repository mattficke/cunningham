$(document).on('ready page:load', function(){
  // Provide your access token
  L.mapbox.accessToken = 'pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImJkN2FkOTFjNDM4OGQzNWUyYzY3NjU4ODM4ZDYwNDJmIn0.FLniij4ORShXSqRe6pcw-A';

  // Create a map in the div #map
  var map = L.mapbox.map('map', 'mattficke.6b6c9269')
      .addControl(L.mapbox.geocoderControl('mapbox.places', {
        autocomplete: true,
        // zoomControl: false
      }));

  // disable scrollwheel zoom on mobile
  // FIXME: doesn't update if browser is resized without a refresh. A "change" event listener could fix.
  if (window.matchMedia("(max-width: 42em)").matches) {
    map.scrollWheelZoom.disable();
  }
  var marker
  var cir
  var latlng = L.latLng(38.8975, -77.0367);
  map.setZoom(14)
  setMarker(latlng);
  //
  if (window.location.href.indexOf("?") >= 0) {
    var url = parseURL(window.location.href)
    var location = L.latLng(url.searchObject["lat"], url.searchObject["lng"]);
    setMarker(location);
    // auto scroll to photos on mobile
    if (window.matchMedia("(max-width: 42em)").matches) {
      $("html, body").animate({ scrollTop: $(".photo-map").offset().top - 50 });
    }

  }
// nice little click event, was wondering how you were setting the marker
  map.on("click", function(e) {
    console.log(e.latlng);
    setMarker(e.latlng)
  })

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
    // this is a cool way to set a link to create a new feed.
    var link = '<a href="/feeds/new/?lat='+ markerLocation.lat + '&lng=' + markerLocation.lng+ '&radius=' + cirRadius + '">Go There</a>';
    console.log(link);
    marker.bindPopup(link).openPopup();
    map.setView(latlng);
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

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
// hmm curious what this click even does. I think i figured out succes/error, curious about options, just an object?
  $("#get").on("click", function() {
    navigator.geolocation.getCurrentPosition(success, error, options);
  })
})
