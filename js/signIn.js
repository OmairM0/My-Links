//[\u0600-\u06FF\u0750-\u077F]
import { validationPassword, validationUsername } from "./validation.js";
let form = document.getElementById("frm-signIn");
let name = document.getElementById("name");
let email = document.getElementById("email");
let pass = document.getElementById("password");
let userName = document.getElementById("username");
let error = document.getElementById("error");


form.addEventListener("submit",function (e) {
    e.preventDefault(false);
    error.innerText = "";
    error.classList.remove("active");
    email.classList.remove("err");
    pass.classList.remove("err");
    userName.classList.remove("err");
    // console.log(pass.value);
    if (name.value.length <4) {
        error.innerText = "يجب أن يكون الإسم أطول من 4 أحرف.";
        error.classList.add("active");
        name.classList.add("err");
        e.preventDefault();
        return false;
    }
    if(validationPassword(pass.value) == "short"){
        error.innerText = "يجب أن تكون كلمة المرور من 8 أحرف أو أكثر.";
        error.classList.add("active");
        pass.classList.add("err");
        e.preventDefault();
        return false;
    }
    if (validationUsername(userName.value) == "short"){
        error.innerText = "يجب أن لايقل إسم المستخدم عن 4 أحرف.";
        error.classList.add("active");
        userName.classList.add("err");
        e.preventDefault();
        return false;
    } else if (validationUsername(userName.value) == "arbic"){
        error.innerText = "يجب أن لايحتوي إسم المستخدم على الحروف العربية";
        error.classList.add("active");
        userName.classList.add("err");
        e.preventDefault();
        return false;
    }else if (validationUsername(userName.value) == "wrong"){
        error.innerText = "اسم المستخدم غير صحيح.";
        error.classList.add("active");
        userName.classList.add("err");
        e.preventDefault();
        return false;
    }

    const formData = new FormData(this);

    fetch("fetch.php",{
        method: 'post',
        body: formData
    }).then(response => response.text()).then(function (txt) {
        // console.log(txt);
        if (txt == "email is aleardy in use") {
            //e.preventDefault();
            error.innerText = "هذا البريد الإلكتروني مستخدم بالفعل";
            email.classList.add("err");
            error.classList.add("active");
        } else if (txt == "username is aleardy in use") {
            //e.preventDefault();
            error.innerText = "اسم المستخدم مستخدم بالفعل";
            userName.classList.add("err");
            error.classList.add("active");
        } else {
            // e.preventDefault(true);
            form.submit();
        }
    }).catch(function(error){
        console.log(error);
    });

});








// var form=document.getElementById('form')

// form.addEventListener('submit', function(e){
//  e.preventDefault()

//  var name=document.getElementById('name').value
//  var body=document.getElementById('body').value

//  fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   body: JSON.stringify({
//     title:name,
//     body:body,

//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   }
//   })
//   .then(function(response){ 
//   return response.json()})
//   .then(function(data)
//   {console.log(data)
//   title=document.getElementById("title")
//   body=document.getElementById("bd")
//   title.innerHTML = data.title
//   body.innerHTML = data.body  
// }).catch(error => console.error('Error:', error)); 
// });