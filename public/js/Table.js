// common components

function textNode(text) {
  const node = document.createTextNode(text);
  return node;
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

function button(text) {
  const button = document.createElement("button");
  button.innerHTML = text;
  return button;
}

// state components

// custom components

function carthead() {
  const th1 = th("name");
  const th2 = th("price");
  const th3 = th("year");
  const th4 = th("added");
  const th5 = th("modified");
  const action = th("action");
  const trh = tr(th1, th2, th3, th4, th5, action);
  return thead(trh);
}

function cartbody(data) {
  return tbody(
    ...data.map((car) => {
      const tdName = td(textNode(car.name));
      const tdPrice = td(textNode(car.price));
      const tdYear = td(textNode(car.year));
      const tdAdded = td(textNode(car.added));
      const tdModified = td(textNode(car.modified));
      const tdAction = td(button("edit"), button("delete"));
      const trNode = tr(tdName, tdPrice, tdYear, tdAdded, tdModified, tdAction);
      trNode.id = car.id;
      return trNode;
    })
  );
}

function carTable(tableNode, data) {
  tableNode.appendChild(carthead());
  tableNode.appendChild(cartbody(data));
}

export default carTable;
