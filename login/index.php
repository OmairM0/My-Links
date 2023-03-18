<?php
include("../functions.php");
session_start();
if(loggedIn()){
  header("Location:../user/index.php");
  exit();
}
include("../db.php");
if($_SERVER["REQUEST_METHOD"] === "POST"){
  $mail = $_POST["email"];
  $userPass = $_POST["password"];

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
    }else{
      return true;
    }   
  }

  $passFromData = getSingleValue($conn, "select password from users where email=?", [$mail]);
  $getState = getSingleValue($conn, "select state from users where email=?", [$mail]);
  if (!isMailValid($mail) || $passFromData != $userPass || $getState == 0) {
    header("Refresh:0");
  } else {
    session_start();
    $_SESSION["mail"] = $mail;
    $_SESSION["pass"] = $userPass;
    header("Location:../user/index.php");
  }


}

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>تسجيل الدخول</title>
    <link rel="icon" type="image/x-icon" href="../imgs/myLinks.png">
    <link rel="stylesheet" href="../css/normalize.css" />
    <link rel="stylesheet" href="../css/login.css" />
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
    <div class="login-box">
      <div class="container">
        <div class="right-part">
          <div class="header">
          <a href="../"><img src="../imgs/logo-links.png" alt="" /></a>
          </div>
          <div class="login-form">
            <h1>تسجيل الدخول</h1>
            <div class="err">
            </div>
            <form id="frm" action="index.php" method="post">
              <input id="mail" name="email" type="email" required placeholder="البريد الإلكتروني" />
              <input id="pass" name="password" type="password" required placeholder="كلمة المرور" />
              <input type="submit" value="تسجيل الدخول" />
            </form>
          </div>
          <div class="footer">
            <!-- <ul>
              <li><a href="#">عن لينكاتي</a></li>
              <li>
                <a href="#">سياسة الخصوصية</a>
              </li>
              <li>
                <a href="#">شروط الإستخدام</a>
              </li>
              <li>
                <a href="#">البيان الصحفي</a>
              </li>
            </ul> -->
          </div>
        </div>
        <div class="left-part">
          <div class="content">
            <p><span>رابط</span> واحد يجمع كل روابطك...</p>
          </div>
        </div>
      </div>
    </div>
    <script>
      let frmLogin = document.getElementById("frm");
      let email = document.getElementById("mail");
      let error = document.querySelector(".err");

    frmLogin.addEventListener("submit",function (e){
      e.preventDefault();
      error.innerText = "";
      const formData = new FormData(this);
      fetch("checkData.php",{
          method: 'post',
          body: formData
      }).then(response => response.text()).then(function (txt) {
          console.log(txt);
          if (txt == "Failed") {
              error.innerText = "كلمة المرور أو البريدالإلكتروني غير صحيح.";
              // email.classList.add("err");
              error.classList.add("active");
          } else if(txt == "notActive"){
              error.innerText = "حسابك غير مفعل.";
              error.classList.add("active");
          } else {
              // e.preventDefault(true);
              frmLogin.submit();
          }
      }).catch(function(error){
          console.log(error);
      });
    });

    </script>
  </body>
</html>


