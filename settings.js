document.addEventListener("DOMContentLoaded", function () {
  const sessionIntervalInput = document.getElementById("sessionInterval");
  const lookbackDurationInput      = document.getElementById("lookbackDuration");
  const fetchFaviconsInput   = document.getElementById("fetchFavicons");
  const saveButton           = document.getElementById("saveButton");

  // Load the saved session interval from browser storage and
    // populate the input field
  browser.storage.local.get("sessionInterval").then((result) => {
    if (result.sessionInterval) {
      sessionIntervalInput.value = result.sessionInterval;
    }
  });

  // Load the saved lookbackDuration from browser storage and populate the input field
  browser.storage.local.get("lookbackDuration").then((result) => {
    if (result.lookbackDuration) {
      lookbackDurationInput.value = result.lookbackDuration;
    }
  });

  // Load the saved fetchFavicons setting (default true)
  browser.storage.local.get("fetchFavicons").then((result) => {
    if (typeof result.fetchFavicons === "boolean") {
      fetchFaviconsInput.checked = result.fetchFavicons;
    } else {
      fetchFaviconsInput.checked = false; // default
    }
  });

  // Save settings when "Save" is clicked
  saveButton.addEventListener("click", () => {
    const interval = parseInt(sessionIntervalInput.value, 10);
    if (isNaN(interval) || interval < 1) {
      alert("Please enter a valid number greater than 0 for the session interval.");
      return;
    }

    const lookbackDuration = parseInt(lookbackDurationInput.value, 10);
    if (isNaN(lookbackDuration) || lookbackDuration < 1) {
      alert("Please enter a valid number greater than 0 for the lookback duration.");
      return;
    }

    const fetchFavicons = fetchFaviconsInput.checked;

    // Store any new values in browser storage

    browser.storage.local.set({
      sessionInterval: interval,
      lookbackDuration: lookbackDuration,
      fetchFavicons: fetchFavicons
    }).then(() => {
      alert("Settings saved.");
    });
  });
});
