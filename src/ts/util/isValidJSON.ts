import { isString } from "@thednp/shorty";

/**
 * Check if a string is valid JSON string.
 *
 * @param str the string input
 * @returns the query result
 */
const isValidJSON = (str: unknown): str is string => {
  /* istanbul ignore next @preserve */
  if (!isString(str)) return false;
  try {
    JSON.parse(str);
  } catch (_) {
    return false;
  }
  return true;
};

export default isValidJSON;
