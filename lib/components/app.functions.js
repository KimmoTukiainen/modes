import { compose, map } from "../functional.functions";
import { getStringOctave } from "../modes/modes.functions";

/*
 * isInScale will check if the given note belongs to the musical scale
 */
const isInScale = scale => note => scale.find(n => note === n);

/*
 * inScaleToSymbol returns a visual representation of a note depending on if it is in the scale
 */
const inScaleToSymbol = note => (note || "-");

/*
 * notesToStrings will expand root notes into 12 frets
 */
const notesToStrings = notes => map(notes, getStringOctave);

/*
 * getFretSymbols returns all the frets with symbols for given roots and scale
 */
const getFretSymbols = (stringRoots, scale) => {
  const noteToSymbol = compose([isInScale(scale), inScaleToSymbol]);
  const stringToSymbol = str => map(str, noteToSymbol);
  const process = compose([
    notesToStrings,
    strings => map(strings, stringToSymbol)
  ]);
  return process(stringRoots);
};

export { getFretSymbols };
