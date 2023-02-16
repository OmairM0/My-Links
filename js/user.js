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
menuIcon.onclick = function () {
  mainLinks.classList.add("active");
};

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
  for (let i = 0; i < 10; i++) {
    if (parent.tagName == "BODY") {
      break;
    }
    parent = parent.parentElement;
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
};

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

  let title = document.createElement("div");
  title.className = "title";
  let name = document.createElement("p");
  name.className = "name";
  let nameText = document.createTextNode("Omair Mohammed");
  name.appendChild(nameText);
  let job = document.createElement("p");
  job.className = "job";
  let jobText = document.createTextNode("Fornt-End Developer");
  job.appendChild(jobText);
  title.append(name, job);

  let links = document.createElement("div");
  links.className = "links";

  let a1 = document.createElement("a");
  a1.href = "#";
  let a1Text = document.createTextNode("المدونة");
  a1.appendChild(a1Text);

  let a2 = document.createElement("a");
  a2.href = "#";
  let a2Text = document.createTextNode("Facebook");
  a2.appendChild(a2Text);

  let a3 = document.createElement("a");
  a3.href = "#";
  let a3Text = document.createTextNode("Twitter");
  a3.appendChild(a3Text);

  links.append(a1, a2, a3);

  viewBox.appendChild(title);
  viewBox.appendChild(links);
  viewContainer.appendChild(viewH2);
  viewContainer.appendChild(viewBox);
  viewMainDiv.appendChild(viewContainer);
  content.appendChild(viewMainDiv);
}
//------

/*--------------------------------- Links Section -------------------------------------------*/
//-- Varibles
let btnAddLink;
let btnCloseAddLink;

liLinks.addEventListener("click", createLinks);

function createLinks() {
  //change an active "Li"
  changeActiveLi(this);
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

  let linksBox = document.createElement("div");
  linksBox.className = "linkbox";

  let a1 = document.createElement("a");
  a1.href = "#";
  let a1Text = document.createTextNode("المدونة");
  a1.appendChild(a1Text);

  let a2 = document.createElement("a");
  a2.href = "#";
  let a2Text = document.createTextNode("Facebook");
  a2.appendChild(a2Text);

  let a3 = document.createElement("a");
  a3.href = "#";
  let a3Text = document.createTextNode("Twitter");
  a3.appendChild(a3Text);

  linksBox.append(a1, a2, a3);

  linksContainer.append(linksH2, btn, linksBox);
  linksMainDiv.appendChild(linksContainer);
  content.appendChild(linksMainDiv);
  document.querySelector(
    ".links-section .container"
  ).innerHTML += `<div class='add-link-box'>
    <span class='close'>X</span>
    <input autocomplete='off' type='text' name='name' placeholder='الإسم'>
    <input autocomplete='off' type='link' name='link' placeholder='الرابط'>
    <input type='submit' value='إضافة'>
    </div>`;
}
liLinks.addEventListener("click", assignVarsOfLinksSecton);

function assignVarsOfLinksSecton() {
  btnAddLink = document.querySelector(".links-section button");
  btnCloseAddLink = document.querySelector(".links-section .close");
  btnAddLink.addEventListener("click",createAddLinkBox);
  function createAddLinkBox() {
    document.querySelector(".links-section .add-link-box").classList.add("show");
  };
  btnCloseAddLink.onclick = function () {
    document.querySelector(".links-section .add-link-box").classList.remove("show");
  };
  
}

/*--------------------------------- Account Settings Section -------------------------------------------*/
liSettings.addEventListener("click",createAccountSettings);


function createAccountSettings(){
  //change an active "Li"
  changeActiveLi(this);
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

  let inpDiv = document.createElement("div");
  inpDiv.className = "box";

  let name = document.createElement("input");
  name.type = "text";
  name.placeholder = "الإسم";

  let username = document.createElement("input");
  username.type = "username";
  username.placeholder = "اسم المستخدم";

  let description = document.createElement("textarea");
  description.placeholder = "وصف قصير";

  let btn = document.createElement("button");
  btn.className = "save-btn";
  let btnText = document.createTextNode("حفظ");
  btn.appendChild(btnText);
  
  inpDiv.append(name,username,description,btn);

  accountSettingsContainer.append(accSettH2,inpDiv);
  accountSettingsDiv.appendChild(accountSettingsContainer);
  content.appendChild(accountSettingsDiv);
}


/*--------------------------------- Theme Section -------------------------------------------*/
liTheme.addEventListener("click",createThemeSection);

function createThemeSection(){
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
  let txt = document.createTextNode("هذه الميزة غير متوفرة في الوقت الحالي، سيتم تفعيلها قريباً");
  p.appendChild(txt);

  themeContainer.append(themeH2,p);
  themeMainDiv.appendChild(themeContainer);
  content.appendChild(themeMainDiv);
}