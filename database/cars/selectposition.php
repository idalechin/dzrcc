<?php
	class Position {
		public $id;
		public $lat;
		public $lon;
		public $time;
		public function __construct($id, $lat, $lon, $time) {
		  $this->id = $id;
		  $this->lat = $lat;
		  $this->lon = $lon;
		  $this->time = $time;
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

	$sql = "SELECT id, lat, lng, max(time) FROM markers group by id";
	if (isset($_GET["id"])){
		$carId = $_GET["id"];
		$sql = "SELECT id, lat, lng, max(time) FROM markers WHERE id = $carId";
	}
	
	$result = $conn->query($sql);
	$positions = array();
	
	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			$position = new Position($row["id"],$row["lat"],$row["lng"],$row["time"]);
			$positions[] = $position;
		} 	
	} else {
		echo "0 results";
	}
	$json_data = "";
	if (isset($_GET["id"])){
		$json_data = json_encode($positions[0]);
	} else {
		$json_data = json_encode($positions);
	}
	echo $json_data;
	$conn->close();

	
	
	