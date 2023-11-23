import initializeForm from "./Form.js";
import carTable from "./carTable.js";

async function getCarData() {
  const res = await fetch("/api/carData");
  return res.json();
}

function main() {
  const carTableNode = document.getElementById("carTable");
  const response = document.getElementById("response");
  const navigation = document.getElementById("navigation");
  getCarData().then((res) => {
    if (res.isAuthenticated === false) {
      response.innerHTML =
        "Please <a href='/login.html'>login</a> before continue...";
      return;
    }
    carTable(carTableNode, res, main);
    navigation.innerHTML =
      "<a href='/logout'>Log out</a><a href='/admin.html'>Admin panel</a>";
  });
  initializeForm(main);
}

main();
