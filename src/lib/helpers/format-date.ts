/**
 * Formats a given date into a string with the format "DD.MM.YYYY".
 *
 * @param {Date | string} date - The date to format. Can be a Date object or a date string.
 * @returns {string} A formatted date string in "DD.MM.YYYY" format.
 *
 * @example
 * formatDateToDots(new Date(2024, 0, 5)) // "05.01.2024"
 * formatDateToDots("2025-07-17")         // "17.07.2025"
 */
export function formatDateToDots(date: Date | string): string {
  const d = new Date(date);

  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();

  return `${day}.${month}.${year}`;
}

/**
 * Formats a given date into a string with the format "D Mon YYYY", e.g. "12 Jan 2024".
 *
 * @param {Date | string} date - The date to format. Can be a Date object or a date string.
 * @returns {string} A formatted date string in "D Mon YYYY" format.
 *
 * @example
 * formatDateToText(new Date(2024, 0, 12)) // "12 Jan 2024"
 * formatDateToText("2025-07-17")          // "17 Jul 2025"
 */
export function formatDateToText(date: Date | string): string {
  const d = new Date(date);

  const day = d.getDate();
  const month = d.toLocaleString('en-US', { month: 'short' });
  const year = d.getFullYear();

  return `${day} ${month} ${year}`;
}
