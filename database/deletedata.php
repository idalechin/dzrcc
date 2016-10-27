<?php

	$json_data = json_decode(file_get_contents('php://input'));
	$id = $json_data->{"id"};
	
	$servername = "localhost";
	$username = "dzrcctk_maks";
	$password = "Iskra66!";
	$dbname = "dzrcctk_db";
	
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	$sql = "DELETE FROM markers WHERE id = $id";

	if ($conn->query($sql) === TRUE) {
		echo "Records deleted successfully";
	} else {
		echo "Error: "  . $conn->error;
	}

	$conn->close();


