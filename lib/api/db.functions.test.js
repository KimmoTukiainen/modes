import { connect } from "./db.functions";

describe("db.functions", () => {
  describe("env", () => {
    it("finds environment variables", () => {
      expect(
        typeof process.env.MONGODB_URI === "string" &&
          process.env.MONGODB_URI.length > 0
      ).to.equal(true);
    });
  });
});
