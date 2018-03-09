import { shallow } from "enzyme";
import Setups from "./setups";
import Setup from "../api/Setup";
import Response from "mock-express-response";

describe("<Setups />", () => {
  describe("updateSetups", () => {
    it("Adds setups to the state", () => {
      const wrapper = shallow(<Setups />);
      const setups = [
        new Setup(1, "dorian", "F", 7),
        new Setup(2, "dorian", "G", 7)
      ];
      wrapper.instance().updateSetups(setups);
      expect(wrapper.state().setups).to.deep.equal(setups);
    });
    it("Adds removes setups from the state", () => {
      const wrapper = shallow(<Setups />);
      const setups = [
        new Setup(1, "dorian", "F", 7),
        new Setup(2, "dorian", "G", 7)
      ];
      wrapper.instance().updateSetups(setups);
      wrapper.instance().removeSetup(setups[0]);
      expect(wrapper.state().setups).to.deep.equal([setups[1]]);
    });
  });

  describe("parseSetupData", () => {
    it("Parses setup data coming in from REST endpoint", () => {
      const response = new Response();
      response.data = [
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
      ];

      const expected = [
          new Setup("123", "ionian", "G", 8),
          new Setup("456", "ionian", "F", 7),
      ];

      const wrapper = shallow(<Setups />);
      const setups = wrapper.instance().parseSetupData(response);
      expect(setups).to.deep.equal(expected);
    });
  });
});
