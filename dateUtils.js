// Helper functions for rounding Date objects up or down to the nearest minute.

/**
 * Rounds down a Date object to the nearest minute (seconds and milliseconds set to zero).
 * @param {Date} date - The date to round down.
 * @returns {Date} - The rounded Date object.
 */
export function roundDownToNearestMinute(date) {
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
  
/**
 * Rounds up a Date object to the nearest minute.
 * @param {Date} date - The date to round up.
 * @returns {Date} - The rounded Date object.
 */
export function roundUpToNearestMinute(date) {
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
  