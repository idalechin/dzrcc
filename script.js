$(function() {
    createGMap();
    initSearchBox();
    initGeocoder();
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
var gmap;
//var dte, lat, lon, utc;
var markers = [];
var markersIds = [];
var teams = [];
var teamsIds = [];
var teamData = [];
var teamInfowindow;
var markerInfowindow;
var mouseDownPos;

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

function removeItem(){
	$(document).on('click', '[data-toggle="delete-item"]', function () {
		var $id = $(this).closest('.point-list__item').attr('data-id');
		removeMarker($id);
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
		var code = $('.modal__input').val();
		closeModal(code);
    });
    $(document).on('click', '.modal__btn--no', function (e) {
        closeModal(null);
    });
	$(document).on('keypress', '.modal', function (e) {
		if (e.which == 13) {
			var code = $('.modal__input').val();
			closeModal(code);
		}
	});
    $(document).on('mousedown', function (e){
        var panel = $(".modal");
        if (!panel.is(e.target) && panel.has(e.target).length === 0 && $(".modal:visible").length) {
            closeModal(null);
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
	   gmap.panTo(teams[$id].position);
	});
}

//-----Вспомогательные функции-----------//

function sidePanelMobileShow(el) {
    $(el).addClass('mobile-show');
}

function sidePanelMobileHide(el) {
    $(el).removeClass('mobile-show');
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
	$('.modal').data('position', pos);
	$('.modal__back').removeClass('hidden');
	$('.modal__input').val('');
	$('.modal__input').focus();
}

function closeModal(code) {
	var pos = $('.modal').data('position');
	if(code != null){
		insertMarker(pos, code);
	}
	$('.modal').data('position', null);
	$('.modal__back').addClass('hidden')
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
		if(item.id == id){
			item.setMap(null);
			deleteMarker(item.id);
			markers.splice(i,1);
		}
	});
}


//-----Обновление элементов-----------//


function listRefresh() {
	$('.point-list').empty();
	markers.forEach(function(item, i) {
		addItem(markers[i].id, markers[i].title);
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

    //RIP
/*	//Создание меток команд
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
		teams.push(gmarker);
	}

	teams.forEach(function(mark, i, arr) {
      google.maps.event.addListener(mark, "click", function(e) {
			if(teamInfowindow){teamInfowindow.close()};
			teamInfowindow = new google.maps.InfoWindow({
				content: '<div>'+getTeamsInfo(i) +':<br>'+ mark.getPosition().lat() + ', ' + mark.getPosition().lng()+'</div>'
			});
			teamInfowindow.open(gmap, mark);
		});
    });

	// Добавление события создания маркера двойныим кликом
    google.maps.event.addListener(gmap, "dblclick", function(e) {
		var pos = e.latLng;
		addMarker(pos.lat(), pos.lng());
    });*/

}

//-----Добавление элементов-----------//

function addMarker(lat, lng) {
	var rightClickPosition = [];
	rightClickPosition[0] = lat;
	rightClickPosition[1] = lng;
	openModal(rightClickPosition); //открывает окно ввода кода и передает позицию
}

function addItem(i, title) {
	var text = title;
	if(title == undefined){
		text = '';
	}
	$('.point-list').append('<li class=\"point-list__item\" data-id=\"' + i +'\"><span class=\"point-list__text\">№' + i + ' <span class=\"point-list__name\">' + text + '</span></span><span class=\"point-list__delete\" data-toggle=\"delete-item\">&#10060;</span></li>');
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
		addMarker(pos.lat(), pos.lng());
		$('#pac-input').val('');

		bounds.extend(pos);
		gmap.fitBounds(bounds);
		gmap.setZoom(13);
	});
}

function setMarkerListeners(marker){
	marker.setMap(gmap);
    google.maps.event.addListener(marker, "click", function(e) {
    	if(markerInfowindow){markerInfowindow.close();}
        markerInfowindow = new google.maps.InfoWindow({
            content: '<div>(' + marker.id + ') ' + marker.title + '</div>'
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
		 console.log("down "+mouseDownPos);
	 });
	google.maps.event.addListener(marker, "mouseup", function(e) {
		var pos = marker.position.lat()+"."+marker.position.lng();
        console.log("up "+marker.position);
		if(pos!=mouseDownPos) {
            updateMarker(marker.id, marker.title, e.latLng.lat(), e.latLng.lng());
            mouseDownPos = null;
        }
	});
}

function setCarListeners(carMarker){
    google.maps.event.addListener(carMarker, "click", function(e) {
        if(teamInfowindow){teamInfowindow.close()};
        teamInfowindow = new google.maps.InfoWindow({
            content: '<div>'+getTeamsInfo(i) +':<br>'+ carMarker.getPosition().lat() + ', ' + carMarker.getPosition().lng()+'</div>'
        });
        teamInfowindow.open(gmap, carMarker);
    });
}

function refreshMarkersArray2(data) {
	var tmp = markers;
	markers = [];
	$.each(data, function(key, val){
		var marker = new google.maps.Marker({
			position: {lat: parseFloat(val.lat), lng: parseFloat(val.lon)},
			map: gmap,
			icon: markerImage,
			draggable: true,
			title: val.code
		});
		marker.id = val.id;
		markers.push(marker);
		setMarkerListeners(marker);
	});
	
	tmp.forEach(function(item, i, arr) {
		item.setMap(null);
	});
	tmp = [];
	listRefresh();
}

function refreshMarkersArray(data) {

	var changed = false;
	//Процесс добавления:
	var dbMarkersIds = [];
	$.each(data, function(key, val){
		if(markersIds.indexOf(val.id)<0){
			var marker = new google.maps.Marker({
				position: {lat: parseFloat(val.lat), lng: parseFloat(val.lon)},
				map: gmap,
				icon: markerImage,
				draggable: true,
				title: val.code
			});
			marker.id = val.id;
			markersIds.push(val.id);
			markers.push(marker);
			setMarkerListeners(marker);
			changed = true;
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
		listRefresh();
	}
}

function refreshCarsArray(data) {
    $.each(data, function(key, val){
        if(teamsIds.indexOf(val.id)<0){
            var carMarker = new google.maps.Marker({
                position: {lat: parseFloat(val.lat), lng: parseFloat(val.lon)},
                map: gmap,
                title: "Команда "+(val.id),
                icon: {
                    url: 'img/car_' + val.id + '.svg',
                    size: new google.maps.Size(24, 24),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(12, 24)
                }
            });
            carMarker.id = val.id;
            teams.push(carMarker);
            teamsIds.push(val.id);
            setCarListeners(carMarker);
        } else {
            teams.forEach(function(item, i, arr) {
            	if(item.id==val.id){
            		item.setPosition({lat: parseFloat(val.lat), lng: parseFloat(val.lon)});
				}
            });
		}

    });
}

// -----Обновление инфы о метках команд-----------//

function multiRefresh(){
	if(teamData.length>0){
		$('.team_data').each(function(indx, element){
			$(this).text(teamData[indx]);
		});
	}
	setTimeout(multiRefresh, 3000);
	mainInit();
	getMarkersFromServer();
	getLastCarPositions();
}

//RIP
/*function doRefresh(teamId) {
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
						teams[teamId-1].setPosition(latlng);
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
}*/




