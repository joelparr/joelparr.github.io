<html>

<?php
ini_set('display_errors', 1);

//include the files from the PHP FT client library
include('include/fusion-tables-client-php/clientlogin.php');
include('include/fusion-tables-client-php/sql.php');
include('include/fusion-tables-client-php/file.php');

// Table id
$tableid = 1066373;

//Enter your username and password
$username = "joel.parr@gsdm.com";
$password = "galaga.pacm4n";

// Get auth token - it would be better to save the token in a secure database
// rather than requesting it with every page load.
$token = ClientLogin::getAuthToken($username, $password);
$ftclient = new FTClientLogin($token);
?>

<head>
<title>Simple Form Example</title>

<style>
  body { font-family: Arial, sans-serif; }
  #map_canvas { height: 300px; width:400px; }
</style>

</head>

<body>

<h1>Geocode</h1>
<p>Happening now</p>
<h2>Table data</h2>

<p>

<?php

		$table_data = $ftclient->query(SQLBuilder::select($tableid, array('rowid','Address')));
		$table_data = explode("\n", $table_data);
		
		$ch = curl_init();
		
		for($i = 1; $i < count($table_data); $i++) 
		{
			$rowContents = explode(',', $table_data[$i]);
			
			$rowid = $rowContents[0];
			$addr = urlencode(trim($rowContents[1],"\x22\x27"));
			
			$geocodeURL = 'http://maps.googleapis.com/maps/api/geocode/json?address=' . $addr . '&sensor=false';
					
			curl_setopt($ch, CURLOPT_URL, $geocodeURL);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			$geoloc = json_decode(curl_exec($ch), true);
			
			$lat = $geoloc['results'][0]['geometry']['location']['lat'];
			$lng = $geoloc['results'][0]['geometry']['location']['lng'];
			
			echo 'DOING: ' . $rowid . ' - ' . $addr . ' - ' . $lat . ',' . $lng . '<br/>';		
					
			$updateresults = $ftclient->query(SQLBuilder::update($tableid, array('Location'=> $lat . ',' . $lng), $rowid));
			if ($updateresults) echo $rowid . ' DONE!<br />';
		} 
?>
</p>
</body>
</html>