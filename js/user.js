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

// ----------------
/*--------------------------------- Preview Profile Section -------------------------------------------*/
// On Load
document.onload = createPeriewProfile();
liPerview.onclick = function () {
  for (let i = 0; i < mainLinksUl.children.length; i++) {
    mainLinksUl.children[i].classList.remove("active");
  }
  this.classList.add("active");
};
liPerview.addEventListener("click", createPeriewProfile);

// Function to Create Perview Profie Section
function createPeriewProfile() {
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

liLinks.onclick = function () {
  //change an active "Li"
  for (let i = 0; i < mainLinksUl.children.length; i++) {
    mainLinksUl.children[i].classList.remove("active");
  }
  this.classList.add("active");
};

liLinks.addEventListener("click", createLinks);

function createLinks() {
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
}
liLinks.addEventListener("click", assignVarsOfLinksSecton);

function assignVarsOfLinksSecton() {
  let btnAddLink = document.querySelector(".links-section button");
  // btnAddLink.addEventListener("click", createAddLinkBox, true);
  btnAddLink.onclick = function createAddLinkBox() {
    document.querySelector(
      ".links-section .container"
    ).innerHTML += `<div class='add-link-box'>
      <span class='close'>X</span>
      <input autocomplete='off' type='text' name='name' placeholder='الإسم'>
      <input autocomplete='off' type='link' name='link' placeholder='الرابط'>
      <input type='submit' value='إضافة'>
      </div>`;
    document.querySelector(".links-section .add-link-box").style.display =
      "flex";
    let btnCloseAddLink = document.querySelector(".links-section .close");
    btnCloseAddLink.onclick = function () {
      //document.querySelector(".links-section .add-link-box").remove();
      //style.transform ="translate(-50%, -50%) scale(0.5)";
      document.querySelector(".links-section .add-link-box").style.display =
        "none";
    };
  };
}
