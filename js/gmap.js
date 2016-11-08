var gmap;

function createGMap() {
    var latlng = {lat: 51.661538, lng: 39.200271},
        myOptions = {
            zoom: 12,
            center: latlng,
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false,
            disableDoubleClickZoom: true,
            navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    gmap = new google.maps.Map(document.getElementById("googlemap"), myOptions);

    // Добавление события создания маркера двойныим кликом
    google.maps.event.addListener(gmap, "dblclick", function(e) {
        var pos = e.latLng;
        addMarker(pos.lat(), pos.lng());
    });
}