function test(){
	var code = document.getElementById('code').value;
	var lat = document.getElementById('lat').value;
	var lon = document.getElementById('lon').value;
	insertMarker(code,lat,lon);
}

function deletem(){
	var id = document.getElementById('id').value;
	deleteMarker(id);
}

//Добавление маркера в базу.
function insertMarker(code, lat, lon){
	updateMarker(null, code, lat, lon);
}

//Добавление или обновление (если id == null) маркера в базе.
function updateMarker(id, code, lat, lon){
	var marker = new Marker(id, code, lat, lon);
	var jsonObj = JSON.stringify(marker);
	console.log(jsonObj);
	$.ajax({
    type: 'POST',
    url: 'database/insertdata.php',
    data: jsonObj,
    dataType: 'json'
	})
}

//Берет маркеры из БД.
//Возвращает массив маркеров со структурой как у объекта Marker.
function getMarkers(){
	$.getJSON('database/selectdata.php', function (data) {
		return data;
	});
}

//Берет маркер по id.
//Возвращает объект со структурой как у объекта Marker.
function getMarkerById(id){
	$.getJSON('database/selectdata.php?id='+id, function (data) {
		return data;
	});
}

//Берет маркер по значению code.
//Возвращает объект со структурой как у объекта Marker.
function getMarkerByCode(code){
	$.getJSON('database/selectdata.php?code='+code, function (data) {
		return data;
	});
}

function deleteMarker(id){
	var marker = new Marker(id, null,null,null);
	var jsonObj = JSON.stringify(marker);
	console.log(jsonObj);
	$.ajax({
    type: 'POST',
    url: 'database/deletedata.php',
    data: jsonObj,
    dataType: 'json'
	})
}

function Marker(id, code, lat, lon) {
	this.id = id;
    this.code = code;
    this.lat = lat;
    this.lon = lon;
}