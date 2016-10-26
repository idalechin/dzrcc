<?php
	$json_data = json_decode(file_get_contents('php://input'));
	$id = $json_data->{"id"};
	$code = $json_data->{"code"};
	$lat = $json_data->{"lat"};
	$lon = $json_data->{"lon"};

	// Create connection
	$conn = new mysqli('localhost','dzrcctk_maks','Iskra66!','dzrcctk_db');
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	$sql = "";
	if($id == null){
		$sql = "INSERT INTO markers (code, lat, lng)
		VALUES ($code, $lat, $lon);";
	} else {
		$sql = "UPDATE markers SET code = $code, lat = $lat, lng = $lon WHERE id = $id;";
	}
	if ($conn->multi_query($sql) === TRUE) {
		echo "New records created successfully";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$conn->close();


