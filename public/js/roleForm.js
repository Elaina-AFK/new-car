import htmlMethod from "./api.js";
import initializeRoleOption from "./roleOption.js";

function initializeForm(refetchFunction) {
  const formNode = document.getElementById("formTable");
  const roleNode = document.getElementById("roleInput");
  const response = document.getElementById("response");

  initializeRoleOption(roleNode);
  formNode.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    htmlMethod("POST", "/api/memberData", data).then((res) => {
      if (!res.pass) {
        response.innerHTML = "This username is already existed";
        return;
      }
      refetchFunction();
    });
  };
}

export default initializeForm;
