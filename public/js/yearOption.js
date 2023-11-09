function option(value) {
  const option = document.createElement("option");
  option.innerHTML = value;
  option.value = value;
  return option;
}

function initializeYearOption(
  yearNode,
  defaultValue = new Date().getFullYear()
) {
  const thisYear = new Date().getFullYear();
  for (let i = 0; i < 50; i++) {
    const year = thisYear - i;
    const optionNode = option(thisYear - i);
    if (year === defaultValue) {
      optionNode.selected = true;
    }
    yearNode.appendChild(optionNode);
  }
  return yearNode;
}

export default initializeYearOption;
