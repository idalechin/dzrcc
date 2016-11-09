<?php
	class Car {
		public $id;
		public $name;
		public $status;
		public function __construct($id, $name, $status) {
		  $this->id = $id;
		  $this->name = $name;
		  $this->status = $status;
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

	$sql = "SELECT id, name, status FROM cars";
	if (isset($_GET["id"])){
		$id = $_GET["id"];
		$sql = "SELECT id, name, status FROM cars WHERE id = $id";
	}
	
	$result = $conn->query($sql);

	$cars = array();
	
	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			$car = new Car($row["id"],$row["name"],$row["status"]);
			$cars[] = $car;
		} 	
	} else {
		echo "0 results";
	}
	$json_data = "";
	if (isset($_GET["id"])){
		$json_data = json_encode($cars[0]);
	} else {
		$json_data = json_encode($cars);
	}
	echo $json_data;
	$conn->close();

	
	
	