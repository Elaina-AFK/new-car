import htmlMethod from "./api.js";
import initializeYearOption from "./yearOption.js";

// states
let tableNodeRef;
let carData;
let refetch = () => {};
let editStates = {};

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
      return editStates[car.id] ? editTr(car) : noEditTr(car);
    })
  );
}

function deleteButton(id) {
  return button("delete", () => {
    htmlMethod("delete", "/api/carData", { id: id }).then((res) => {
      if (res.pass) {
        refetch();
        return;
      }
      console.log("Delete unsuccessful");
    });
  });
}

function yearSelect() {
  const select = document.createElement("select");
  select.name = "year";
  return select;
}

function noEditTr(car) {
  const tdName = td(textNode(car.name));
  const tdPrice = td(textNode(car.price));
  const tdYear = td(textNode(car.year));
  const tdAdded = td(textNode(car.added));
  const tdModified = td(textNode(car.modified));
  const tdAction = td(
    button("edit", () => {
      editStates[car.id] = true;
      updateTable();
    }),
    deleteButton(car.id)
  );
  const trNode = tr(tdName, tdPrice, tdYear, tdAdded, tdModified, tdAction);
  trNode.id = car.id;
  return trNode;
}

function editTr(car) {
  const nameInput = input("name", car.name);
  nameInput.required = true;
  const priceInput = input("price", car.price);
  priceInput.type = "number";
  priceInput.required = true;
  const yearInput = yearSelect();
  initializeYearOption(yearInput, car.year);
  yearInput.required = true;
  const tdName = td(nameInput);
  const tdPrice = td(priceInput);
  const tdYear = td(yearInput);
  const tdAdded = td(textNode(car.added));
  const tdModified = td(textNode(car.modified));
  const tdAction = td(
    button("update", () => {}),
    button("cancel", () => {
      editStates[car.id] = false;
      updateTable();
    }),
    deleteButton(car.id)
  );
  const trNode = tr(tdName, tdPrice, tdYear, tdAdded, tdModified, tdAction);
  trNode.id = car.id;
  return trNode;
}

function initialEdit(data) {
  data.forEach((car) => {
    editStates[car.id] = false;
  });
}

function carTable(tableNode, data, refetchFunction) {
  refetch = refetchFunction;
  tableNodeRef = tableNode;
  carData = data;
  initialEdit(data);

  updateTable();
}

function updateTable() {
  tableNodeRef.innerHTML = "";
  tableNodeRef.appendChild(carthead());
  tableNodeRef.appendChild(cartbody(carData));
}

export default carTable;
