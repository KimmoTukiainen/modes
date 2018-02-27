// How many half steps is needed to get the next note
import { pluck } from "./functional.functions";
const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "B", "H"];

const scalePatterns = [
  {
    name: "ionian",
    pattern: [2, 2, 1, 2, 2, 2]
  },
  {
    name: "dorian",
    pattern: [2, 1, 2, 2, 2, 1]
  },
  {
    name: "phrygian",
    pattern: [1, 2, 2, 2, 1, 2]
  },
  {
    name: "lydian",
    pattern: [2, 2, 2, 1, 2, 2]
  },
  {
    name: "mixolydian",
    pattern: [2, 2, 1, 2, 2, 1]
  },
  {
    name: "aeolian",
    pattern: [2, 1, 2, 2, 1, 2]
  },
  {
    name: "locrian",
    pattern: [1, 2, 2, 1, 2, 2]
  },
  {
    name: "doubleHarmonicMajor",
    pattern: [1, 2, 1, 2, 1, 2]
  }
];

const strings = ["E", "H", "G", "D", "A", "E", "H", "F#"];

const getScalePattern = name => {
  return pluck(scalePatterns.find(pattern => pattern.name === name), "pattern");
};

export { notes, scalePatterns, strings, getScalePattern };
