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
    $urlID = $_POST["urlId"];
    $linkName = $_POST["name"];
    $url = $_POST["link"];
    // UPDATE `links-list` SET `name-link` = 'hello', `url` = 'hii.com' WHERE `links-list`.`link-id` = 19;
    $query = $conn->prepare("UPDATE `links-list` SET `name-link` = ?, `url` = ? WHERE `link-id` = ?");
    $query->execute([$linkName, $url, $urlID]);
}

?>