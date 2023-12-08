import htmlMethod from "./api.js";
import initializeYearOption from "./yearOption.js";

function initializeForm(refetchFunction) {
  const formNode = document.getElementById("formTable");
  const yearNode = document.getElementById("yearInput");
  const response = document.getElementById("response");
  initializeYearOption(yearNode);
  formNode.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    htmlMethod("POST", "/api/carData", data).then((res) => {
      if (res.permission === false) {
        response.innerHTML = "You have no permission to do so!";
        return;
      }
      if (!res.pass) {
        response.innerHTML = "This name already existed";
        return;
      }
      refetchFunction();
      response.innerHTML = "Added car successfully";
    });
  };
}

export default initializeForm;
