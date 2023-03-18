<?php 
include('../db.php');

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تفعيل الحساب</title>
    <link rel="icon" type="image/x-icon" href="../imgs/myLinks.png">
    <link rel="stylesheet" href="../css/activate.css">
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
    <!-- Start Header -->
    <div class="header">
        <div class="container">
          <div class="logo">
            <a href="../"><img src="../imgs/logo-links.png" alt="" /></a>
          </div>
          <!-- <div class="login-btn">
            <a href="../login"><button>تسجيل الدخول</button></a>
          </div> -->
        </div>
      </div>
      <!-- End Header -->
    <?php 
    if(isset($_GET['token'])){
      function getSingleValue($conn, $sql, $parameters)
        {
            $q = $conn->prepare($sql);
            $q->execute($parameters);
            return $q->fetchColumn();
        }

        $token = $_GET['token'];
        $id = getSingleValue($conn, "select id from users where email=?", [$mail]);
        $query = "update users set state='1' where token='$token'";
        $setLinks = "INSERT INTO `links-list` (`link-id`, `name-link`, `url`, `user-id`) VALUES (NULL, 'المدونة', '#', $id), (NULL, 'Facebook', '#', $id), (NULL,'Twitter','#',$id)";
        $conn->query($setLinks);
        echo<<<"appearMsg"
        <div class='acoount-activated'>
        تم تفعيل حسابك بنجاح
        <br>
        سيتم تحويلك إلى الصفحة الرئيسية الآن....
        </div>
        appearMsg;
        if($conn->query($query)){
            session_start();
            $_SESSION["mail"] = $mail;
            $_SESSION["pass"] = $userPass;
            header("Location:../user/index.php");
            exit();
        }
        
    }
    ?>
</body>
</html>