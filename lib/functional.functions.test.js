import { removeFromList } from "./functional.functions";

describe("functional.functions", () => {
  describe("removeFromList", () => {
    it("Removes an item from a list", () => {
      const items = ["a", "b", "c"];
      const result = removeFromList(items, "b");
      expect(result).to.deep.equal(["a", "c"]);
    });
  });
});
