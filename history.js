document.addEventListener("DOMContentLoaded", function () {
  const historyList = document.getElementById("historyList");

  // Function to round down to the nearest minute
  function roundDownToNearestMinute(date) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      0,
      0
    );
  }

  // Function to round up to the nearest minute
  function roundUpToNearestMinute(date) {
    if (date.getSeconds() === 0 && date.getMilliseconds() === 0) {
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        0,
        0
      );
    } else {
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes() + 1,
        0,
        0
      );
    }
  }

  // Function to load and display browsing sessions
  async function loadHistorySessions() {
    console.log("Loading history data...");

    // Clear existing content
    historyList.innerHTML = "";

    try {
      // Fetch recent history items
      let historyItems = await browser.history.search({ text: "", startTime: 0, maxResults: 300 });
      console.log("History items fetched:", historyItems);

      // Filter out items without a lastVisitTime
      historyItems = historyItems.filter(item => item.lastVisitTime);

      // Sort history items by lastVisitTime in descending order (most recent first)
      historyItems.sort((a, b) => b.lastVisitTime - a.lastVisitTime);

      let sessions = [];
      let currentSession = null;

      for (let i = 0; i < historyItems.length; i++) {
        const item = historyItems[i];

        if (!currentSession) {
          // Start a new session
          currentSession = {
            startTime: item.lastVisitTime,
            endTime: item.lastVisitTime,
            items: [item]
          };
        } else {
          // Calculate the time gap between the current item and the previous one
          const timeGap = previousItemTime - item.lastVisitTime;

          if (timeGap > 5 * 60 * 1000) {
            // Gap is more than 5 minutes, end the current session
            sessions.push(currentSession);

            // Start a new session
            currentSession = {
              startTime: item.lastVisitTime,
              endTime: item.lastVisitTime,
              items: [item]
            };
          } else {
            // Continue the current session
            currentSession.startTime = item.lastVisitTime;
            currentSession.items.push(item);
          }
        }
        previousItemTime = item.lastVisitTime;
      }

      // Add the last session if it exists
      if (currentSession) {
        sessions.push(currentSession);
      }

      // Display the sessions
      sessions.forEach((session) => {
        // Convert startTime and endTime to Date objects
        const startDate = new Date(session.startTime);
        const endDate = new Date(session.endTime);

        // Round times
        const roundedStartDate = roundDownToNearestMinute(startDate);
        const roundedEndDate = roundUpToNearestMinute(endDate);

        // Calculate session duration in minutes
        const durationMs = roundedEndDate - roundedStartDate;
        const durationMinutes = Math.round(durationMs / (60 * 1000));
        const durationText = durationMinutes === 1 ? 'minute' : 'minutes';

        // Formatting options
        const timeOptions = {
          hour: 'numeric',
          minute: 'numeric'
        };

        const dateOptions = {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        };

        const startTimeStr = roundedStartDate.toLocaleTimeString(undefined, timeOptions);
        const endTimeStr = roundedEndDate.toLocaleTimeString(undefined, timeOptions);

        const startDateStr = roundedStartDate.toLocaleDateString(undefined, dateOptions);
        const endDateStr = roundedEndDate.toLocaleDateString(undefined, dateOptions);

        // Build session header text
        let sessionHeaderText = '';
        if (startDateStr === endDateStr) {
          // Dates are the same, omit date
          sessionHeaderText = `${startTimeStr} - ${endTimeStr} (${durationMinutes} ${durationText})`;
        } else {
          // Dates are different, include dates
          sessionHeaderText = `${startDateStr} ${startTimeStr} - ${endDateStr} ${endTimeStr} (${durationMinutes} ${durationText})`;
        }

        // Create a session header row
        const sessionHeaderRow = document.createElement("tr");
        sessionHeaderRow.classList.add("session-header");

        const sessionHeaderCell = document.createElement("td");
        sessionHeaderCell.colSpan = 3; // Adjust based on the number of columns
        sessionHeaderCell.textContent = sessionHeaderText;

        sessionHeaderRow.appendChild(sessionHeaderCell);
        historyList.appendChild(sessionHeaderRow);

        // For each item in the session, display the history entry
        session.items.forEach((item) => {
          // Create a new table row
          const row = document.createElement("tr");

          // 1. Last Visited cell
          const timeCell = document.createElement("td");
          const visitDate = new Date(item.lastVisitTime);
          const visitTime = visitDate.toLocaleString();
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

        // Add a separator after each session (optional)
        const separatorRow = document.createElement("tr");
        const separatorCell = document.createElement("td");
        separatorCell.colSpan = 3;
        separatorCell.innerHTML = "&nbsp;";
        separatorRow.appendChild(separatorCell);
        historyList.appendChild(separatorRow);
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
