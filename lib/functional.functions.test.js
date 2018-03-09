import { removeFromList, compose } from "./functional.functions";

describe("functional.functions", () => {
  describe("removeFromList", () => {
    it("Removes an item from a list", () => {
      const items = ["a", "b", "c"];
      const result = removeFromList(items, "b");
      expect(result).to.deep.equal(["a", "c"]);
    });
  });

  describe("compose", () => {
    it("validates input", () => {
      const bad = compose("a", "b");
      expect(bad).to.throw();
    });
  });
});
