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
});
