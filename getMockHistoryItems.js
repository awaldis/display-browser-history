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
      { url: "https://www.geeksforgeeks.org/what-is-perceptron-the-simplest-artificial-neural-network/",     title: "What is Perceptron | The Simplest Artificial neural network - GeeksforGeeks", lastVisitTime: baselineTime - 1578 * 1000 },
      { url: "https://dzone.com/languages",     title: "Language Resources",          lastVisitTime: baselineTime - 1678 * 1000 },
      { url: "https://en.wikipedia.org/wiki/Big_O_notation",     title: "Big O notation - Wikipedia", lastVisitTime: baselineTime - 2678 * 1000 },
      { url: "https://rosettacode.org/wiki/Ackermann_function#8086_Assembly",     title: "Ackermann function - Rosetta Code", lastVisitTime: baselineTime - 2778 * 1000 },
      { url: "https://en.wikipedia.org/wiki/Double_exponential_function",     title: "Double exponential function - Wikipedia", lastVisitTime: baselineTime - 2878 * 1000 },
      { url: "https://en.wikipedia.org/wiki/Truth_table",     title: "Truth table - Wikipedia", lastVisitTime: baselineTime - 2978 * 1000 },
      { url: "https://en.wikipedia.org/wiki/Functional_completeness",     title: "Functional completeness - Wikipedia", lastVisitTime: baselineTime - 3078 * 1000 },
      { url: "https://oeis.org/",     title: "The On-Line Encyclopedia of Integer Sequences (OEIS)", lastVisitTime: baselineTime - 3178 * 1000 },
      { url: "https://amturing.acm.org/",     title: "A.M. Turing Award", lastVisitTime: baselineTime - 3278 * 1000 },
      { url: "https://stackoverflow.com/questions/927358/how-do-i-undo-the-most-recent-local-commits-in-git",     title: "version control - How do I undo the most recent local commits in Git? - Stack Overflow", lastVisitTime: baselineTime - 3478 * 1000 },
      { url: "https://extensionworkshop.com/documentation/publish/signing-and-distribution-overview/",     title: "Signing and distribution overview | Firefox Extension Workshop",          lastVisitTime: baselineTime - 3678 * 1000 },
      { url: "https://platform.openai.com/docs/api-reference/embeddings",     title: "API Reference - OpenAI API",          lastVisitTime: baselineTime - 3778 * 1000 }
    ];
  }
  