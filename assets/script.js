let navMenu = document.querySelector("#nav-placeholder");
let body = document.querySelector("#body-placeholder");
let footer = document.querySelector("#footer-placeholder");
let navHtml = "nav.html";
let title = document.querySelector("#title-placeholder");

fetch(navHtml)
  .then((response) => response.text())
  .then((data) => {
    navMenu.innerHTML = data;
    document
      .querySelector("#btnHome")
      .addEventListener("click", function (event) {
        event.preventDefault();
        loadView("home");
      });
    document
      .querySelector("#btnExperience")
      .addEventListener("click", function (event) {
        event.preventDefault();
        loadView("experience");
      });
    document
      .querySelector("#btnResearch")
      .addEventListener("click", function (event) {
        event.preventDefault();
        loadView("research");
      });
    document
      .querySelector("#btnTeaching")
      .addEventListener("click", function (event) {
        event.preventDefault();
        loadView("teaching");
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

function getCourseIcons() {
  let courses = [
    "macro",
    "micro",
    "financialMarkets",
    "principles",
    "intermediate",
    "risk",
    "grad",
  ];
  courses.forEach((course) => {
    fetch(`assets/images/${course}.svg`)
      .then((response) => response.text())
      .then((svg) => {
        document.getElementById(`${course}Icon`).innerHTML = svg;
      })
      .catch((error) => console.error("SVG load failed:", error));
  });
}

const viewCallbacks = {
  teaching: () => getCourseIcons(),
};

function loadView(viewName) {
  fetch(`views/${viewName}.html`)
    .then((response) => {
      if (!response.ok) throw new Error("View not found");
      return response.text();
    })
    .then((html) => {
      body.innerHTML = html;
      title.innerHTML = viewName.charAt(0).toUpperCase() + viewName.slice(1);
      history.pushState({ view: viewName }, "", `/${viewName}`);
      if (viewCallbacks[viewName]) {
        return Promise.resolve(viewCallbacks[viewName]());
      }
    })
    .then(() => {
      const images = body.querySelectorAll("img");
      const imagePromises = Array.from(images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            }),
        );
      return Promise.all(imagePromises);
    })
    .then(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    })
    .catch((error) => {
      // Fallback to home view or show error message
      console.error("Failed to load view:", error);
      loadView("home"); // show a "page not found" message?
    });
}

// Listen for back/forward button
window.addEventListener("popstate", (event) => {
  if (event.state && event.state.view) {
    loadView(event.state.view);
  } else {
    // Load default/home view
    loadView("home");
  }
});

// Handle refresh - check URL on page load
window.addEventListener("DOMContentLoaded", () => {
  // Check for 404 redirect first
  const redirect = sessionStorage.getItem("redirect");
  if (redirect) {
    sessionStorage.removeItem("redirect");
    const view = redirect.replace("/", "");
    loadView(view);
    return; // Exit early since we've handled the redirect
  }

  // Otherwise handle normal refresh/direct navigation
  const path = window.location.pathname.replace("/", "");
  if (path && path !== "index.html") {
    loadView(path);
  } else {
    loadView("home"); // default view
  }
});
