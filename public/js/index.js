import initializeForm from "./Form.js";
import carTable from "./Table.js";

async function getCarData() {
  const res = await fetch("/api/carData");
  return res.json();
}

function main() {
  const carTableNode = document.getElementById("carTable");
  getCarData().then((res) => {
    carTable(carTableNode, res, main);
  });
  initializeForm(main);
}

main();
