// history.js

document.addEventListener("DOMContentLoaded", function () {
  const historyList = document.getElementById("historyList");

  // Function to load and display history items
  async function loadHistory() {
    console.log("Loading history data...");

    // Clear existing history items
    historyList.innerHTML = "";

    try {
      // Fetch recent history items
      let historyItems = await browser.history.search({ text: "", maxResults: 1000 });
      console.log("History items fetched:", historyItems);

      // Filter and sort history items as before
      historyItems = historyItems.filter(item => item.lastVisitTime);
      historyItems.sort((a, b) => b.lastVisitTime - a.lastVisitTime);

      let previousVisitTime = null;

      historyItems.forEach((item) => {
        // Convert lastVisitTime to a readable date
        const visitDate = new Date(item.lastVisitTime);
        const visitTime = visitDate.toLocaleString();

        // Insert a blank row if more than 5 minutes between entries (if applicable)
        if (
          previousVisitTime &&
          (previousVisitTime - item.lastVisitTime > 5 * 60 * 1000)
        ) {
          const blankRow = document.createElement("tr");
          blankRow.classList.add("blank-row");
          const blankCell = document.createElement("td");
          blankCell.colSpan = 3;
          blankCell.innerHTML = "&nbsp;";
          blankRow.appendChild(blankCell);
          historyList.appendChild(blankRow);
        }

        // Update previousVisitTime
        previousVisitTime = item.lastVisitTime;

        // Create a new table row
        const row = document.createElement("tr");

        // 1. Last Visited cell
        const timeCell = document.createElement("td");
        timeCell.textContent = visitTime;

        // 2. Title cell
        const titleCell = document.createElement("td");
        titleCell.classList.add("title-cell");

        // Create the favicon image element
        const faviconImg = document.createElement("img");
        faviconImg.classList.add("favicon");

        // Construct the favicon URL using Google's favicon service
        const faviconUrl = "https://www.google.com/s2/favicons?domain_url=" + encodeURIComponent(item.url);
        faviconImg.src = faviconUrl;
        faviconImg.alt = ""; // Decorative image

        // Create the title text node
        const titleText = document.createTextNode(item.title || "No Title");

        // Append the favicon and title text to the title cell
        titleCell.appendChild(faviconImg);
        titleCell.appendChild(titleText);

        // 3. URL cell
        const urlCell = document.createElement("td");
        urlCell.textContent = item.url;

        // Append cells to the row
        row.appendChild(timeCell);
        row.appendChild(titleCell);
        row.appendChild(urlCell);

        // Append row to the table body
        historyList.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching history data:", error);
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.textContent = "Error fetching history data.";
      cell.colSpan = 3; // Adjust based on the number of columns
      row.appendChild(cell);
      historyList.appendChild(row);
    }
  }

  // Load history when the page is loaded
  loadHistory();

  // Listen for messages from the background script
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "refreshHistory") {
      console.log("Received refresh command");
      loadHistory(); // Reload the history
    }
  });
});
