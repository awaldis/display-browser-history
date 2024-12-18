// Contains the code for the "getMockHistoryItems" function and nothing else.

/**
 * Returns an array of mock history items for testing/demonstration purposes.
 * @returns {Array} An array of mock history items.
 */
export function getMockHistoryItems() {
    const baselineDate = new Date("2024-12-14T15:00:00Z");
    const baselineTime = baselineDate.getTime();    
    return [
      { url: "https://example.com",    title: "Example Domain",  lastVisitTime: baselineTime - 60 * 1000 },
      { url: "https://mozilla.org",    title: "Mozilla",         lastVisitTime: baselineTime - 120 * 1000 },
      { url: "https://en.wikipedia.org/wiki/Kolmogorov_complexity",  title: "Kolmogorov complexity - Wikipedia", lastVisitTime: baselineTime - 180 * 1000 },
      { url: "https://github.com/awaldis",     title: "GitHub",          lastVisitTime: baselineTime - 238 * 1000 },
      { url: "https://developer.mozilla.org/en-US/",     title: "MDN Web Docs",          lastVisitTime: baselineTime - 342 * 1000 },
      { url: "https://dev.to/tentanganak/7-habits-that-programmers-must-have-1dfj", title: "7 Habits that Programmers Must Have! - DEV Community",          lastVisitTime: baselineTime - 403 * 1000 },
      { url: "https://news.ycombinator.com/news",     title: "Hacker News",          lastVisitTime: baselineTime - 478 * 1000 },
      { url: "https://platform.openai.com/docs/api-reference/embeddings",     title: "API Reference - OpenAI API",          lastVisitTime: baselineTime - 578 * 1000 }
    ];
  }
  