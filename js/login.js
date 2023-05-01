let frmLogin = document.getElementById("frm");
let email = document.getElementById("mail");
let error = document.querySelector(".err");

console.log("This From the Out");
frmLogin.addEventListener("submit", function (e) {
  console.log("This From the Submitting");
  e.preventDefault();
  error.innerText = "";
  const formData = new FormData(this);
  fetch("checkData.php", {
    method: "post",
    body: formData,
  })
    .then((response) => response.text())
    .then(function (txt) {
      console.log(txt);
      if (txt == "Failed") {
        error.innerText = "كلمة المرور أو البريدالإلكتروني غير صحيح.";
        // email.classList.add("err");
        error.classList.add("active");
      } else if (txt == "notActive") {
        error.innerText = "حسابك غير مفعل.";
        error.classList.add("active");
      } else {
        // e.preventDefault(true);
        frmLogin.submit();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});
