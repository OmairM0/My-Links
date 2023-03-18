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
    $linkName = $_POST["name"];
    $url = $_POST["link"];
    $query = $conn->prepare("INSERT INTO `links-list` (`link-id`, `name-link`, `url`, `user-id`) VALUES (?, ?, ?, ?)");
    $query->execute([NULL, $linkName, $url, $id]);
}

?>