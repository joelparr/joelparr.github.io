<?php

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

// If the request is a post, insert the data into the table
if($_SERVER['REQUEST_METHOD'] == 'POST') 
{
	if ($_POST['operation'] == 'insert')
	{
		// Insert form data into table
		$insertresults = $ftclient->query
		(
			SQLBuilder::insert
			(
				$tableid, 
				array
				(
					'Name' => $_POST['name'],
					'Address' => $_POST['address'],
					'Location' => $_POST['location'],
					'Games' => $_POST['games']
				)
			)
		);
		$insertresults = explode("\n", $insertresults);
		$rowid1 = $insertresults[1];
	}
	elseif ($_POST['operation'] == 'update')
	{
		// Update the specified row
		$updateresults = $ftclient->query
		(
			SQLBuilder::update
			(
				$tableid, 
				array
				(
					'Games' => $_POST['games']
				), 
				$_POST['rowid']
			)
		);
		$updateresults = explode("\n", $updateresults);
		$rowid2 = $$updateresults[1];
	}
}
?>