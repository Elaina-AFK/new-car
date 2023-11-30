import { textNode, input, td, th, tr, thead, tbody, button } from "./Table.js";
import htmlMethod from "./api.js";

// states
let tableNodeRef;
let memberData;
let refetch = () => {};
let editStates = {};

// function

function memberthead() {
  const th1 = th("username");
  const th2 = th("role");
  const th3 = th("added");
  const th4 = th("modified");
  const action = th("action");
  const trh = tr(th1, th2, th3, th4, action);
  return thead(trh);
}

function membertbody(data) {
  return tbody(...data.map((member) => noEditTr(member)));
}

function deleteButton(id) {
  return button("delete", () => {
    htmlMethod("DELETE", "/api/memberData", { id: id }).then((res) => {
      if (res.pass) {
        refetch();
        return;
      }
      console.log("Delete unsuccessful");
    });
  });
}

function noEditTr(member) {
  const tdName = td(textNode(member.username));
  const tdRole = td(textNode(member.role));
  const tdAdded = td(textNode(member.added));
  const tdModified = td(textNode(member.modified));
  const tdAction = td(
    button("edit", () => {
      editStates[member.id] = true;
      updateTable();
    }),
    deleteButton(member.id)
  );
  const trNode = tr(tdName, tdRole, tdAdded, tdModified, tdAction);
  trNode.id = member.id;
  return trNode;
}

function initialEdit(data) {
  data.forEach((member) => {
    editStates[member.id] = false;
  });
}

function memberTable(tableNode, data, refetchFunction) {
  refetch = refetchFunction;
  tableNodeRef = tableNode;
  memberData = data;
  initialEdit(data);

  updateTable();
}

function updateTable() {
  tableNodeRef.innerHTML = "";
  tableNodeRef.appendChild(memberthead());
  tableNodeRef.appendChild(membertbody(memberData));
}

export default memberTable;
