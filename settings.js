// This script implements the storage and retrieval of settings
// for the browser history extension.  It is intended to interact
// with a settings HTML page.

document.addEventListener("DOMContentLoaded", function () {
    const sessionIntervalInput = document.getElementById("sessionInterval");
    const saveButton           = document.getElementById("saveButton");
    const maxResultsInput      = document.getElementById("maxResults");
  
    // Load the saved session interval from browser storage and
    // populate the input field    
    browser.storage.local.get("sessionInterval").then((result) => {
      if (result.sessionInterval) {
        sessionIntervalInput.value = result.sessionInterval;
      }
    });

    // Load the saved maxResults from browser storage and populate the input field
    browser.storage.local.get("maxResults").then((result) => {
      if (result.maxResults) {
        maxResultsInput.value = result.maxResults;
      }
    });

    // Save the session interval when the "Save" button is clicked
    saveButton.addEventListener("click", () => {
      const interval = parseInt(sessionIntervalInput.value, 10);

      // Validate the input to ensure it's a positive integer
      if (isNaN(interval) || interval < 1) {
        alert("Please enter a valid number greater than 0.");
        return;
      }
      // Store the new session interval in browser storage
      browser.storage.local.set({ sessionInterval: interval }).then(() => {
        alert("Session interval saved.");
      });

      const maxResults = parseInt(maxResultsInput.value, 10);

      if (isNaN(maxResults) || maxResults < 1) {
        alert("Please enter a valid number greater than 0.");
        return;
      }
  
      // Store the new max results value in browser storage
      browser.storage.local.set({ maxResults: maxResults }).then(() => {
        alert("Settings saved.");
      });
    });
  });
  