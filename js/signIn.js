//[\u0600-\u06FF\u0750-\u077F]
import { validationPassword, validationUsername } from "./validation.js";
let form = document.getElementById("frm-signIn");
let pass = document.getElementById("password");
let userName = document.getElementById("username");
let error = document.getElementById("error");

form.addEventListener("submit",function (e) {
    // e.preventDefault();
    error.innerText = " ";
    error.classList.remove("active");
    console.log(pass.value);
    if(validationPassword(pass.value) == "short"){
        error.innerText = "يجب أن تكون كلمة المرور من 8 أحرف أو أكثر.";
        error.classList.add("active");
        e.preventDefault();
        return false;
    }
    if (validationUsername(userName.value) == "short"){
        error.innerText = "يجب أن لايقل إسم المستخدم عن 4 أحرف.";
        error.classList.add("active");
        e.preventDefault();
        return false;
    } else if (validationUsername(userName.value) == "arbic"){
        error.innerText = "يجب أن لايحتوي إسم المستخدم على الحروف العربية";
        error.classList.add("active");
        e.preventDefault();
        return false;
    }
});