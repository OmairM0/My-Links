<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>التحقق</title>
</head>
<body>
    <?php 

$servername = "localhost";
$username = "root";
$password = "";

try {
  $conn = new PDO("mysql:host=$servername;dbname=links", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Connected successfully";
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

    echo $_SERVER["REQUEST_METHOD"];
    if ($_SERVER["REQUEST_METHOD"] == "POST"){
        echo $_POST['name'];
        echo $_POST["email"];
        echo $_POST["password"];
        echo $_POST["username"];
    }
        
    ?>
</body>
</html>