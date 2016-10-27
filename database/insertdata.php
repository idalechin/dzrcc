<?php


	$servername = "localhost";
	$username = "dzrcctk_maks";
	$password = "Iskra66!";
	$dbname = "dzrcctk_db";

	$json_data = json_decode(file_get_contents('php://input'));

	$id = $json_data->{"id"};
	$code = $json_data->{"code"};
	$lat = $json_data->{"lat"};
	$lon = $json_data->{"lon"};
	//$fh = fopen("errors.txt", "w");
    //fwrite($fh, " " . $id . " " . $code . " " . $lat . " " . $lon);
    //fwrite($fh, mb_detect_encoding("кек"));
    //fclose($fh);

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	$sql = "";
	if($id == null){
		$sql = "INSERT INTO markers (code, lat, lng)
		VALUES ($code, '" . $lat . "', $lon);";
	} else {
		$sql = "UPDATE markers SET code = $code, lat = $lat, lng = $lon WHERE id = $id;";
	}
	if ($conn->multi_query($sql) === TRUE) {
		echo "New records created successfully";
	} else {
		$fh = fopen("errors.txt", "w");
       fwrite("Error: " . $sql . "<br>" . $conn->error);
		//fwrite($fh, mb_detect_encoding("кек"));
		fclose($fh);
	//echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$conn->close();


