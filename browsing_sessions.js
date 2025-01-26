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
    
      // Fetch the user-defined lookbackDuration (default to 24)
      storageResult = await browser.storage.local.get("lookbackDuration");
      const lookbackDuration = storageResult.lookbackDuration || 24;

      // Fetch fetchFavicons setting (default to true)
      storageResult = await browser.storage.local.get("fetchFavicons");
      const fetchFavicons = (typeof storageResult.fetchFavicons === "boolean") ? 
                              storageResult.fetchFavicons : true;

      console.log(`Using session interval: ${sessionInterval} minutes`);
      console.log(`Using lookbackDuration: ${lookbackDuration}`);
      console.log(`Fetch Favicons setting: ${fetchFavicons}`);

      // Calculate the timestamp for the oldest history item we want to display
      const now = Date.now();
      const oldestHistoryItemTime = now - (lookbackDuration * 60 * 60 * 1000);

      let historyItems = [];

      if (useMockHistoryItems) {
        // For testing or demo
        historyItems = getMockHistoryItems();
      } else {
        // Use real history items
        // "maxResults" defaults to 100 if not specified.  This is too low
        // for this application.  Therefore, a high value needs to be
        // explicitly specified to allow all the items allowed by
        // "oldestHistoryItemTime" to be returned.
        const uniqueHistoryItems = await browser.history.search({
          text: "",
          startTime: oldestHistoryItemTime,
          maxResults: 2000 });

        console.log("History items fetched:", historyItems);

        for (const item of uniqueHistoryItems) {
          const visits = await browser.history.getVisits({ url: item.url });
  
          // Filter the visits to include only those more recent than the oldest time allowed
          const recentVisits = visits.filter(visit => visit.visitTime >= oldestHistoryItemTime);
  
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

  // Listen for clicks on the "Settings" button
  const openSettingsButton = document.getElementById("openSettingsButton");
  openSettingsButton.addEventListener("click", async () => {
    // Build the extension URL for settings.html
    const settingsUrl = browser.runtime.getURL("settings.html");

    // Query all tabs to find one that matches our settings URL
    const tabs = await browser.tabs.query({ url: settingsUrl });

    if (tabs.length > 0) {
      // If found, activate that tab and focus its window
      const existingTab = tabs[0];
      await browser.tabs.update(existingTab.id, { active: true });
      await browser.windows.update(existingTab.windowId, { focused: true });
    } else {
      // Otherwise, create a new tab for settings.html
      await browser.tabs.create({ url: settingsUrl });
    }
  });
});
