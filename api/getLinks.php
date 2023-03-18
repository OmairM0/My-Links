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

    $nameLink = $conn->query("SELECT `name-link` FROM `links-list` WHERE `user-id` = $id");
    $url = $conn->query("SELECT url FROM `links-list` WHERE `user-id` = $id");
    $linkId = $conn->query("SELECT `link-id` FROM `links-list` WHERE `user-id` = $id");
    $data = array();
    while ($key = $nameLink->fetch()) {
        $value = $url->fetch();
        $urlid = $linkId->fetch();
        array_push($data,array(
            'name'=>$key['name-link'],
            'url'=>$value['url'],
            'id'=>$urlid['link-id'],
        ));
    }
    
    echo json_encode($data);

}

?>