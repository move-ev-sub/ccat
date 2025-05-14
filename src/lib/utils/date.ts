/**
 * Takes in a date and returns a new date object with the time set to 00:00:00.
 *
 * @param input The date to convert to the start of the day. Either a Date object
 * or a string which can be parsed into a Date object.
 */
export function toStartOfDay(input: Date | string) {
  const date = typeof input === 'string' ? new Date(input) : input;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
}

/**
 * Takes in a date and returns a new date object with the time set to 23:59:59.
 *
 * @param input The date to convert to the end of the day. Either a Date object
 * or a string which can be parsed into a Date object.
 */
export function toEndOfDay(input: Date | string) {
  const date = typeof input === 'string' ? new Date(input) : input;

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59
  );
}
