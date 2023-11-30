function option(value, selected = false) {
  const option = document.createElement("option");
  option.innerHTML = value;
  option.value = value;
  option.selected = selected;
  return option;
}

function initializeRoleOption(roleNode, defaultValue = "member") {
  const roleList = ["member", "moderator", "admin"];
  roleNode.innerHTML = "";
  roleList.forEach((role) => {
    roleNode.appendChild(
      role === defaultValue ? option(role, true) : option(role)
    );
  });
}

export default initializeRoleOption;
