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

	$sql = "SELECT t1.* FROM positions t1 inner join (select carId, max(time) as time from positions group by carId) t2 where t1.carId = t2.carId and t1.time = t2.time";
	if (isset($_GET["id"])){
		$carId = $_GET["id"];
		$sql = "SELECT t1.* FROM positions t1 inner join (select carId, max(time) as time from positions group by carId) t2 where t1.carId = t2.carId and t1.time = t2.time and t1.id = $carId";
	}
	
	$result = $conn->query($sql);
	$positions = array();
	
	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			$position = new Position($row["carId"],$row["lat"],$row["lng"],$row["time"]);
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

	
	
	