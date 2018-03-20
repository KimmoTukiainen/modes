import { notes, strings } from "../data";
import { compose, add, modulus, indexOf } from "../functional.functions";

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

/**
 * getScale returns a list of based on a scale pattern 
 * @param  {string} note - a musical note like "E"
 * @param  {int[]} steps - the scale pattern showing how many half steps you have to move to get the next note
 */
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
