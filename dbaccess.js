$(function () {
	getMarkers(markers);
	console.log(markers);
});

var markers = [];

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


//-----------MARKERS-----------

function Marker(id, code, lat, lon, data) {
	this.id = id;
    this.code = code;
    this.lat = lat;
    this.lon = lon;
	this.data = data;
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
function getMarkers(arr){
	$.getJSON('database/selectdata.php', function (data) {
		$.each(data, function(key, val){
			arr.push(val);
		});
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


//-----------CARS-----------

function Car(id, name, status) {
	this.id = id;
    this.name = name;
    this.status = status;
}

function CarPosition(carId, lat, lon, time) {
	this.carId = carId;
    this.lat = lat;
    this.lon = lon;
	this.time = time;
}

//Добавление или обновление информации об экипажах
function insertOrUpdateCar(id, name, status){
	var car = new Car(id, name, status);
	var jsonObj = JSON.stringify(car);
	console.log(jsonObj);
	$.ajax({
    type: 'POST',
    url: 'database/cars/insupdcar.php',
    data: jsonObj,
    dataType: 'json'
	})
}

//Возвращает массив всех экипажей. Структура такая же как у Car
function getCars(){
	$.getJSON('database/cars/selectcars.php', function (data) {
		return data;
	});
}

//Возвращает информацию об экипаже по id. Структура такая же как у Car
function getCarById(id){
	$.getJSON('database/cars/selectcars.php?id='+id, function (data) {
		return data;
	});
}

//Возвращает позицию экипажа по id. Структура такая же как у CarPosition
function getCarPosition(id){
	$.getJSON('database/cars/selectposition.php?id='+id, function (data) {
		return data;
	});
}

//Возвращает массив последних позиций для каждого экипажа. Структура такая же как у CarPosition
function getLastCarPositions(){
	$.getJSON('database/cars/selectposition.php', function (data) {
		return data;

	});
}

//Очищает БД с точками
function resetPositions(){
	$.ajax({
		type: 'POST',
		url: 'database/cars/resetpositions.php',
		success: function(data) {
			alert("Данные о позициях экипажей удалены.");	
		}
	});
}

