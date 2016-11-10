$(function () {
	//getMarkersFromServer();
	//getLastCarPositions();
});

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
function insertMarker(pos, code){
	updateMarker(null, code, pos[0], pos[1]);
}

//Добавление или обновление (если id == null) маркера в базе.
function updateMarker(id, code, lat, lng){
	var positionForGeocoder = {lat: parseFloat(lat), lng: parseFloat(lng)};

	getAddress(positionForGeocoder, setMarkerAddress);

	function setMarkerAddress(address) {
		console.log('geo');
		var marker = new Marker(id, code, lat, lng, address);
		var jsonObj = JSON.stringify(marker);
		$.ajax({
			type: 'POST',
			url: 'database/insertdata.php',
			data: jsonObj,
			dataType: 'json'
		})
	}
}

//Обновление позиции (lat, lon) по значению code
function updatePosition(code, lat, lon){
	var marker = new Marker(null, code, lat, lon, null);
	var jsonObj = JSON.stringify(marker);
	$.ajax({
		type: 'POST',
		url: 'database/insertdata.php',
		data: jsonObj,
		dataType: 'json'
	})
}

//Берет маркеры из БД.
//Возвращает массив маркеров со структурой как у объекта Marker.
function getMarkersFromServer() {
	//console.log("getMarkersFromServer");
	$.getJSON("database/selectdata.php")
		.success(function(data) {
			//console.log(data);
			refreshMarkersArray(data)
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
	//console.log(jsonObj);
	$.ajax({
		type: 'POST',
		url: 'database/deletedata.php',
		data: jsonObj,
		dataType: 'json'
	});
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
	$.getJSON('database/cars/selectposition.php')
        .success(function(data) {
            refreshTeamsArray(data)
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

