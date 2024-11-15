// background.js

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({
    url: browser.runtime.getURL("history.html")
  });
});

// Listen for new history entries
browser.history.onVisited.addListener((historyItem) => {
  console.log("New history item visited:", historyItem);

  // Send a message to the history page to refresh
  browser.runtime.sendMessage({ command: "refreshHistory" });
});

