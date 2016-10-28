<?php

	$servername = "localhost";
	$username = "dzrcctk_maks";
	$password = "Iskra66!";
	$dbname = "dzrcctk_db";

	$json_data = json_decode(file_get_contents('php://input'));

	$id = $json_data->{"id"};
	$name = $json_data->{"name"};
	$status = $json_data->{"status"};

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	$sql = "INSERT INTO cars (id, name, status) VALUES('" . $id . "', '" . $name . "', '" . $status . "') ON DUPLICATE KEY UPDATE name= '" . $name . "', age= '" . $status . "'";
	if ($conn->multi_query($sql) === TRUE) {
		echo "New records created successfully";
	} else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$conn->close();
