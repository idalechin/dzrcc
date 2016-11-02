<?php

	$servername = "localhost";
	$username = "dzrcctk_maks";
	$password = "Iskra66!";
	$dbname = "dzrcctk_db";

	$json_data = json_decode(file_get_contents('php://input'));

	$code = $json_data->{"code"};
	$lat = $json_data->{"lat"};
	$lon = $json_data->{"lon"};


	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 

	$sql = "UPDATE markers SET  lat = '" . $lat . "', '" . $lon . "' WHERE id = '" . $id . "';";

	if ($conn->multi_query($sql) === TRUE) {
		echo "New records created successfully";
	} else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$conn->close();
