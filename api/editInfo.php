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
    $id = getSingleValue($conn, "select id from users where email=?", [$mail]);
    $name = $_POST["name"];
    $username = $_POST["username"];
    $desc = $_POST["description"];
    // UPDATE `users` SET `name` = 'OmaiR Alsrori', `username` = '1fares', `description` = 'test' WHERE `users`.`ID` = 20
    $query = $conn->prepare("UPDATE `users` SET `name` =?, `username` = ?, `description` = ? WHERE `ID` = ?");
    $query->execute([$name, $username, $desc,$id]);
}

?>