import initializeForm from "./Form.js";
import carTable from "./Table.js";

async function getCarData() {
  const res = await fetch("/api/carData");
  return res.json();
}

function main() {
  const carTableNode = document.getElementById("carTable");
  const response = document.getElementById("response");
  getCarData().then((res) => {
    if (res.isAuthenticated === false) {
      response.innerHTML =
        "Please <a href='/login.html'>login</a> before continue...";
      return;
    }
    carTable(carTableNode, res, main);
  });
  initializeForm(main);
}

main();
