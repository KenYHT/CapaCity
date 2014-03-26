var origin = new google.maps.LatLng(40.1097573, -88.2272623);
var map = new google.maps.Map(document.getElementById('search-map'), {
  center: origin,
  zoom: 15
});

// adds a marker to the map
// params: name, latlong position
function addMarker(name, latlong) {
	var marker = new google.maps.Marker({
	    position: latlong,
	    map: map,
	    title: name
	});
}

//Given a query, and optional radius,
//returns an array of place data from Google Maps API
function getPlaces(q, callback, rad){
	var request = {
	    location: origin,
	    radius: rad || '700',
		query: q
	};

	var service = new google.maps.places.PlacesService(map);
	service.textSearch(request, callback);
}


// gets places based on query
lox = [];
getPlaces($('#search-query').text(), function(results){
	var html = "";

	// limit to 5 results
	var limit = 5;
	var len = (results.length < limit) ? results.length : limit;
	for (var i=0; i<len; i++){
		var r = results[i];

		html += "<div class='search-result-box'>"
		+ "<h4>"+r.name+"</h4>"
		+ "<p class='lead search-result-box-description'>"
			+ r.formatted_address + "</p>"
		+ "<h4><span class='label label-success'>"+Math.floor(Math.random()*50)+" min</span></h4>"
		+ "<p class='lead search-result-box-description'>"
			+ "Rating: " + (r.rating || 'no rating') + "<br>"
			+ "Price: " + (r.price_level || 'n/a') + "<br>"
			+ r.types.join(', ') + "<br>";

		if (r.opening_hours && r.opening_hours.open_now){
			html += "open now!";
		}

		html += "</p></div>";

		//add marker to map
		lox[i] = r.geometry.location
		addMarker(r.name, r.geometry.location);
	}

	$('#search-results').html(html);
});




