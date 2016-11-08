var geoInfowindow;
var geocoder;
var addr;
function initGeocoder(){
	geocoder = new google.maps.Geocoder;
	gmap.addListener('rightclick', function(e) {
		if(geoInfowindow){geoInfowindow.close()};
		var pos = e.latLng;
		//var res = getAddress(pos);
		//alert(res);
		showGeoInfo(pos);
	});
}

function showGeoInfo(pos){
	geocoder.geocode({'location': pos}, function(results, status) {
		console.log(results);
		if (status === google.maps.GeocoderStatus.OK) {
			if (results[0]) {
				var address = results[0].address_components[2].short_name+", "+results[0].address_components[1].short_name+", "+results[0].address_components[0].short_name;
				geoInfowindow = new google.maps.InfoWindow({
					content: address+"<br>"+pos.lat()+", "+pos.lng(),
					position: pos
				});
				geoInfowindow.open(gmap);
			} else {
				window.alert('No results found');
		    }
		} else {
		    window.alert('Geocoder failed due to: ' + status);
		}
    });
}

function getAddress(marker, val){
	var a = "0";
	geocoder.geocode({'location': marker.position}, function(results, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			if (results[0]) {
				a = results[0].address_components[0].short_name+", "+results[0].address_components[1].short_name;
				marker.title = a;
				marker.id = val.id;
				markersIds.push(val.id);
				markers.push(marker);
				setMarkerListeners(marker);
				markerListRefresh();
			} else {
				window.alert('No results found');
		    }
		} else {
		    window.alert('Geocoder failed due to: ' + status);
		}
    });

}
