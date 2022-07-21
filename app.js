loadFlightsData()
  .then((data) => populateTable(data))
  .catch((err) => console.log(err.message));
