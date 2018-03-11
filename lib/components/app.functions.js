import { compose, map } from "../functional.functions";
import { getStringOctave } from "../modes/modes.functions";

const isInScale = scale => note => scale.find(n => note === n);
const inScaleToSymbol = note => (note || "-");
const notesToStrings = notes => map(notes, getStringOctave);

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
