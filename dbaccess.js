function test(){
	insertData(12,"51", "39.234234");
}

//Добавление маркера в базу
function insertData(code, lat, lon){
	updateData(null, code, lat, lon);
}

//Обновление маркера в базе
function updateData(id, code, lat, lon){
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

function Marker(id, code, lat, lon) {
	this.id = id;
    this.code = code;
    this.lat = lat;
    this.lon = lon;
}