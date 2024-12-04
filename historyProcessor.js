// Contains the code for the "createSessions" function and nothing else.

/**
 * Processes browser history items and groups them into sessions.
 * @param {Array} historyItems - The array of browser history items.
 * @param {number} newSessionTimeGap - The minimum time gap that triggers a new session (in minutes).
 * @returns {Array} - An array of browser session objects.
 */
export function createSessions(historyItems, newSessionTimeGap) {
    // Filter out items without a lastVisitTime
    historyItems = historyItems.filter(item => item.lastVisitTime);
  
    // Sort history items by lastVisitTime in descending order (most recent first)
    historyItems.sort((a, b) => b.lastVisitTime - a.lastVisitTime);
  
    let sessions = [];
    let currentSession = null;
    let previousItemTime = null;
  
    // Group each individual history item into a "session"
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

        // If time gap is more than the new session trigger...  
        if (timeGap > newSessionTimeGap * 60 * 1000) {
          // End the current session
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
      // The current "last visit time" becomes the previous time for
      // the next iteration through the loop.
      previousItemTime = item.lastVisitTime;
    } // End of loop - Group each individual history item into a "session"
  
    // Add the last session if it exists
    if (currentSession) {
      sessions.push(currentSession);
    }
  
    return sessions;
  }
  