<?php


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

	$sql = "SELECT id, carId, lat, lng, time FROM positions";


	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			echo "id: " . $row["id"]. ", car:" . $row["carId"]. ", lat:" . $row["lat"]. ", lon:" . $row["lng"]. ", time:" . $row["time"]. "<br>";
		} 	
	} else {
		echo "0 results";
	}

	$conn->close();