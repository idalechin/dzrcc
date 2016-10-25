<?php

if (isset($_GET["code"]) && preg_match("/^\d+$/", $_GET["code"])
	&& isset($_GET["lat"]) && preg_match("/^-?\d+\.\d+$/", $_GET["lat"])
    && isset($_GET["lon"]) && preg_match("/^-?\d+\.\d+$/", $_GET["lon"])
	//&& isset($_GET["data"]) && preg_match("/^[А-Яа-яЁё.,0-9]*$/u", $_GET["data"])
	) {
	$code = $_GET['code'];
	$lat = $_GET['lat'];
	$lon = $_GET['lon'];
	

	// Create connection
	$conn = new mysqli('localhost','dzrcctk_maks','Iskra66!','dzrcctk_db');
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	$dte = round(microtime(true) * 1000);
	$sql = "INSERT INTO markers (code, lat, lng)
	VALUES ($code, $lat, $lon);";

	if ($conn->multi_query($sql) === TRUE) {
		echo "New records created successfully";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$conn->close();
}else {
	echo "Incorrect params";
}

