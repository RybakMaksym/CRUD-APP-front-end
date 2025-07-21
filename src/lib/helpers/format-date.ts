/**
 * Formats a given date into a string with the format "DD.MM.YYYY".
 *
 * @param {Date | string} date - The date to format. Can be a Date object or a date string.
 * @returns {string} A formatted date string in "DD.MM.YYYY" format.
 *
 * @example
 * formatDate(new Date(2024, 0, 5)) // "05.01.2024"
 * formatDate("2025-07-17")         // "17.07.2025"
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);

  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();

  return `${day}.${month}.${year}`;
}
