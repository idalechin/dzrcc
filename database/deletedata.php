<?php

if (isset($_GET["id"]) && preg_match("/^\d+$/", $_GET["id"])){
	$id = $_GET["id"];

	// Create connection
	$conn = new mysqli('localhost','dzrcctk_maks','Iskra66!','dzrcctk_db');
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
}else {
	echo "Parameter is incorrect";
}

