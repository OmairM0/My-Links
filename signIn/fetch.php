<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST"){
        // $servername = "localhost";
        // $username = "root";
        // $password = "";
        // $db = new PDO("mysql:host=$servername;dbname=links", $username, $password);
        include('../db.php');
        
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

        if(isUniqueMail($_POST["email"]) == false){
            echo "email is aleardy in use";
            return false;
        }

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
        if(isUniqueUsername($_POST["username"]) == false){
            echo "username is aleardy in use";
            return false;
        }

        


    
    }
      