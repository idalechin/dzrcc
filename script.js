$(function() {
	getMarkersFromServer();
    multiRefresh();
    removeItem();
    hoverDelete();
	hoverItem();
	admin();
	clickCenter();
	clickCloseModal();
	carToCenter();
	if($(window).width() < 1024){
		mobileButtonAction();
		clickOutMobilePanel();
	}
});

// Количество команд:
var teamCount = 6;
//------------------
var gmap, marker;
var dte, lat, lon, utc;
var markers = [];
var teamMarkers = [];
var teamData = [];
var teamInfo;

//--------Иконки--------//

var markerImage = {
		url: 'img/location.svg',
		size: new google.maps.Size(24, 24)
	},
	markerImageHover = {
		url: 'img/location_hover.svg',
		size: new google.maps.Size(24, 24)
	};

function itemSetIcon(item, icon, anim) {
	item.setIcon(icon);
	item.setAnimation(anim)
}

function getTeamsInfo(id){
	switch (id+1) {
		case 1:
			return "\"Твоя мама\"" ;
			break;
		case 2:
			return "\"Лударь\"" ;
			break;
		case 3:
			return "\"Сучий жир\"" ;
			break;
		case 4:
			return "\"Шкаф\"" ;
			break;
		case 5:
			return "\"Муму\"" ;
			break;
		case 6:
			return "\"Пиво\"" ;
			break;
		case 7:
			return "\"name\"" ;
			break;
		case 8:
			return "\"name\"" ;
			break;
		default:
			return "?";
	}
}

//-----Отслеживание событий DOM-----------//

function getMarkersFromServer() {
	$.getJSON("database/selectdata.php")
		.success(function(data) {
			$.each(data, function(key, val){
				markers.push(val);
			});
			listRefresh();
			markersRefresh();
		});
}

function removeItem(){
	$(document).on('click', '[data-toggle="delete-item"]', function () {
		var $id = $(this).closest('.point-list__item').attr('data-id');
		removeMarker($id);
		markersRefresh();
	});
}

function admin() {
	$(document).on('click', '.admin', function () {
		$(this).addClass('admin--checked');
	});
	$(document).on('click', '.admin--checked', function () {
		$(this).removeClass('admin--checked');
	});
}

function hoverDelete() {
	$(document).on('mouseenter', '[data-toggle="delete-item"]', function () {
			$(this).closest('.point-list__item').addClass('hover--delete');
		}
	);
	$(document).on('mouseleave', '[data-toggle="delete-item"]', function () {
			$(this).closest('.point-list__item').removeClass('hover--delete');
		}
	);
}

function hoverItem() {
	$(document).on('mouseenter', '.point-list__item', function () {
        var $id = $(this).attr('data-id');
		markers.forEach(function(item) {
			if(item.id == $id){
				itemSetIcon(item, markerImageHover, google.maps.Animation.BOUNCE);
			}
		});
	});
	$(document).on('mouseleave', '.point-list__item', function () {
		var $id = $(this).attr('data-id');
		markers.forEach(function(item) {
			if(item.id == $id){
				itemSetIcon(item, markerImage, null);
			}
		});
	});
}

function clickCenter() {
	$(document).on('click', '.point-list__item', function () {
		var $id = $(this).attr('data-id');
		markers.forEach(function(item) {
			if(item.id == $id){
				gmap.panTo(item.position);
			}
		});
	})
}

function clickCloseModal() {
	$(document).on('click', '.modal__btn--ok', function (e) {
        markers[markers.length-1].title = $('.modal__input').val();
        closeModal();
        listRefresh();
        markersRefresh();
    });
    $(document).on('click', '.modal__btn--no', function (e) {
        var lastMarkerId = markers[markers.length-1].id;
        removeMarker(lastMarkerId);
        closeModal();
        listRefresh();
        markersRefresh();
    });
	$(document).on('keypress', '.modal', function (e) {
		if (e.which == 13) {
			markers[markers.length-1].title = $('.modal__input').val();
			closeModal();
			listRefresh();
			markersRefresh();
		}
	});
    $(document).on('mousedown', function (e){
        var panel = $(".modal");
        if (!panel.is(e.target) && panel.has(e.target).length === 0 && $(".modal:visible").length) {
            var lastMarkerId = markers[markers.length-1].id;
            removeMarker(lastMarkerId);
            closeModal();
            listRefresh();
            markersRefresh();
        }
    });
}

function mobileButtonAction() {
	$(document).on('click', '.btn--mobile', function (e) {
		$('.panel--mobile').removeClass('mobile-show');
		var activElement = $(this).attr('data-mobile');
        sidePanelMobileShow(activElement);
	});

	$(document).on('click', '.panel--mobile li', function (e) {
        sidePanelMobileHide('.panel--mobile');
	});

	$(document).on('mousedown', '.btn--mobile', function (e) {
        $(this).addClass('btn--down')
	});
	$(document).on('mouseup', '.btn--mobile', function (e) {
		$(this).removeClass('btn--down')
	});
}

function clickOutMobilePanel() {
	$(document).on('mousedown', function (e){
		var panel = $(".panel--mobile");
        var panelList = panel.find('ul');
		if (!panelList.is(e.target) && panelList.has(e.target).length === 0) {
            sidePanelMobileHide(panel);
		}
	});
}

function carToCenter() {
	$(document).on('click', '.team', function (e) {
	   var $id = $(this).attr('data-car-id');
	   gmap.panTo(teamMarkers[$id].position);
	});
}

//-----Вспомогательные функции-----------//

function sidePanelMobileShow(el) {
    $(el).addClass('mobile-show');
}

function sidePanelMobileHide(el) {
    $(el).removeClass('mobile-show');
}

function addToArray(pos){
	var marker = new google.maps.Marker({
		position: pos,
		map: gmap,
		icon: markerImage,
		draggable: true
	});
	markers.push(marker);
	if(markers.length > 1){
		marker.id = markers[markers.length-2].id + 1 ;
	}
	else{
		marker.id = 1;
	}
}

function mainInit() {
  var $mainHeight = $(window).height() - $('header').height();
  if($(window).width() < 1024)
    $('main').height($mainHeight - 15);
  else
  	$('main').height($mainHeight - 40);
}

function itemAddHover(id) {
	$('.point-list__item').each(function (item) {
	    if($(this).attr('data-id') == id){
			$(this).addClass('point-list__item--hover')
		}
	})
}

function itemRemoveHover(id) {
	$('.point-list__item').each(function (item) {
		if($(this).attr('data-id') == id){
			$(this).removeClass('point-list__item--hover')
		}
	})
}

function openModal(pos) {
	addToArray(pos);
	$('.modal__back').removeClass('hidden');
	$('.modal__input').val('');
	$('.modal__input').focus();
}

function closeModal() {
	$('.modal__back').addClass('hidden')
}

//-----Добавление элементов-----------//

function addMarker(pos) {
	openModal(pos);
}

function addItem(i, title) {
	var text = title;
	if(title == undefined){
		text = '';
	}
	$('.point-list').append('<li class=\"point-list__item\" data-id=\"' + i +'\"><span class=\"point-list__text\">№' + i + ' <span class=\"point-list__name\">' + text + '</span></span><span class=\"point-list__delete\" data-toggle=\"delete-item\">&#10060;</span></li>');
}

function addInfoWindow(item) {
	var infowindow = new google.maps.InfoWindow({
		content: '<div>(' + item.id + ') ' + item.title + '</div>'
	});
	google.maps.event.addListener(item, "click", function(e) {
		infowindow.open(gmap, item);
	});
}

//-----Удаление элементов-----------//

function removeMarker(id) {
	$('.point-list__item').each(function () {
			if($(this).attr('data-id') == id){
				$(this).remove();
			}
		}
	);
	markers.forEach(function(item, i, arr) {
		if(markers[i].id == id){
			item.setMap(null);
			markers.splice(i,1)
		}
	});
}


//-----Обновление элементов-----------//


function listRefresh() {
	$('.point-list').empty();
	markers.forEach(function(item, i) {
		addItem(markers[i].id, markers[i].title);
		addInfoWindow(item);
	});
}

function markersRefresh() {
	markers.forEach(function(item, i, arr) {
		item.setMap(gmap);
		google.maps.event.addListener(item, "dblclick", function(e) {
			removeMarker(item.id);
			markersRefresh();
		});
		google.maps.event.addListener(item, "mouseover", function(e) {
			itemSetIcon(item, markerImageHover, null);
			itemAddHover(item.id);
		});
		google.maps.event.addListener(item, "mouseout", function(e) {
			itemSetIcon(item, markerImage, null);
			itemRemoveHover(item.id);
		});
	});

}

//----- Карта -----------//


function createGMap() {
	//todo: поправить и перенести в метож init
	for (var m = 0; m < teamCount; ++m) {
		$('.teams').append('<li class="team"  data-car-id=\"' + m + '\" ><img src=\"img/car_'+m+'.svg\" class="team_image"> '+getTeamsInfo(m) + '   <span class=\"team_data\">…</span></li>');
	}
	//----
    var latlng = {lat: 51.661538, lng: 39.200271},
        myOptions = {
          zoom: 13,
          center: latlng,
          mapTypeControl: false,
		  zoomControl: false,
		  streetViewControl: false,
          disableDoubleClickZoom: true,
          navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
          mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    gmap = new google.maps.Map(document.getElementById("googlemap"), myOptions);

	//Создание меток команд
	for (var q = 0; q<teamCount; q++){
		gmarker = new google.maps.Marker({
			position: latlng,
			map: gmap,
			title: "Команда "+(q+1),
			icon: {
				url: 'img/car_' + q + '.svg',
				size: new google.maps.Size(24, 24),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(12, 24)
			}
		});
		// console.log();
		teamMarkers.push(gmarker);
		latlng = {lat: 51.681538, lng: 39.200271};
		//google.maps.event.addListener(gmarker, "click", function(e) {
			//alert("GPS coordinates:\nLatitude: " + gmarker.getPosition().lat() + "\nLongitude: " + gmarker.getPosition().lng());
		//});
	}
	
	teamMarkers.forEach(function(mark, i, arr) {
      google.maps.event.addListener(mark, "click", function(e) {
			if(teamInfo){teamInfo.close()};
			teamInfo = new google.maps.InfoWindow({
				content: '<div>'+getTeamsInfo(i) +':<br>'+ mark.getPosition().lat() + ', ' + mark.getPosition().lng()+'</div>'
			});
			teamInfo.open(gmap, mark);
			//alert("GPS coordinates:\nLatitude: " + gmarker.getPosition().lat() + "\nLongitude: " + gmarker.getPosition().lng());
		});
    });

    google.maps.event.addListener(gmap, "dblclick", function(e) {
        rightClickPosition = e.latLng;
        addMarker(rightClickPosition);
    });
}

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
	    addMarker(pos);
		$('#pac-input').val('');

		bounds.extend(pos);
		gmap.fitBounds(bounds);
		gmap.setZoom(13);
	});
}


// -----Обновление инфы о метках команд-----------//

function multiRefresh(){
	for (var i = 1; i <= teamCount; i++) {
		doRefresh(i);
	}
	
	if(teamData.length>0){
		$('.team_data').each(function(indx, element){
			$(this).text(teamData[indx]);
		});
	}
	setTimeout(multiRefresh, 5000);
	mainInit();
}


function doRefresh(teamId) {
	var xhr;
	try {
		xhr = new XMLHttpRequest();
	} catch (e) {
		xhr = false;
	}

	xhr.onreadystatechange  = function() {
		if (xhr.readyState  == 4) {
			if (xhr.status  == 200) {
				var param = xhr.responseText.split('_');
				dte = param[0];
				lat = param[1];
				lon = param[2];
				utc = param[3];
				
				if (dte && lat && lon) {
					if (!gmap) {
						createGMap();
						initSearchBox();
					} else {
						var latlng = new google.maps.LatLng(lat, lon);
						teamMarkers[teamId-1].setPosition(latlng);
					}
					if (utc) {
						utc_dte = new Date(parseInt(utc));
						teamData[teamId-1] = utc_dte.toLocaleString();
					} else {
						teamData[teamId-1] = dte;
					}
				}
			}
		}
	
	}
	
	var path = "position/team"+teamId+".php?"+ Math.random();
	xhr.open("GET", path,  true);
	xhr.send(null);
}




