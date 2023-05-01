<?php 
// ob_start();
// echo "<pre>";
//         print_r($_SERVER);
//         echo "</pre>";
session_start();
include('../functions.php');
include('../settings.php');
if(loggedIn()){
    header("Location:../user/index.php");
    exit();
}
// ob();
?> 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إنشاء حساب</title>
    <link rel="icon" type="image/x-icon" href="../imgs/myLinks.png">
    <link rel="stylesheet" href="../css/signIn.css">
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
          <div class="login-btn">
            <a href="../login"><button>تسجيل الدخول</button></a>
          </div>
        </div>
      </div>
      <!-- End Header -->
      
      <!-- Start Form -->

      <div class="form">
        <div class="container">
            <form id="frm-signIn" action=<?php echo $nameOfWebsite."register/index.php"?> method="POST">
                <p id="error">
                </p>
                <input id="name" type="text" required name="name" placeholder="الإسم">
                <input id="email" type="email" required name="email" placeholder="البريد الإلكتروني">
                <input id="password" required name="password" type="password" placeholder="كلمة المرور">
                <input id="username" required name="username" type="username" placeholder="إسم المستخدم">
                <input type="submit" value="إنشاء الحساب">
            </form>
        </div>
      </div>
      <!-- End Form -->
      <script src="../js/signIn.js" type="module"></script>
      <script src="../js/validation.js" type="module"></script>
</body>
</html>