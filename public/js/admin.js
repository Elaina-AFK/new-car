import memberTable from "./memberTable.js";

async function getMemberData() {
  const res = await fetch("/api/memberData");
  return res.json();
}

function main() {
  const carTableNode = document.getElementById("memberTable");
  const response = document.getElementById("response");
  const navigation = document.getElementById("navigation");
  getMemberData().then((res) => {
    if (res.isAuthenticated === false) {
      response.innerHTML =
        "Please <a href='/login.html'>login</a> before continue...";
      return;
    }
    if (res.isAuthorized === false) {
      response.innerHTML =
        "You have no permission to see this page. <a href='/'>Go back</a>";
    }
    memberTable(carTableNode, res, main);
    navigation.innerHTML =
      "<a href='/logout'>Log out</a><a href='/'>Car Table</a>";
  });
}

main();
