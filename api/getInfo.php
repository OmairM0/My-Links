<?php
if ($_SERVER["REQUEST_METHOD"]=="POST") {
    session_start();
    $mail = $_SESSION["mail"];
    include("../db.php");
    function getSingleValue($conn, $sql, $parameters)
    {
        $q = $conn->prepare($sql);
        $q->execute($parameters);
        return $q->fetchColumn();
    }
    $name = getSingleValue($conn, "select name from users where email=?", [$mail]);
    $job = getSingleValue($conn, "select job from users where email=?", [$mail]);
    $username = getSingleValue($conn, "select username from users where email=?", [$mail]);
    $desc = getSingleValue($conn, "select description from users where email=?", [$mail]);
    $data = array();
    array_push($data,array('name'=>$name),array('job'=>$job),array('username'=>$username),array('description'=>$desc),);
    echo json_encode($data);

}

?>