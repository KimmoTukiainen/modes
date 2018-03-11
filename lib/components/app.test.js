import { shallow } from "enzyme";

import App from "./app";
import Setup from "../api/Setup";

describe("<App />", () => {
  describe("onModeChange", () => {
    it("Has a default mode", () => {
      const wrapper = shallow(<App />);
      expect(wrapper.state().mode.length > 0).to.equal(true);
    });
    it("Changes mode to given value", () => {
      const wrapper = shallow(<App />);
      wrapper.instance().onModeChange("ionian");
      expect(wrapper.state().mode).to.equal("ionian");
    });
  });

  describe("onKeyChange", () => {
    it("Has a default key", () => {
      const wrapper = shallow(<App />);
      expect(wrapper.state().key).to.equal("E");
    });
    it("Updates the key on change", () => {
      const wrapper = shallow(<App />);
      wrapper.instance().onKeyChange("F");
      expect(wrapper.state().key).to.equal("F");
    });
  });

  describe("onAmountChange", () => {
    it("Has a default amount", () => {
      const wrapper = shallow(<App />);
      expect(wrapper.state().amount).to.equal(6);
    });
    it("updates the state when amount of strings is changed", () => {
      const wrapper = shallow(<App />);
      expect(wrapper.state().amount).to.equal(6);
      wrapper.instance().onAmountChange(9);
      expect(wrapper.state().amount).to.equal(9);
    });
    it("Does not allow negative amount of strings", () => {
      const wrapper = shallow(<App />);
      const bad = () => wrapper.instance().onAmountChange(-22);
      expect(bad).to.throw();
    });
  });

  describe("onSetupChange", () => {
    it("Updates the state with given setup", () => {
      const setup = new Setup(1, "dorian", "G#", 7);
      const wrapper = shallow(<App />);
      wrapper.instance().onSetupChange(setup);
      expect(wrapper.state().mode).to.equal("dorian");
      expect(wrapper.state().key).to.equal("G#");
      expect(wrapper.state().amount).to.equal(7);
    });
  });

  describe("getCurrentSetup", () => {
    it("Makes a new setup from the current state", () => {
      const wrapper = shallow(<App />);
      const setup = wrapper.instance().getCurrentSetup();
      expect(setup.mode).to.equal("dorian");
      expect(setup.key).to.equal("E");
      expect(setup.amount).to.equal(6);
    });
  });
});
