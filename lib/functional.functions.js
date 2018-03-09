export const apply = (value, fn) => {
  if (typeof fn !== "function") {
    throw new Error("Function expected");
  }
  if (typeof value === "function") {
    throw new Error("Value cannot be a function");
  }
  return fn(value);
};

export const compose = functions => value => functions.reduce(apply, value);

export const map = (list, fn) => {
  if (!Array.isArray(list)) {
    throw new Error("Array expected.");
  }
  return list.map(item => fn(item));
};

export const pluck = (obj, prop) => obj[prop];

export const removeFromList = (list, item) => {
  const index = list.findIndex(i => i === item);
  if (index > -1) {
    return [...list.slice(0, index), ...list.slice(index + 1, list.length)];
  }
  return list;
};
