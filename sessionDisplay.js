// Contains the code for the "displaySessions" function and nothing else.

import { roundDownToNearestMinute, roundUpToNearestMinute } from './dateUtils.js';

/**
 * Displays browsing sessions in the provided DOM element.
 * @param {Array} sessions - The array of browsing session objects.
 * @param {HTMLElement} historyList - The DOM element where browsing sessions will be displayed.
 * @param {boolean} fetchFavicons
 */
export function displaySessions(sessions, historyList, fetchFavicons) {
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

    const timeOptions = { hour: 'numeric', minute: 'numeric' };
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };

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

      // Time cell
      const timeCell = document.createElement("td");
      const visitDate = new Date(item.lastVisitTime);
      timeCell.textContent = visitDate.toLocaleString();

      // Title cell
      const titleCell = document.createElement("td");
      titleCell.classList.add("title-cell");

      // Conditionally create favicon image element if fetchFavicons is true
      if (fetchFavicons) {
        const faviconImg = document.createElement("img");
        faviconImg.classList.add("favicon");

        // Construct the favicon URL using Google's service
        const faviconUrl = "https://www.google.com/s2/favicons?domain_url=" + encodeURIComponent(item.url);
        faviconImg.src = faviconUrl;
        faviconImg.alt = ""; // Decorative image
        titleCell.appendChild(faviconImg);
      }

      // Create the title text node
      const titleText = document.createTextNode(item.title || "No Title");
      titleCell.appendChild(titleText);

      // URL cell
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
}
