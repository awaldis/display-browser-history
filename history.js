import { createSessions } from './historyProcessor.js';
import { displaySessions } from './sessionDisplay.js';
import { getMockHistoryItems } from './getMockHistoryItems.js';

// Toggle this to `true` when testing and `false` for normal operation
const useMockHistoryItems = false;

document.addEventListener("DOMContentLoaded", function () {
  const historyList = document.getElementById("historyList");

  // Function to load and display browsing sessions
  async function loadHistorySessions() {
    console.log("Browser Session History Extension: Loading history data...");

    // Clear existing content
    historyList.innerHTML = "";

    try {
      // Fetch the user-defined session interval (default to 5 minutes)
      let storageResult = await browser.storage.local.get("sessionInterval");
      const sessionInterval = storageResult.sessionInterval || 5;
    
      // Fetch the user-defined maxResults (default to 300)
      storageResult = await browser.storage.local.get("maxResults");
      const maxResults = storageResult.maxResults || 300;

      // Fetch fetchFavicons setting (default to true)
      storageResult = await browser.storage.local.get("fetchFavicons");
      const fetchFavicons = (typeof storageResult.fetchFavicons === "boolean") ? 
                              storageResult.fetchFavicons : true;

      console.log(`Using session interval: ${sessionInterval} minutes`);
      console.log(`Using maxResults: ${maxResults}`);
      console.log(`Fetch Favicons setting: ${fetchFavicons}`);

      let historyItems = [];

      if (useMockHistoryItems) {
        // For testing or demo
        historyItems = getMockHistoryItems();
      } else {
        // Use real history items
        const uniqueHistoryItems = await browser.history.search({ text: "", startTime: 0, maxResults: maxResults });
        console.log("History items fetched:", historyItems);

        // Calculate the timestamp for 24 hours ago
        const now = Date.now();
        const twentyFourHoursAgo = now - (24 * 60 * 60 * 1000);

        for (const item of uniqueHistoryItems) {
          const visits = await browser.history.getVisits({ url: item.url });
  
          // Filter the visits to include only those within the last 24 hours
          const recentVisits = visits.filter(visit => visit.visitTime >= twentyFourHoursAgo);
  
          for (const visit of recentVisits) {
            historyItems.push({
              url:           item.url,
              title:         item.title,
              lastVisitTime: visit.visitTime
            });
          }
        }
      }

      // Process history items into sessions
      const sessions = createSessions(historyItems, sessionInterval);

      // Display the sessions
      displaySessions(sessions, historyList, fetchFavicons);

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

  // Load history sessions when the page is loaded
  loadHistorySessions();

  // Listen for messages from the background script
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "refreshHistory") {
      console.log("Received refresh command");
      loadHistorySessions(); // Reload the history
    }
  });
});
