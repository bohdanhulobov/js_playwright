/**
 * Checks if an array of text values representing numbers is sorted in ascending order.
 *
 * @param {string[]} textValues - An array of text values.
 * @return {boolean} Returns true if the array is sorted in ascending order, false otherwise.
 */
export function isNumbersArraySortedAscending(textValues: string[]): boolean {
  if (textValues.length === 0) {
    return false;
  }

  for (let i = 1; i < textValues.length; i++) {
    const prevValue = parseFloat(textValues[i - 1]);
    const currValue = parseFloat(textValues[i]);

    if (isNaN(prevValue) || isNaN(currValue) || currValue < prevValue) {
      return false;
    }
  }
  return true;
}

/**
 * Checks if the given array of numbers is sorted in descending order.
 *
 * @param {number[]} numbers - The array of numbers to be checked.
 * @return {boolean} Returns true if the array is sorted in descending order, otherwise returns false.
 */
export function isNumbersArraySortedDescending(numbers: string[]): boolean {
  if (numbers.length === 0) {
    return false;
  }

  let isSorted = true;
  for (let i = 1; i < numbers.length; i++) {
    const previousNumber = parseFloat(numbers[i - 1]);
    const currentNumber = parseFloat(numbers[i]);

    if (
      isNaN(previousNumber) ||
      isNaN(currentNumber) ||
      currentNumber > previousNumber
    ) {
      isSorted = false;
      break;
    }
  }
  return isSorted;
}

/**
 * Checks if an array of text values is sorted in ascending order.
 *
 * @param {string[]} textValues - The array of text values to be checked.
 * @return {boolean} Returns true if the array is sorted in ascending order, false otherwise.
 */
export function isTextArraySortedAscending(textValues: string[]): boolean {
  if (textValues.length === 0) return false;

  for (let i = 1; i < textValues.length; i++) {
    if (
      textValues[i].localeCompare(textValues[i - 1], undefined, {
        sensitivity: "base",
      }) < 0
    ) {
      return false;
    }
  }

  return true;
}

/**
 * Checks if the given array of text values is sorted in descending order.
 *
 * @param {string[]} textValues - The array of text values to be checked.
 * @return {boolean} Returns true if the array is sorted in descending order, otherwise returns false.
 */
export function isTextArraySortedDescending(textValues: string[]): boolean {
  if (textValues.length === 0) {
    return false;
  }

  for (let i = 1; i < textValues.length; i++) {
    const current = textValues[i];
    const previous = textValues[i - 1];
    const compareResult = current.localeCompare(previous, undefined, {
      sensitivity: "base",
    });

    if (compareResult > 0) {
      return false;
    }
  }

  return true;
}

/**
 * Checks if all values in the given array are equal to the specified sought value.
 *
 * @param {any[]} textValues - The array of values to be checked.
 * @param {any} soughtValue - The value to compare against.
 * @return {boolean} Returns true if all values are equal to the sought value, false otherwise.
 */
export function areAllValuesSoughtValues(
  textValues: any[],
  soughtValue: any
): boolean {
  return textValues.every((value) => value === soughtValue);
}
