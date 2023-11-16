import htmlMethod from "./api.js";

const loginForm = document.getElementById("loginForm");
const response = document.getElementById("response");

loginForm.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  htmlMethod("POST", "/api/login", data).then((res) => {
    if (res.pass) {
      response.innerHTML =
        "You logged in successfully! click <a href='/'>here</a> to continue.";
    } else {
      response.innerHTML = "Failed to login";
    }
  });
};
