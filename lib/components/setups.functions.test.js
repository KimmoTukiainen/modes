import sinon from "sinon";
import axios from "axios";
import Setup from "../api/Setup";
import {
  clearSetups,
  getSetups,
  deleteSetup,
  createSetup
} from "./setups.functions";

describe("SetupsApi", () => {
  beforeEach(() => {
    axios.get = sinon.stub().resolves({
      data: [
        {
          _id: "123",
          mode: "ionian",
          key: "G",
          amount: 8
        },
        {
          _id: "456",
          mode: "ionian",
          key: "F",
          amount: 7,
          stuff: "astast"
        }
      ]
    });

    axios.delete = sinon.stub().resolves({});

    axios.post = sinon.stub().resolves({
      data: {
        _id: "qwerty123",
        mode: "ionian",
        key: "G",
        amount: 8
      }
    });
  });

  afterEach(() => {
    // axios.get.restore();
  });

  describe("getSetups", () => {
    it("fetches setups and returns them as parsed", async () => {
      const expected = [
        new Setup("123", "ionian", "G", 8),
        new Setup("456", "ionian", "F", 7)
      ];
      const setups = await getSetups();
      expect(setups).to.deep.equal(expected);
    });
  });
  describe("deleteSetup", () => {
    it("Reports invalid properties", () => {
      const bad = () => deleteSetup("faketoken");
      expect(bad).to.throw();
    });
    it("Deletes a setup", async () => {
      const setup = new Setup("ast", "dorian", "F", 7);
      const result = await deleteSetup(setup, "faketoken");
      expect(result).to.equal(true);
    });
  });
  describe("clearSetups", () => {
    it("Clears all setups", async () => {
      const result = await clearSetups("faketoken");
      expect(result).to.equal(true);
    });
  });

  describe("createSetup", () => {
    it("Fails without a proper setup", async () => {
      const setup = await createSetup();
      expect(setup).to.equal(null);
    });
    it("Returns the created setup on success", async () => {
      const setup = new Setup(null, "dorian", "F", 7);
      const expected = new Setup("qwerty123", "ionian", "G", 8); // From sinon.stub
      const created = await createSetup(setup, "faketoken");
      expect(created).to.deep.equal(expected);
    });
  });
});
