# Cunningham

This site uses the Instagram API to find recent photos within a 1 km radius of any location, defined by latitude and longitude. Users can grant the site permission to find their current location, or can navigate to any other location in the world by clicking on the spot on the map. Recent public geotagged photos that have been uploaded to Instagram from that location will be displayed.

Registration is not necessary to use the site, but registered users have the ability to save locations for later viewing.

## Issues

* The site does not yet allow you to change the radius of the search. Users should be able to specify a radius of between 1 and 5000 meters.

* There is not full separation of concerns in the models, views, and controllers. In particular, there is an API call in the `feeds/index` view that should be moved to the controller if at all possible.

* The layout does not work well on mobile

* User authentication needs to be tightened up. Right now it doesn't ask for password confirmation, and doesn't display any info about what went wrong if there was an error during registration or sign-in

* Signing up should also sign you in, this shouldn't be two steps
