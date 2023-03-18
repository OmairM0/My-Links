<?php
function loggedIn(){
    if(isset($_SESSION['mail'])){
        return true;
    } else return false;
}