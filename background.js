// This script handles background tasks for the browser history extension.

// Event listener for when the extension's icon is clicked
browser.browserAction.onClicked.addListener(async () => {
  // URL to the extension's display page
  const extensionUrl = browser.runtime.getURL("browsing_sessions.html");

  // Query for any tabs currently open to the extension URL
  const tabs = await browser.tabs.query({ url: extensionUrl });

  if (tabs.length > 0) {
    // The tab is already open. Just switch to it and focus its window.
    const tab = tabs[0];
    await browser.tabs.update(tab.id, { active: true });
    await browser.windows.update(tab.windowId, { focused: true });
  } else {
    // No open tab for the extension page, so create a new one.
    await browser.tabs.create({ url: extensionUrl });
  }
});

// Event listener for when a new page is visited
// (added to the browsing history)
browser.history.onVisited.addListener(() => {
  // Send a message to the history page to refresh
  browser.runtime.sendMessage({ command: "refreshHistory" });
});

