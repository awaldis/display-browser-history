// This script implements the storage and retrieval of settings
// for the browser history extension.  It is intended to interact
// with a settings HTML page.

document.addEventListener("DOMContentLoaded", function () {
    const sessionIntervalInput = document.getElementById("sessionInterval");
    const saveButton = document.getElementById("saveButton");
  
    // Load the saved session interval from browser storage and
    // populate the input field    
    browser.storage.local.get("sessionInterval").then((result) => {
      if (result.sessionInterval) {
        sessionIntervalInput.value = result.sessionInterval;
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
    });
  });
  