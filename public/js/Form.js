import htmlMethod from "./api.js";

function option(value) {
  const option = document.createElement("option");
  option.innerHTML = value;
  option.value = value;
  return option;
}

function initializeYearOption() {
  const yearNode = document.getElementById("yearInput");
  const thisYear = new Date().getFullYear();
  for (let i = 0; i < 50; i++) {
    yearNode.appendChild(option(thisYear - i));
  }
  yearNode.value = thisYear;
  return yearNode;
}

function initializeForm(refetchFunction) {
  const formNode = document.getElementById("formTable");
  initializeYearOption();
  formNode.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    htmlMethod("POST", "/api/carData", data).then((res) => {
      console.log(res.pass);
      refetchFunction();
    });
  };
}

export default initializeForm;
