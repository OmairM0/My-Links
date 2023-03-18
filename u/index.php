<?php
    include("../db.php");
    function getSingleValue($conn, $sql, $parameters)
    {
        $q = $conn->prepare($sql);
        $q->execute($parameters);
        return $q->fetchColumn();
    }
    $username = $_GET["username"];
    $select = $conn->prepare('SELECT name FROM users WHERE username = ?');
    $select->execute([$username]);
    if ($select->rowCount() > 0):
        $name =getSingleValue($conn, "select name from users where username=?", [$username]);
        $job =getSingleValue($conn, "select job from users where username=?", [$username]);
        $desc =getSingleValue($conn, "select description from users where username=?", [$username]);

        $id = getSingleValue($conn, "select id from users where username=?", [$username]);
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
        // echo json_encode($data);
     
    
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $name?></title>
    <link rel="icon" type="image/x-icon" href="../imgs/myLinks.png">
    <link rel="stylesheet" href="../css/userView.css">
    <link rel="stylesheet" href="../css/normalize.css" />
    <!-- Font Awesome -->
    <link rel="stylesheet" href="../css/all.min.css" />
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;700&display=swap"
      rel="stylesheet"
    />
</head>
<body>

    <div class="user">
        <div class="container">
            <div class="card">
            <div class="head">
                <div class="img">
                    <img src="../imgs/avatar-0.png" alt="Avatar">
                </div>
                <div class="title">
                    <p class='name'><?php echo $name ?></p>
                    <p class='job'><?php echo $job ?></p>
                    <p class='desc'><?php echo $desc ?></p>
                </div>
            </div>
            <div class="links">
                <?php
                    foreach($data as $l){
                        echo "<a href={$l["url"]} target='_blank'>{$l["name"]}</a>";
                    }
                ?>
            </div>
            </div>
        </div>
        <div class="footer"></div>
    </div>
    
</body>
</html>
<?php 
else :
    echo "No Name";
endif;

?>