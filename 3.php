<?php
$team = basename(__FILE__, '.php');
if (isset($_GET["lat"]) && preg_match("/^-?\d+\.\d+$/", $_GET["lat"])
    && isset($_GET["lon"]) && preg_match("/^-?\d+\.\d+$/", $_GET["lon"]) ) {
    
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
	$lat = $_GET['lat'];
	$lon = $_GET['lon'];
	$dte = 0;
	if (isset($_GET["t"]) && preg_match("/^\d+$/", $_GET["t"])) {
        $dte = $_GET["t"];
    } else {
		$dte = round(microtime(true) * 1000);
	}
	$sql = "INSERT INTO positions (carId, lat, lng, time)
	VALUES ('".$team."', '".$lat."', '".$lon."','".$dte."');";
	
    if ($conn->multi_query($sql) === TRUE) {
		echo "New records created successfully";
	} else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}
	$conn->close();
} elseif (isset($_GET["tracker"])) {
    echo "OK";
} else {
    header('HTTP/1.0 400 Bad Request');
    echo 'Please type this URL in the <a href="https://play.google.com/store/apps/details?id=fr.herverenault.selfhostedgpstracker">Self-Hosted GPS Tracker</a> Android app on your phone.';
}
