/**
 * Check if a string is valid JSON string.
 * @param {string} str the string input
 * @returns {boolean} the query result
 */
export default function isValidJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
