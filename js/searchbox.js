function initSearchBox(){
    //Search Box
    var input = document.getElementById('pac-input');
    var code = document.getElementById('id-input');
    var text = document.getElementById('text');
    var text2 = document.getElementById('text2');
    var circle = new google.maps.Circle({
        center: {lat: 51.661538, lng: 39.200271},
        radius: 50000
    });
    var searchBox = new google.maps.places.SearchBox(input);

    gmap.controls[google.maps.ControlPosition.TOP_LEFT].push(text);
    gmap.controls[google.maps.ControlPosition.TOP_LEFT].push(code);
    gmap.controls[google.maps.ControlPosition.TOP_LEFT].push(text2);
    gmap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    searchBox.setBounds(circle.getBounds());

    gmap.addListener('bounds_changed', function() {
        searchBox.setBounds(gmap.getBounds());
    });
    searchBox.addListener('places_changed', function() {

        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        var bounds = new google.maps.LatLngBounds();

        var pos = places[0].geometry.location;
        addMarker(pos.lat(), pos.lng());
        $('#pac-input').val('');

        bounds.extend(pos);
        gmap.fitBounds(bounds);
        gmap.setZoom(13);
    });
}