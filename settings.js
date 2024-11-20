// Handle storage of settings for browser history extension

document.addEventListener("DOMContentLoaded", function () {
    const sessionIntervalInput = document.getElementById("sessionInterval");
    const saveButton = document.getElementById("saveButton");
  
    // Load the saved session interval
    browser.storage.local.get("sessionInterval").then((result) => {
      if (result.sessionInterval) {
        sessionIntervalInput.value = result.sessionInterval;
      }
    });
  
    // Save the session interval when the button is clicked
    saveButton.addEventListener("click", () => {
      const interval = parseInt(sessionIntervalInput.value, 10);
      if (isNaN(interval) || interval < 1) {
        alert("Please enter a valid number greater than 0.");
        return;
      }
  
      browser.storage.local.set({ sessionInterval: interval }).then(() => {
        alert("Session interval saved.");
      });
    });
  });
  