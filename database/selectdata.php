<?php
	class Marker {
		public $id;
		public $code;
		public $lat;
		public $lon;
		public $data;
		public function __construct($id, $code, $lat, $lon, $data) {
		  $this->id = $id;
		  $this->code = $code;
		  $this->lat = $lat;
		  $this->lon = $lon;
		  $this->data = $data;
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

	$sql = "SELECT id, code, lat, lng, data FROM markers";
	if (isset($_GET["id"])){
		$id = $_GET["id"];
		$sql = "SELECT id, code, lat, lng, data FROM markers WHERE id = $id";
	}
	if (isset($_GET["code"])){
		$code = $_GET["code"];
		$sql = "SELECT id, code, lat, lng, data FROM markers WHERE code = $code";
	}
	
	$result = $conn->query($sql);

	$markers = array();
	
	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			$marker = new Marker($row["id"],$row["code"],$row["lat"],$row["lng"],$row["data"]);
			$markers[] = $marker;
		} 	
	} else {
		echo "0 results";
	}
	$json_data = "";
	if (isset($_GET["code"])||isset($_GET["id"])){
		$json_data = json_encode($markers[0]);
	} else {
		$json_data = json_encode($markers);
	}
	echo $json_data;
	$conn->close();

	
	
	