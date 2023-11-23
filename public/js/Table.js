// common components

function textNode(text) {
  const node = document.createTextNode(text);
  return node;
}

function input(name, defaultValue) {
  const inputNode = document.createElement("input");
  inputNode.name = name;
  inputNode.defaultValue = defaultValue;
  return inputNode;
}

// table components

function td(...nodeList) {
  const td = document.createElement("td");
  td.append(...nodeList);
  return td;
}

function th(text) {
  const th = document.createElement("th");
  th.appendChild(textNode(text));
  return th;
}

function tr(...tdList) {
  const tr = document.createElement("tr");
  tr.append(...tdList);
  return tr;
}

function thead(trh) {
  const thead = document.createElement("thead");
  thead.appendChild(trh);
  return thead;
}

function tbody(...trList) {
  const tbody = document.createElement("tbody");
  tbody.append(...trList);
  return tbody;
}

function button(text, onClick = () => {}) {
  const button = document.createElement("button");
  button.innerHTML = text;
  button.onclick = onClick;
  return button;
}

export { textNode, input, td, th, tr, thead, tbody, button };
