// historyProcessor.js

/**
 * Processes history items and groups them into sessions.
 * @param {Array} historyItems - The array of history items.
 * @param {number} sessionInterval - The user-defined session interval in minutes.
 * @returns {Array} - An array of session objects.
 */
export function createSessions(historyItems, sessionInterval) {
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
  
        if (timeGap > sessionInterval * 60 * 1000) {
          // Gap is more than the user-defined interval, end the current session
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
  
    return sessions;
  }
  