import { notes, strings, getScalePattern } from "../data";
import { compose } from "../functional.functions";
const add = (val1, val2) => val1 + val2;

const modulus = (index, length) => index % length;

const indexOf = list => item => {
  const index = list.indexOf(item);
  if (index === -1) {
    throw new Error("Incorrect index.");
  }
  return index;
};

const getNote = index => notes[index];

const addSteps = steps => index => add(steps, index);

const getModulus = length => totalSteps => modulus(totalSteps, length);

const getNextNote = (note, steps) => {
  const process = compose([
    indexOf(notes),
    addSteps(steps),
    getModulus(notes.length),
    getNote
  ]);
  return process(note);
};

function getScale(note, steps) {
  if (!Array.isArray(steps)) {
    throw new Error("Array expected." + typeof steps);
  }
  return steps.reduce(
    (list, step) => [...list, getNextNote(list[list.length - 1], step)],
    [note]
  );
}

function getStringOctave(openNote) {
  const steps = new Array(11).fill(1);
  return getScale(openNote, steps);
}

function getStrings(amount = 6) {
  return strings.slice(0, amount).reverse();
}

export { getNextNote, modulus, add, getScale, getStringOctave, getStrings };
