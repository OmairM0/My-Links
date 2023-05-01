<?php
ob_start();
session_start();
include('../functions.php');
include('../db.php');
include('../settings.php');
$mail = $_SESSION["mail"];
if(!loggedIn()){
  header("Location:../login/index.php?err=" . urlencode("out"));
  exit();
}
function getSingleValue($conn, $sql, $parameters)
    {
        $q = $conn->prepare($sql);
        $q->execute($parameters);
        return $q->fetchColumn();
    }
  $username = getSingleValue($conn, "select username from users where email=?", [$mail]);
  ob_end_flush();
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>لوحة التحكم</title>
    <link rel="icon" type="image/x-icon" href="../imgs/myLinks.png">
    <link rel="stylesheet" href="../css/normalize.css" />
    <link rel="stylesheet" href="../css/user.css" />
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
        <a href=""><img src="../imgs/logo-links.png" alt="" /></a>
        </div>
        <div class="settings">
          <img src="../imgs/link-icon.png" alt="" />
          <ul>
            <li>تفعيل الوضع الليلي</li>
            <li><a href="http://localhost/My-Links/logout">تسجيل الخروج</a></li>
          </ul>
          <div class="menu-icon">
            <i class="fa-solid fa-bars"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- End Header -->

    <!-- Start Main Links -->
    <div class="main-links">
      <div class="content">
        <ul class="links">
          <li class="li-perview active">
            <i class="fa-solid fa-eye"></i><a href="#">معاينة</a>
          </li>
          <li class="li-links">
            <i class="fa-solid fa-link"></i><a href="#">الروابط</a>
          </li>
          <li class="li-settings">
            <i class="fa-solid fa-user"></i><a href="#">إعدادات الحساب</a>
          </li>
          <li class="li-theme">
            <i class="fa-solid fa-star"></i><a href="#">المظهر</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- Ens Main Links -->

    <!-- Start Profile Link -->
    <div class="profile-link">
      <div class="link">
        <p onclick='openTheUserLink()'><i class="fa-solid fa-arrow-up-right-from-square"></i></p>
        <p class='userLink' onclick='copyLink()'><?php echo $nameOfWebsite.'u/'.$username; ?></p>
      </div>
    </div>
    <!-- End Profile Link -->

    
    <div class="main-content"></div>

    <!-- Start Notification -->
    <div class='notification'>${text}<div>
      <!-- End Notification -->

    <script src="../js/user.js"></script>
  </body>
</html>
