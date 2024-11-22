// This script handles background tasks for the browser history extension.

// Event listener for when the extension's icon is clicked
browser.browserAction.onClicked.addListener(() => {
  // Open the history HTML page from the extension in a new browser tab
  browser.tabs.create({
    url: browser.runtime.getURL("history.html")
  });
});

// Event listener for when a new page is visited
// (added to the browsing history)
browser.history.onVisited.addListener((historyItem) => {
  // Send a message to the history page to refresh
  browser.runtime.sendMessage({ command: "refreshHistory" });
});

