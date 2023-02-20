<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إنشاء حساب</title>
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

      <?php
      if ($_SERVER["REQUEST_METHOD"] == "POST"){
        // echo $_POST['name'];
        // echo $_POST["email"];
        // echo $_POST["password"];
        // echo $_POST["username"];
        $servername = "localhost";
      $username = "root";
      $password = "";
      $db = new PDO("mysql:host=$servername;dbname=links", $username, $password);
      function isUnique($email){
        $query = "select * from users where email='$email'";
        global $db;
        
        $result = $db->query($query);
        // echo $result->num_rows;
        
        if($result->rowCount() > 0){
            return false;
        }
        else return true;
        
      }
      }
      
      ?>

      <div class="form">
        <div class="container">
            <form id="frm-signIn" action="" method="post">
                <p id="error">
                <?php
                echo $_SERVER["REQUEST_METHOD"];
                if ($_SERVER["REQUEST_METHOD"] == "POST"){
                  if(isUnique($_POST["email"]) == false){
                    echo "هذا البريد الإلكتروني مستخدم بالفعل";
                  }
                }
                ?>
                </p>
                <input type="text" required name="name" placeholder="الإسم">
                <input type="email" required name="email" placeholder="البريد الإلكتروني">
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