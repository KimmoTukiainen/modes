/**
 * apply will call the given function with the value
 * @param  {*} value - any value
 * @param  {function} fn - function
 */
export const apply = (value, fn) => {
  if (typeof fn !== "function") {
    throw new Error("Function expected");
  }
  if (typeof value === "function") {
    throw new Error("Value cannot be a function");
  }
  return fn(value);
};

/**
 * @param  {Function []} functions - A list of functions that are executed one after the other
 * @param  {*} value - Any input
 */
export const compose = functions => value => functions.reduce(apply, value);

export const map = (list, fn) => {
  if (!Array.isArray(list)) {
    throw new Error("Array expected.");
  }
  return list.map(item => fn(item));
};
/**
 * pluck will return an object property
 * @param  {object} obj
 * @param  {string} prop
 */
export const pluck = (obj, prop) => obj[prop];

/**
 * @param  {[]*} list - an array of anything that can be identified with ===
 * @param  {*} item - an item in the given array
 */
export const removeFromList = (list, item) => {
  const index = list.findIndex(i => i === item);
  if (index > -1) {
    return [...list.slice(0, index), ...list.slice(index + 1, list.length)];
  }
  return list;
};

export const joinItems = items => items.join(" ");
