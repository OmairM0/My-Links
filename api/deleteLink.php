<?php
if ($_SERVER["REQUEST_METHOD"]=="POST") {
    session_start();
    // echo $_POST["name"];
    $mail = $_SESSION["mail"];
    include("../db.php");
    function getSingleValue($conn, $sql, $parameters)
    {
        $q = $conn->prepare($sql);
        $q->execute($parameters);
        return $q->fetchColumn();
    }
    $id = getSingleValue($conn, "select id from users where email=?", [$mail]);
    // DELETE FROM `links-list` WHERE `link-id` = 13
    $urlID = $_POST["urlId"];
    // $url = $_POST["link"];
    $query = $conn->prepare("DELETE FROM `links-list` WHERE `link-id` = ?");
    $query->execute([$urlID]);
}

?>