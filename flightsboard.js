const tableBody = document.getElementById("table-body");

const destinations = [
  "TOKYO",
  "FRANKFURT",
  "DUBAI",
  "LONDON",
  "OMAN",
  "BEIRUT",
];

const remarks = ["ON TIME", "DELAYED", "CANCELLED"];

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

// returns random value from given array
const getRandomArrayValue = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// returns random letter
const generateRandomLetter = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
};

// returns random number [minRange, maxRange]
const generateRandomNumber = (minRange = 0, maxRange = 9) => {
  return Math.floor(Math.random() * (maxRange - minRange) + minRange);
};

// returns hours and minutes based on previous hour value
function generateTime(prevHour) {
  const time = {};
  time.hour = String(prevHour < 24 ? prevHour + 1 : 1);
  time.display = `${time.hour.padStart(2, "0")}:${generateRandomNumber(
    0,
    6
  )}${generateRandomNumber()}`;

  return time;
}

// generate random flights
document.getElementById("gen-random-flights").addEventListener("click", () => {
  const flights = [];

  let hour = generateRandomNumber(0, 24);

  for (let i = 0; i < 5; i++) {
    const time = generateTime(hour);

    const details = {};
    details.time = time.display;
    details.destination = getRandomArrayValue(destinations);
    details.flight = `${generateRandomLetter()}${generateRandomLetter()} `;
    details.flight += `${generateRandomNumber()}${generateRandomNumber()}${generateRandomNumber()}`;
    details.gate = `${generateRandomLetter()} ${generateRandomNumber()}${generateRandomNumber()}`;
    details.remarks = getRandomArrayValue(remarks);

    flights.push(details);
  }

  tableBody.innerHTML = "";
  populateTable(flights);
});
