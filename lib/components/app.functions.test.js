import { getStrings, getScale } from "../modes/modes.functions";
import { getScalePattern } from "../data";
import { getFretSymbols } from "./app.functions";

describe("app.functions", () => {
  it("Converts string roots to frets", () => {
    const strings = getStrings();
    const scale = getScale("A", getScalePattern("ionian"));
    const symbols = getFretSymbols(strings, scale);
    expect(symbols).to.be.an("array");
    expect(symbols[0]).to.be.an("array");
    expect(symbols[0][0]).to.equal("E");
    expect(false).to.equal(true)
  });
});
