import memberTable from "./memberTable.js";
import initializeForm from "./roleForm.js";

async function getMemberData() {
  const res = await fetch("/api/memberData");
  return res.json();
}

function main() {
  const carTableNode = document.getElementById("memberTable");
  const response = document.getElementById("response");
  const navigation = document.getElementById("navigation");
  const loginUser = document.getElementById("loginUser");
  getMemberData().then((res) => {
    if (res.permission === false) {
      response.innerHTML =
        "You have no permission to see this page. <a href='/'>Go back</a>";
    }
    loginUser.innerHTML = `logged in as ${res.username}`;
    memberTable(carTableNode, res.data, main);
    navigation.innerHTML =
      "<a href='/logout'>Log out</a><a href='/'>Car Table</a>";
  });
  initializeForm(main);
}

main();
