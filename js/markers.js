var markers = [],
    markersIds = [],
    markerInfowindow,
    mouseDownPos;

var markerImage = {
        url: 'img/location.svg',
        size: new google.maps.Size(24, 24)
    },
    markerImageHover = {
        url: 'img/location_hover.svg',
        size: new google.maps.Size(24, 24)
    };

function refreshMarkersArray(data) {
    var changed = false;
    //Процесс добавления:
    var dbMarkersIds = [];
    $.each(data, function(key, val){
        if(markersIds.indexOf(val.id)<0){
            var code = val.code;
            var marker = new google.maps.Marker({
                position: {lat: parseFloat(val.lat), lng: parseFloat(val.lon)},
                map: gmap,
                icon: markerImage,
                draggable: true,
                code: code
            });

            getAddress(marker.position, setMarkerAddress);

            function setMarkerAddress(a) {
                marker.address = a;
                if(code === ''||/^\d+$/i.test(code)){
                    marker.title = (code === '') ? a : val.code + ") " + marker.address;
                } else {
                    marker.title = code.replace(/^\d+[,.-]?/g, code.match(/^\d+/i)+")");
                }
                marker.id = val.id;
                markersIds.push(val.id);
                markers.push(marker);
                setMarkerListeners(marker);
                markerListRefresh();
            }
        }
        dbMarkersIds.push(val.id);
    });

    //Процесс удаления:
    markers.forEach(function(item, i, arr) {
        if(dbMarkersIds.indexOf(item.id)<0){
            item.setMap(null);
            markers.splice(i,1);
            changed = true;
        }
    });
    if(changed){
        markerListRefresh();
    }
}

function setMarkerListeners(marker){
    marker.setMap(gmap);
    google.maps.event.addListener(marker, "click", function(e) {
        if(markerInfowindow){markerInfowindow.close();}
        markerInfowindow = new google.maps.InfoWindow({
            content: '<div>' + marker.title + '</div>'
        });
        markerInfowindow.open(gmap, marker);
    });
    google.maps.event.addListener(marker, "dblclick", function(e) {
        removeMarker(marker.id);
    });
    google.maps.event.addListener(marker, "mouseover", function(e) {
        itemSetIcon(marker, markerImageHover, null);
        itemAddHover(marker.id);
    });
    google.maps.event.addListener(marker, "mouseout", function(e) {
        itemSetIcon(marker, markerImage, null);
        itemRemoveHover(marker.id);
    });
    google.maps.event.addListener(marker, "mousedown", function(e) {
        mouseDownPos = marker.position.lat()+"."+marker.position.lng();
    });
    google.maps.event.addListener(marker, "mouseup", function(e) {
        var pos = marker.position.lat()+"."+marker.position.lng();
        if(pos!=mouseDownPos) {
            var code = marker.code;
            if(marker.code == ''){
                code = "";
                if(/^\d+/i.test(marker.title)){
                    code = marker.title.match(/^\d+/i)[0];
                }
            }
            updateMarker(marker.id, code, e.latLng.lat(), e.latLng.lng());
            mouseDownPos = null;
        }
    });
}

function addMarker(lat, lng) {
    var rightClickPosition = [];
    rightClickPosition[0] = lat;
    rightClickPosition[1] = lng;
    openModal(rightClickPosition); //открывает окно ввода кода и передает позицию
}

function addMarkerToList(marker) {
    var i = marker.id,
        text = marker.title;
    $('.point-list').append('<li class=\"point-list__item\" data-id=\"' + i +'\"><div class="point-list__content-wrapper"><span class=\"point-list__text\"><span class=\"point-list__name\">' + text + '</span></span><i class="point-list__edit material-icons" data-toggle=\"edit-item\">&#xE254;</i><span class=\"point-list__delete\" data-toggle=\"delete-item\">&#10060;</span></div></li>');
}

function removeMarker(id) {
    removeMarkerFromList(id);
    markers.forEach(function(item, i, arr) {
        if(item.id == id){
            item.setMap(null);
            deleteMarker(item.id);
            markers.splice(i,1);
        }
    });
}

function removeMarkerFromList(id) {
    $('.point-list__item').each(function () {
            if($(this).attr('data-id') == id){
                $(this).remove();
            }
        }
    );
}

function markerListRefresh() {
    $('.point-list').empty();
    markers.forEach(function(item, i) {
        addMarkerToList(item);
    });
}