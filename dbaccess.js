function test(){
	var code = document.getElementById('code').value;
	var lat = document.getElementById('lat').value;
	var lon = document.getElementById('lon').value;
	var data = document.getElementById('data').value;
	insertMarker(code,lat,lon,data);
}

function deletem(){
	var id = document.getElementById('id').value;
	deleteMarker(id);
}

//Добавление маркера в базу.
function insertMarker(code, lat, lon, data){
	updateMarker(null, code, lat, lon, data);
}

//Добавление или обновление (если id == null) маркера в базе.
function updateMarker(id, code, lat, lon, data){
	var marker = new Marker(id, code, lat, lon, data);
	var jsonObj = JSON.stringify(marker);
	console.log(jsonObj);
	$.ajax({
    type: 'POST',
    url: 'database/insertdata.php',
    data: jsonObj,
    dataType: 'json'
	})
}

//Обновление позиции (lat, lon) по значению code
function updatePosition(code, lat, lon){
	var marker = new Marker(null, code, lat, lon, null);
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

function Marker(id, code, lat, lon, data) {
	this.id = id;
    this.code = code;
    this.lat = lat;
    this.lon = lon;
	this.data = data;
}