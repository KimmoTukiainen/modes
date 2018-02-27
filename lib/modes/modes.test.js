import { getNextNote, modulus, getScale, getStringOctave, getStrings } from "./modes.functions";
import { getScalePattern } from "../data";

describe("modes.functions", () => {
  it("Resolves index within range", () => {
    const nextIndex = modulus(3, 11);
    expect(nextIndex).to.equal(3);
  });

  it("Resolves index outside range", () => {
    const nextIndex = modulus(13, 11);
    expect(nextIndex).to.equal(2);
  });

  it("Resolves the next note", () => {
    const note = "F#";
    const next = getNextNote(note, 2);
    expect(next).to.equal("G#");
  });

  it("Resolves the next note", () => {
    const note = "F#";
    const next = getNextNote(note, 19);
    expect(next).to.equal("C#");
  });

  it("Resolves a minor scale", () => {
    const scale = getScale("E", getScalePattern("aeolian"));
    expect(scale).to.deep.equal([
      "E", "F#", "G", "A", "H", "C", "D"
    ]);
  });

  it("Resolves a major scale", () => {
    const scale = getScale("C", getScalePattern("ionian"));
    expect(scale).to.deep.equal([
      "C", "D", "E", "F", "G", "A", "H"
    ]);
  });

  it("Resolves notes on a string.", () => {
    const notes = getStringOctave("G");
    expect(notes).to.deep.equal([
      "G",
      "G#",
      "A",
      "B",
      "H",
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#"
    ]);
  });

  it("Gets strings", () => {
    const strings = getStrings();
    expect(strings).to.deep.equal(["E", "A", "D", "G", "H", "E"]);
  });
});
