const tableBody = document.getElementById("table-body");

// builds table with flights data
const populateTable = (flights) => {
  for (const flight of flights) {
    const tableRow = document.createElement("tr");

    for (const flightDetail in flight) {
      const tableCell = document.createElement("td");
      const word = Array.from(flight[flightDetail]);

      for (const [index, letter] of word.entries()) {
        const letterElement = document.createElement("div");

        // delay each letter's animation
        setTimeout(() => {
          letterElement.classList.add("flip");
          letterElement.textContent = letter;
          tableCell.append(letterElement);
        }, 100 * index);
      }

      tableRow.append(tableCell);
    }

    tableBody.append(tableRow);
  }
};

// loads flights data from json file
const loadFlightsData = async () => {
  const result = await fetch("flights.json");
  if (result.status !== 200) {
    throw new Error("Could not load flights data!");
  }

  return await result.json();
};

loadFlightsData()
  .then((data) => populateTable(data))
  .catch((err) => console.log(err.message));
