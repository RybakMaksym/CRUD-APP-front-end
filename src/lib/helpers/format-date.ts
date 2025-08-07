type DateFormat = 'DD.MM.YYYY' | 'D Mon YYYY';

interface FormatDateOptions {
  format?: DateFormat;
}

/**
 * Formats a given date into a string based on the provided format.
 *
 * @param {Date | string} date - The date to format. Can be a Date object or a date string.
 * @param {FormatDateOptions} options - Optional formatting options.
 * @returns {string} A formatted date string.
 *
 * @example
 * formatDate("2025-07-17")                            // "17.07.2025"
 * formatDate("2025-07-17", { format: 'DD.MM.YYYY' })  // "17.07.2025"
 * formatDate("2025-07-17", { format: 'D Mon YYYY' })  // "17 Jul 2025"
 */
export function formatDate(
  date: Date | string,
  options?: FormatDateOptions,
): string {
  const d = new Date(date);
  const format = options?.format ?? 'DD.MM.YYYY';

  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  if (format === 'D Mon YYYY') {
    const shortMonth = d.toLocaleString('en-US', { month: 'short' });

    return `${day} ${shortMonth} ${year}`;
  }

  const paddedDay = day.toString().padStart(2, '0');
  const paddedMonth = month.toString().padStart(2, '0');

  return `${paddedDay}.${paddedMonth}.${year}`;
}
