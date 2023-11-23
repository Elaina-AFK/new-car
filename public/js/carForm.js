import htmlMethod from "./api.js";
import initializeYearOption from "./yearOption.js";

function initializeForm(refetchFunction) {
  const formNode = document.getElementById("formTable");
  const yearNode = document.getElementById("yearInput");
  initializeYearOption(yearNode);
  formNode.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    htmlMethod("POST", "/api/carData", data).then((res) => {
      if (!res.pass) {
        console.log("This name already existed");
        return;
      }
      refetchFunction();
    });
  };
}

export default initializeForm;
