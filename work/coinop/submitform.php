<html>

<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
phpinfo();
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
if($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Insert form data into table
  $insertresults = $ftclient->query(SQLBuilder::insert($tableid, 
    array('Name'=> $_POST['name'],
    'Address' => $_POST['address'],
    'Games' => $_POST['games'])));
  $insertresults = explode("\n", $insertresults);
  $rowid1 = $insertresults[1];
}

?>

<head>
<title>Simple Form Example</title>

<style>
  body { font-family: Arial, sans-serif; }
  #map_canvas { height: 300px; width:400px; }
</style>

</head>

<body>

<h1>Simple Form Example</h1>

<h2>Insert data</h2>
<form method="post" action="submitform.php">
  Name: <input type="text" name="name" id="name" value="Kung Fu Saloon" /><br />
  Games: <input type="text" name="games" id="games" value="Galaga" /><br />
  Games: <input type="text" name="address" id="address" value="510 Rio Grande Street, Austin, TX 78701, United States" /><br />
  <input type="submit" value="Submit" />
</form>

<h2>Table data</h2>
<p>
<?php
// Show the data from table
$table_data = $ftclient->query(SQLBuilder::select($tableid));
$table_data = explode("\n", $table_data);
for($i = 0; $i < count($table_data); $i++) {
  echo $table_data[$i] . '<br />';
} 
?>
</p>
</body>
</html>