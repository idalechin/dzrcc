<?php
	class Marker {
		public $id;
		public $code;
		public $lat;
		public $lon;
		public function __construct($id, $code, $lat, $lon) {
		  $this->id = $id;
		  $this->code = $code;
		  $this->lat = $lat;
		  $this->lon = $lon;
		}
	} 

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

	$sql = "SELECT id, code, lat, lng FROM markers";

	
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			echo "id: " . $row["id"]. ", code:" . $row["code"]. ", lat:" . $row["lat"]. ", lon:" . $row["lng"]. "<br>";
		} 	
	} else {
		echo "0 results";
	}

	$conn->close();

	
	
	