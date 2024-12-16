// Contains the code for the "getMockHistoryItems" function and nothing else.

/**
 * Returns an array of mock history items for testing/demonstration purposes.
 * @returns {Array} An array of mock history items.
 */
export function getMockHistoryItems() {
    const baselineDate = new Date("2024-12-14T12:00:00Z");
    const baselineTime = baselineDate.getTime();    
    return [
      { url: "https://example.com",    title: "Example Domain",  lastVisitTime: baselineTime - 60 * 1000 },
      { url: "https://mozilla.org",    title: "Mozilla",         lastVisitTime: baselineTime - 120 * 1000 },
      { url: "https://wikipedia.org",  title: "Wikipedia",       lastVisitTime: baselineTime - 180 * 1000 },
      { url: "https://github.com",     title: "GitHub",          lastVisitTime: baselineTime - 240 * 1000 }
    ];
  }
  