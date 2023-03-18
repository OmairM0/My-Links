profileImg = document.querySelector(".settings img");
settingsUl = document.querySelector(".settings ul");
settingsLi = document.querySelector(".settings ul li");
menuIcon = document.querySelector(".settings .menu-icon i");
let mainLinks = document.querySelector(".main-links");
let mainLinksUl = document.querySelector(".main-links ul");
let mainLinksHref = document.querySelector(".main-links li a");
let content = document.querySelector("body > .main-content");
let liPerview = document.querySelector("ul .li-perview");
let liLinks = document.querySelector("ul .li-links");
let liSettings = document.querySelector("ul .li-settings");
let liTheme = document.querySelector("ul .li-theme");

document.onclick = function (e) {
  let t = e.target;
  if (t != settingsUl && t != profileImg && t.parentElement != settingsUl) {
    settingsUl.classList.remove("active");
  }
  if (t != mainLinks && t != menuIcon && checkPath(t) != true) {
    mainLinks.classList.remove("active");
  }
};

profileImg.onclick = function () {
  settingsUl.classList.toggle("active");
};

// Set Position-Left=0 For Main Links
menuIcon.addEventListener("click", function () {
  mainLinks.classList.add("active");
});

// Check the path if it contains "main-links"
function checkPath(element) {
  let parent = element.parentElement;
  let path = [];
  if (
    element.tagName == "BODY" ||
    element.tagName == "HTML" ||
    element.className == "btnAdd"
  ) {
    return false;
  }
  for (let i = 0; i < 15; i++) {
    if (parent.tagName == "BODY") {
      break;
    }
    parent = parent.parentElement;
    if (parent == null) {
      break;
    }
    path.push(parent.className);
  }
  if (path.includes("main-links active")) {
    return true;
  } else {
    return false;
  }
}

// Change An Active "Li" When User Click on "Li"
function changeActiveLi(li) {
  //change an active "Li"
  for (let i = 0; i < mainLinksUl.children.length; i++) {
    mainLinksUl.children[i].classList.remove("active");
  }
  li.classList.add("active");
}

// ----------------
/*--------------------------------- Preview Profile Section -------------------------------------------*/
// On Load
document.onload = createPeriewProfile();

liPerview.addEventListener("click", createPeriewProfile);

// Function to Create Perview Profie Section
function createPeriewProfile() {
  //change an active "Li"
  changeActiveLi(liPerview);
  // Clear previous content From "content" Div
  if (content.firstChild != null) {
    content.removeChild(content.firstChild);
  }
  let viewMainDiv = document.createElement("div");
  viewMainDiv.className = "view";
  let viewContainer = document.createElement("div");
  viewContainer.className = "container";
  let viewH2 = document.createElement("h2");
  let h2Text = document.createTextNode("معاينة");
  viewH2.appendChild(h2Text);

  let viewBox = document.createElement("div");
  viewBox.className = "view-box";
  let imgDiv = document.createElement("div");
  imgDiv.className = "img";
  let img = document.createElement("img");
  img.src = "../imgs/avatar-0.png";
  imgDiv.appendChild(img);
  viewBox.appendChild(imgDiv);
  //--
  let title = document.createElement("div");
  title.className = "title";
  let arrinfo = {};
  fetch("../api/getInfo.php", {
    method: "post",
  })
    .then((response) => response.json())
    .then(function (res) {
      arrinfo = res;
      console.log(res);
      let name = document.createElement("p");
      name.className = "name";
      let nameText = document.createTextNode(arrinfo[0].name);
      name.appendChild(nameText);
      let job = document.createElement("p");
      job.className = "job";
      let jobText = document.createTextNode(arrinfo[1].job);
      job.appendChild(jobText);
      let desc = document.createElement("p");
      desc.className = "desc";
      let descText = document.createTextNode(arrinfo[3].description);
      desc.appendChild(descText);
      title.append(name, job, desc);
    })
    .catch(function (error) {
      console.log(error);
    });
  // let name = document.createElement("p");
  // name.className = "name";
  // let nameText = document.createTextNode("Omair Mohammed");
  // name.appendChild(nameText);
  // let job = document.createElement("p");
  // job.className = "job";
  // let jobText = document.createTextNode("Fornt-End Developer");
  // job.appendChild(jobText);
  // title.append(name, job);
  //---
  let links = document.createElement("div");
  links.className = "links";
  //---
  let arrLinks = {};
  fetch("../api/getLinks.php", {
    method: "post",
  })
    .then((response) => response.json())
    .then(function (res) {
      arrLinks = res;
      for (let xs in arrLinks) {
        // console.log(arrLinks[xs].name + "==>" + arrLinks[xs].url);
        let aLink = document.createElement("a");
        aLink.href = arrLinks[xs].url;
        aLink.target = "_blank";
        let aText = document.createTextNode(arrLinks[xs].name);
        aLink.appendChild(aText);
        links.append(aLink);
      }
      // return links;
    });

  // let a1 = document.createElement("a");
  // a1.href = "#";
  // let a1Text = document.createTextNode("المدونة");
  // a1.appendChild(a1Text);

  // let a2 = document.createElement("a");
  // a2.href = "#";
  // let a2Text = document.createTextNode("Facebook");
  // a2.appendChild(a2Text);

  // let a3 = document.createElement("a");
  // a3.href = "#";
  // let a3Text = document.createTextNode("Twitter");
  // a3.appendChild(a3Text);

  // links.append(a1, a2, a3);
  //---
  viewBox.appendChild(title);
  viewBox.appendChild(links);
  viewContainer.appendChild(viewH2);
  viewContainer.appendChild(viewBox);
  viewMainDiv.appendChild(viewContainer);
  content.appendChild(viewMainDiv);
}
//------

/*--------------------------------- Notification Section -------------------------------------------*/
// Create notification
function notification(text) {
  document.querySelector(".notification").innerText = text;
  setTimeout(() => {
    document.querySelector(".notification").style.right = "0px";
  }, 500);

  setTimeout(() => {
    document.querySelector(".notification").style.right = "-230px";
  }, "2000");
  // setTimeout(() => {
  //   document.querySelector(".notification").remove();
  // }, "3000");
}

/*--------------------------------- Links Section -------------------------------------------*/
//-- Varibles
let btnAddLink;
let btnCloseAddLink;

liLinks.addEventListener("click", createLinks);
function edit(name, url) {
  console.log(name);
}

function createLinks() {
  //change an active "Li"
  changeActiveLi(liLinks);
  // Clear previous content From "content" Div
  if (content.firstChild != null) {
    content.removeChild(content.firstChild);
  }

  let linksMainDiv = document.createElement("div");
  linksMainDiv.className = "links-section";

  let linksContainer = document.createElement("div");
  linksContainer.className = "container";

  let linksH2 = document.createElement("h2");
  let h2Text = document.createTextNode("الروابط");
  linksH2.appendChild(h2Text);

  let btn = document.createElement("button");
  btn.className = "btnAdd";
  let btnText = document.createTextNode("إضافة رابط");
  btn.appendChild(btnText);
  btn.setAttribute("onclick", "createAddLinkBox()");
  //--
  let linksBox = document.createElement("div");
  linksBox.className = "linkbox";
  let ulLinks = document.createElement("ul");
  ulLinks.className = "ListOfLinks";

  let arrLinks = {};
  fetch("../api/getLinks.php", {
    method: "post",
  })
    .then((response) => response.json())
    .then(function (res) {
      arrLinks = res;
      for (let xs in arrLinks) {
        let liList = document.createElement("li");
        liList.className = "link";
        let aLink = document.createElement("a");
        aLink.href = "javascript:void(0)";
        // aLink.href = arrLinks[xs].url;
        aLink.target = "_blank";

        let aText = document.createTextNode(arrLinks[xs].name);
        aLink.appendChild(aText);
        // aLink.setAttribute(
        //   "onclick",
        //   `editLinkBox("${arrLinks[xs].name}", "${arrLinks[xs].url}")`
        // );
        // aLink.setAttribute("onclick", "event.preventDefault()");
        aLink.setAttribute("onclick", "editLinkBox()");
        liList.append(aLink);
        // aLink.addEventListener("click", editLinkBox);
        liList.innerHTML += `<div class='edit-link-box'>
          <span class='err'></span>
          <input required autocomplete='off' type='text' value=${arrLinks[xs].name} name='name' placeholder='الإسم'>
          <input required autocomplete='off' type='url' value=${arrLinks[xs].url} name='link' placeholder='الرابط'>
          <div>
          <button onclick='editLink(${arrLinks[xs].id})' id=${arrLinks[xs].id} class='save'>حفظ التعديل</button>
          <button onclick='deleteLink(${arrLinks[xs].id})' id=${arrLinks[xs].id} class='delete'>حذف</button>
          </div>
          </div>`;
        document.querySelector(".ListOfLinks").appendChild(liList);
      }
      linksBox.append(ulLinks);
    });
  linksBox.append(ulLinks);

  //--
  linksContainer.append(linksH2, btn, linksBox);
  linksMainDiv.appendChild(linksContainer);
  content.appendChild(linksMainDiv);
  document.querySelector(
    ".links-section .container"
  ).innerHTML += `<div class='add-link-box'>
    <span onclick='CloseAddLink()' class='close'>X</span>
    <span class='err'></span>
    <input required autocomplete='off' type='text' name='name' placeholder='الإسم'>
    <input required autocomplete='off' type='url' name='link' placeholder='الرابط'>
    <input onclick='addLinkToData()'  type='submit' value='إضافة'>
    </div>`;
}
liLinks.addEventListener("click", assignVarsOfLinksSecton);

function editLinkBox() {
  event.preventDefault();
  event.target.parentElement.children[1].classList.toggle("show");
}

function deleteLink(id) {
  const formData = new FormData();
  formData.append("urlId", id);
  fetch("../api/deleteLink.php", { method: "POST", body: formData });
  event.target.parentElement.parentElement.parentElement.remove();
  notification("تم حذف الرابط بنجاح");
}

function editLink(id) {
  let name = event.target.parentElement.parentElement.children.name.value;
  let url = event.target.parentElement.parentElement.children.link.value;
  const formData = new FormData();
  formData.append("urlId", id);
  formData.append("name", name);
  formData.append("link", url);
  fetch("../api/editLink.php", { method: "POST", body: formData });
  createLinks();
  notification("تم حفظ التعديلات بنجاح");
}

function createAddLinkBox(name, url) {
  document.querySelector(".links-section .add-link-box").classList.add("show");
}

function assignVarsOfLinksSecton() {
  btnAddLink = document.querySelector(".links-section button");
  btnCloseAddLink = document.querySelector(".links-section .close");
  let submitLink = document.querySelector(".add-link-box input[type='submit']");
  // btnAddLink.addEventListener("click", createAddLinkBox);
  // function createAddLinkBox(name, url) {
  //   document
  //     .querySelector(".links-section .add-link-box")
  //     .classList.add("show");
  // }
  // btnCloseAddLink.onclick =

  // submitLink.addEventListener("click", addLinkToData);
}
function CloseAddLink() {
  document
    .querySelector(".links-section .add-link-box")
    .classList.remove("show");
}
function addLinkToData() {
  let url = "../api/addLink.php";
  let linkName = document.querySelector(
    ".add-link-box input[name='name']"
  ).value;
  let linkURL = document.querySelector(
    ".add-link-box input[name='link']"
  ).value;

  const isValidUrl = (urlString) => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };

  if (linkName.trim().length < 1) {
    document.querySelector(".links-section .add-link-box span.err").innerText =
      "لايمكن ترك الإسم فارغاً.";
  } else if (isValidUrl(linkURL) == false) {
    document.querySelector(".links-section .add-link-box span.err").innerText =
      "الرابط غير صحيح.";
  } else {
    const formData = new FormData();
    formData.append("name", linkName);
    formData.append("link", linkURL);
    fetch(url, { method: "POST", body: formData });
    document
      .querySelector(".links-section .add-link-box")
      .classList.remove("show");
    document.querySelector(".add-link-box input[name='name']").value = "";
    document.querySelector(".add-link-box input[name='link']").value = "";
    createLinks();
    notification("تم إضافة الرابط بنجاح");
  }
}

/*--------------------------------- Account Settings Section -------------------------------------------*/
liSettings.addEventListener("click", createAccountSettings);

function createAccountSettings() {
  //change an active "Li"
  changeActiveLi(liSettings);
  // Clear previous content From "content" Div
  if (content.firstChild != null) {
    content.removeChild(content.firstChild);
  }

  let accountSettingsDiv = document.createElement("div");
  accountSettingsDiv.className = "account-settings-section";

  let accountSettingsContainer = document.createElement("div");
  accountSettingsContainer.className = "container";

  let accSettH2 = document.createElement("h2");
  let h2Text = document.createTextNode("إعدادات الحساب");
  accSettH2.appendChild(h2Text);
  //--
  let inpDiv = document.createElement("div");
  inpDiv.className = "box";
  let errSpan = document.createElement("span");
  errSpan.className = "err";
  inpDiv.append(errSpan);
  let arrinfo = {};
  fetch("../api/getInfo.php", {
    method: "post",
  })
    .then((response) => response.json())
    .then(function (res) {
      arrinfo = res;
      // let profile = document.createElement("div");
      // profile.className = "profile";
      // let imgProfile = document.createElement("input");
      // imgProfile.type = "file";
      // imgProfile.name = "imgProfile";
      // profile.append(imgProfile);
      // inpDiv.append(profile);

      let name = document.createElement("input");
      name.type = "text";
      name.name = "name";
      name.placeholder = "الإسم";
      name.value = arrinfo[0].name;

      let username = document.createElement("input");
      username.type = "username";
      username.name = "username";
      username.placeholder = "اسم المستخدم";
      username.value = arrinfo[2].username;

      let description = document.createElement("textarea");
      description.placeholder = "وصف قصير";
      description.value = arrinfo[3].description;

      inpDiv.append(name, username, description);
      let btn = document.createElement("button");
      btn.className = "save-btn";
      let btnText = document.createTextNode("حفظ");
      btn.appendChild(btnText);
      btn.setAttribute("onclick", "saveInfo()");

      inpDiv.append(btn);
    });

  //--

  accountSettingsContainer.append(accSettH2, inpDiv);
  accountSettingsDiv.appendChild(accountSettingsContainer);
  content.appendChild(accountSettingsDiv);
}

function saveInfo() {
  let name = document.querySelector(
    ".account-settings-section input[name='name']"
  ).value;
  let username = document.querySelector(
    ".account-settings-section input[name='username']"
  ).value;
  let desc = document.querySelector(".account-settings-section textarea").value;

  function validationUsername(username) {
    let reg = /[\u0600-\u06FF\u0750-\u077F]/;
    let reg2 = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
    if (username.length < 4) {
      return "short";
    }
    if (reg.test(username)) {
      return "arbic";
    }
    if (!reg2.test(username)) {
      return "wrong";
    }
  }

  if (name.trim().length < 4) {
    document.querySelector(".account-settings-section .err").innerText =
      "يجب أن لايقل الإسم عن 4 أحرف";
  } else if (validationUsername(username)) {
    document.querySelector(".account-settings-section .err").innerText =
      "إسم المستخدم خطأ";
  } else {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("description", desc);
    fetch("../api/editInfo.php", { method: "POST", body: formData });
    createAccountSettings();
    notification("تم حفظ البيانات بنجاح");
  }
}

/*--------------------------------- Theme Section -------------------------------------------*/
liTheme.addEventListener("click", createThemeSection);

function createThemeSection() {
  //change an active "Li"
  changeActiveLi(this);
  // Clear previous content From "content" Div
  if (content.firstChild != null) {
    content.removeChild(content.firstChild);
  }

  let themeMainDiv = document.createElement("div");
  themeMainDiv.className = "theme-section";

  let themeContainer = document.createElement("div");
  themeContainer.className = "container";

  let themeH2 = document.createElement("h2");
  let h2Text = document.createTextNode("المظهر");
  themeH2.appendChild(h2Text);

  let p = document.createElement("p");
  let txt = document.createTextNode(
    "هذه الميزة غير متوفرة في الوقت الحالي، سيتم تفعيلها قريباً"
  );
  p.appendChild(txt);

  themeContainer.append(themeH2, p);
  themeMainDiv.appendChild(themeContainer);
  content.appendChild(themeMainDiv);
}

/* #################################### Some Functions ############################################*/
// Function to copy the link of user profile
function copyLink() {
  var target = event.target;
  navigator.clipboard.writeText(target.innerText);
  notification("تم نسخ الرابط");
}

function openTheUserLink() {
  window.open(document.querySelector(".userLink").innerText);
}
