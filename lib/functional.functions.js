const apply = (value, fn) => {
  if (typeof fn !== "function") {
    throw new Error("Function expected");
  }
  if (typeof value === "function") {
    throw new Error("Value cannot be a function");
  }
  return fn(value);
};

const compose = functions => value => functions.reduce(apply, value);

const map = (list, fn) => {
  if (!Array.isArray(list)) {
    throw new Error("Array expected.");
  }
  return list.map(item => fn(item));
};

const pluck = (obj, prop) => obj[prop];

export { apply, compose, map, pluck };
