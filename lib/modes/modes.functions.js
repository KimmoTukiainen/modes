import { notes, strings } from "../data";
import { compose } from "../functional.functions";

export const add = (val1, val2) => val1 + val2;

export const modulus = (index, length) => index % length;

export const indexOf = list => item => {
  const index = list.indexOf(item);
  if (index === -1) {
    throw new Error("Incorrect index.");
  }
  return index;
};

export const getNote = index => notes[index];

export const addSteps = steps => index => add(steps, index);

export const getModulus = length => totalSteps => modulus(totalSteps, length);

export const getNextNote = (note, steps) => {
  const process = compose([
    indexOf(notes),
    addSteps(steps),
    getModulus(notes.length),
    getNote
  ]);
  return process(note);
};

export function getScale(note, steps) {
  if (!note) {
    throw new Error("Note is not defined.");
  }
  if (!Array.isArray(steps)) {
    throw new Error("Array expected.");
  }
  return steps.reduce(
    (list, step) => [...list, getNextNote(list[list.length - 1], step)],
    [note]
  );
}

export function getStringOctave(openNote) {
  const steps = new Array(11).fill(1);
  return getScale(openNote, steps);
}

export function getStrings(amount = 6) {
  return strings.slice(0, amount).reverse();
}
