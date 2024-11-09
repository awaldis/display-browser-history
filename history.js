document.addEventListener("DOMContentLoaded", function () {
  const historyList = document.getElementById("historyList");

  console.log("Fetching history data...");
  
  // Fetch recent history items
  browser.history.search({ text: "", maxResults: 10 }).then((historyItems) => {
    console.log("History items fetched:", historyItems);
    historyItems.forEach((item) => {
      const row = document.createElement("tr");

      // Convert lastVisitTime to a readable date if it exists
      let visitTime = "No visit time available";
      if (item.lastVisitTime) {
        const visitDate = new Date(item.lastVisitTime);
        visitTime = visitDate.toLocaleString();
      }

      // Create table cells
      const timeCell = document.createElement("td");
      timeCell.textContent = visitTime;

      const titleCell = document.createElement("td");
      titleCell.textContent = item.title || 'No Title';

      const urlCell = document.createElement("td");
      urlCell.textContent = item.url;

      // Append cells to the row
      row.appendChild(timeCell);
      row.appendChild(titleCell);
      row.appendChild(urlCell);

      // Append row to the table body
      historyList.appendChild(row);
    });
  }).catch((error) => {
    console.error("Error fetching history data:", error);
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.textContent = "Error fetching history data.";
    cell.colSpan = 3; // Span all columns
    row.appendChild(cell);
    historyList.appendChild(row);
  });
});
