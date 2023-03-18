<?php
if ($_SERVER["REQUEST_METHOD"]==="POST") {
    $mail = $_POST["email"];
    $userPass = $_POST["password"];
    include("../db.php");
    function getSingleValue($conn, $sql, $parameters)
    {
        $q = $conn->prepare($sql);
        $q->execute($parameters);
        return $q->fetchColumn();
    }

    function isMailValid($email){
        $query = "select * from users where email='$email'";
        global $conn;
        
        $result = $conn->query($query);

        if($result->rowCount() != 1){
            return false;
        }
        else{
        
        return true;
        }   
    }

    $passFromData = getSingleValue($conn, "select password from users where email=?", [$_POST["email"]]);
    $getState = getSingleValue($conn, "select state from users where email=?", [$mail]);
    if (!isMailValid($mail) || $passFromData != $userPass) {
        echo "Failed";
        return false;
    } else if($getState == 0){
        echo "notActive";
        return false;
    }

}