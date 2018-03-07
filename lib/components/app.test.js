import { shallow } from "enzyme";

import App from "./app";

describe("<App />", () => {
  describe("onAmountChange", () => {
    it("updates the state when amount of strings is changed", () => {
      const wrapper = shallow(<App />);
      const amount = 9; 
      expect(wrapper.state().amount).to.equal(6);
      wrapper.instance().onAmountChange(amount);
      expect(wrapper.state().amount).to.equal(9);
    });
  });
});
