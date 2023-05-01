<?php
include('../settings.php');
// echo $_SERVER["HTTP_REFERER"];
// echo $_SERVER["REQUEST_URI"];
// session_start();
// include('../functions.php');
// if(loggedIn()){
//     header("Location:../user/index.php");
//     exit();
// }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>التحقق</title>
    <link rel="icon" type="image/x-icon" href="../imgs/myLinks.png">
    <link rel="stylesheet" href="../css/register.css">
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
    //&& $_SERVER["HTTP_REFERER"] == "http://localhost/My-Links/signIn/"
    if ($_SERVER["REQUEST_METHOD"] === "POST" ){
        include("../db.php");
        function isUniqueMail($email){
            $query = "select * from users where email='$email'";
            global $conn;
            
            $result = $conn->query($query);
            // echo $result->num_rows;
            
            if($result->rowCount() > 0){
                return false;
            }
             else return true;
            
        }
        function isMailRegstWithOutActive($conn, $sql, $parameters){    
            $q = $conn->prepare($sql);
            $q->execute($parameters);
            return $q->fetchColumn();
        }
        $state = isMailRegstWithOutActive($conn, "SELECT state FROM users WHERE email =?", [$_POST["email"]]);

        function isUniqueUsername($username){
            $query = "select * from users where username='$username'";
            global $conn;
            
            $result = $conn->query($query);
            // echo $result->num_rows;
            
            if($result->rowCount() > 0){
                return false;
            }
            else return true;
            
        }

        function valdUsername($username){
            $reg = "/\p{Arabic}/u";
            if(preg_match($reg,$username)){
                return false;
            }else {
                return true;
            }
        }
        // $sr = 0;
        function checkAll($name,$email,$password,$username)
        {
            if (strlen($name) <4) {
                return false;
            } elseif (strlen($email)<4 || !isUniqueMail($email) ) {
                return false;
            } elseif (strlen($password)<8) {
                return false;
            }elseif (strlen($username)<4 || !valdUsername($username) || !isUniqueUsername($username)) {
                return false;
            } else {
                return true;
            }
        }

        // echo checkAll($_POST['name'],$_POST["email"],$_POST["password"],$_POST["username"]);
        
        if (!checkAll($_POST['name'],$_POST["email"],$_POST["password"],$_POST["username"])) {
            // $_SERVER["HTTP_REFERER"] =null;
            header("Location:../signIn/index.php?er=$sre");
        }  else {
            session_start();
            $_SESSION['email'] = $_POST['email'];

            $name  = $_POST['name'];
            $email =  $_POST["email"];
            $password = $_POST["password"];
            $username = $_POST["username"];
            $token = bin2hex(openssl_random_pseudo_bytes(32));
    
            $query = $conn->prepare("INSERT INTO `users` (`ID`, `name`, `email`, `password`, `username`,`token`, `description`, `job`,`photo`, `state`) VALUES (?,?,?,?,?,?,?,?,?,?)");
    
            $query->execute([NULL, $name, $email, $password, $username,$token, '','','',0]);
            $link = $nameOfWebsite."register/activate.php?token=$token";
            $message = "مرحباً $name, رابط تفعيل حسابك هو $link";
            $sender = "From:OmairM1x@gmail.com";

            if(mail($email , 'Activate Account' , $message,$sender)){
                echo<<<"appearMessage"
                <div class='message'>
                <div class='container'>
                مرحباً $name ،أرسلنا لك رابط تفعيل حسابك إلى $email\nقم بتفعل حسابك من الرابط المرسل إليك.
                </div>
                </div>
                appearMessage;
                } else {
                    echo "Failed Send Email";
                }        

            // echo<<<"appearMessage"
            // <div class='message'>
            // <div class='container'>
            // مرحباً $name ،أرسلنا لك رابط تفعيل حسابك إلى $email\nقم بتفعل حسابك من الرابط المرسل إليك.
            // </div>
            // </div>
            // appearMessage;
        }
        
        // elseif ($state == 0) {
        //     $name  = $_POST['name'];
        //     $email =  $_POST["email"];
        //     echo<<<"appearMessage"
        //     <div class='message'>
        //     ارسلنا لك رابط التفعل مسبقاً
        //     مرحباً $name ،أرسلنا لك رابط تفعيل حسابك إلى $email\nقم بتفعل حسابك من الرابط المرسل إليك.
        //     </div>
        //     appearMessage;
        // }
        
    } else {
        // echo "<pre>";
        // print_r($_SERVER);
        // echo "</pre>";
        // echo "<br>";
        echo $_SERVER["REQUEST_METHOD"];
        echo "Bad Request";
    }
        
    ?>
</body>
</html>