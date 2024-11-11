document.addEventListener("DOMContentLoaded", function () {
  const historyList = document.getElementById("historyList");

  console.log("Fetching history data...");

  // Fetch recent history items
  browser.history.search({ text: "", maxResults: 1000 }).then((historyItems) => {
    console.log("History items fetched:", historyItems);

    // Filter out items without a lastVisitTime
    historyItems = historyItems.filter(item => item.lastVisitTime);

    // Sort history items by lastVisitTime in descending order
    historyItems.sort((a, b) => b.lastVisitTime - a.lastVisitTime);

    let previousVisitTime = null;

    historyItems.forEach((item) => {
      // Convert lastVisitTime to a readable date
      const visitDate = new Date(item.lastVisitTime);
      const visitTime = visitDate.toLocaleString();

      // Insert a blank row if more than 5 minutes between entries
      if (
        previousVisitTime &&
        (previousVisitTime - item.lastVisitTime > 5 * 60 * 1000)
      ) {
        const blankRow = document.createElement("tr");
        blankRow.classList.add("blank-row");
        const blankCell = document.createElement("td");
        blankCell.colSpan = 3; // Adjust based on the number of columns
        blankCell.innerHTML = "&nbsp;"; // Non-breaking space
        blankRow.appendChild(blankCell);
        historyList.appendChild(blankRow);
      }

      // Update previousVisitTime
      previousVisitTime = item.lastVisitTime;

      // Create a new table row
      const row = document.createElement("tr");

      // Create table cells
      const timeCell = document.createElement("td");
      timeCell.textContent = visitTime;

      const titleCell = document.createElement("td");
      titleCell.textContent = item.title || "No Title";

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
