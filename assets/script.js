let arr = [];
let txt = document.querySelector("#txt");
let add = document.querySelector("#add");
let navMenu = document.querySelector("#nav-placeholder");
// let navMenu = document.querySelector(".navigation-menu");
let body = document.querySelector("#body-placeholder");
let footer = document.querySelector("#footer-placeholder");
let mainDiv = document.querySelector("#mainDiv");
let include = "include.html";
let about = "about.html";
let homeHtml = "views/home.html";
let experienceHtml = "views/experience.html";
let researchHtml = "views/research.html";
let teachingHtml = "views/teaching.html";
let count = 1;
let navHtml = "nav.html";
let footerHtml = "footer.html";
let title = document.querySelector("#title-placeholder");

// function addNav(navobj) {
//     // includes.getAttribute("nav-placeholder");
//     var file = "nav.html";
//     navobj.load(file);
// };
// addNav(includes);
// $(function () {
//     $("#nav-placeholder").load("nav.html");
//   });

fetch(navHtml)
  .then((response) => response.text())
  .then((data) => {
    navMenu.innerHTML = data;
    document
      .querySelector("#btnHome")
      .addEventListener("click", function (event) {
        event.preventDefault();
        fetchSection(homeHtml, body, "Home");
      });
    document
      .querySelector("#btnExperience")
      .addEventListener("click", function (event) {
        event.preventDefault();
        fetchSection(experienceHtml, body, "Experience");
        // setTitle("Experience");
      });
    document
      .querySelector("#btnResearch")
      .addEventListener("click", function (event) {
        event.preventDefault();
        fetchSection(researchHtml, body, "Research");
      });
    document
      .querySelector("#btnTeaching")
      .addEventListener("click", function (event) {
        event.preventDefault();
        fetchSection(teachingHtml, body, "Teaching");
      });
  });

function fetchSection(viewPage, section, pageTitle) {
  fetch(viewPage)
    .then((response) => response.text())
    .then((data) => {
      section.innerHTML = data;
    })
    .then((title.innerHTML = pageTitle));
}

function fetchTeaching(viewPage, section, pageTitle) {
  fetch(viewPage)
    .then((response) => response.text())
    .then((data) => {
      section.innerHTML = data;
      console.log("section", section.querySelector("#macroIcon").innerHTML);
    })
    .then((title.innerHTML = pageTitle))
    .then(
      fetch("macro.html")
        .then((response) => response.text())
        .then((datanew) =>
          section.querySelector("#macroIcon").innerHTML = datanew),
   
    );
}

fetchSection(homeHtml, body, "Home");
// fetchSection(footerHtml, footer);
