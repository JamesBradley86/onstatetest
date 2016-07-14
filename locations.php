 <?php
$servername = "localhost";
$username = "ostest";
$password = "VPu>Pa8-&Y^E45f";
$dbname = "ostest";

// set content type as json
header('Content-Type: application/json');

// Create connection
$mysqli = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Alright :)
if(isset($_GET['method'])) {
    
    if($_GET['method'] == 'add') {
        // add new location
        
        // get params
        $name = $_GET['name'];
        $lat = $_GET['lat'];
        $lng = $_GET['lng'];
        
        // prepare insert statement
        $stmt = $mysqli->prepare("INSERT INTO location (name, lat, lng) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $lat, $lng);
        $stmt->execute();
        $stmt->close();
        
        echo '{}';
    }
    
    
} else {
    
    // default behaviour is to dump all locations as JSON
    $data = array();
    if ($result = $mysqli->query("SELECT * FROM location")) {

        while($row = $result->fetch_array(MYSQL_ASSOC)) {
            $data[] = $row;
        }
        
        
        echo json_encode($data);
    }

    $result->close();    
    
}

$mysqli->close();

?> 