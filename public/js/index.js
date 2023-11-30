import initializeForm from "./carForm.js";
import carTable from "./carTable.js";

async function getCarData() {
  const res = await fetch("/api/carData");
  return res.json();
}

function main() {
  const carTableNode = document.getElementById("carTable");
  const response = document.getElementById("response");
  const navigation = document.getElementById("navigation");
  const loginUser = document.getElementById("loginUser");
  getCarData().then((res) => {
    if (res.permission === false) {
      response.innerHTML =
        "Please <a href='/login.html'>login</a> before continue...";
      return;
    }
    loginUser.innerHTML = `logged in as ${res.username}`;
    carTable(carTableNode, res.data, main);
    navigation.innerHTML =
      "<a href='/logout'>Log out</a><a href='/admin.html'>Admin panel</a>";
  });
  initializeForm(main);
}

main();
