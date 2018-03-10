import sinon from "sinon";
import axios from "axios";
import SetupsApi from "./SetupsApi";
import Setup from "../api/Setup";

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
      const api = new SetupsApi();
      const setups = await api.getSetups();
      expect(setups).to.deep.equal(expected);
    });
  });
  describe("deleteSetup", () => {
    it("Reports invalid properties", () => {
      const api = new SetupsApi();
      const bad = () => api.deleteSetup();
      expect(bad).to.throw();
    });
    it("Deletes a setup", async () => {
      const api = new SetupsApi();
      const setup = new Setup("ast", "dorian", "F", 7);
      const result = await api.deleteSetup(setup);
      expect(result).to.equal(true);
    });
  });
  describe("clearSetups", () => {
    it("Clears all setups", async () => {
      const api = new SetupsApi();
      const result = await api.clearSetups();
      expect(result).to.equal(true);
    });
  });

  describe("createSetup", () => {
    it("Fails without a proper setup", async () => {
      const api = new SetupsApi();
      const setup = await api.createSetup();
      expect(setup).to.equal(undefined);
    });
    it("Returns the created setup on success", async () => {
      const api = new SetupsApi();
      const setup = new Setup(null, "dorian", "F", 7);
      const expected = new Setup("qwerty123", "ionian", "G", 8); // From sinon.stub
      const created = await api.createSetup(setup);
      expect(created).to.deep.equal(expected);
    });
  });
});
