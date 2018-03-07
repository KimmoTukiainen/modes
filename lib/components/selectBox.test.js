import SelectBox from "./selectBox";
import Option from "./Option";
import { shallow } from "enzyme";
import sinon from "sinon";

describe("SelectBox", () => {
  describe("render", () => {
    it("Renders options", () => {
      const options = [
        new Option("First", 0),
        new Option("Second", 1),
        new Option("Third", 2)
      ];

      const wrapper = shallow(
        <SelectBox
          title="Test box"
          options={options}
          value={options[1]}
          onChange={() => {}}
        />
      );
      expect(wrapper.find(".option")).to.have.length(3);
    });
    it("Knows which option is selected", () => {
      const options = [
        new Option("First", 0),
        new Option("Second", 1),
        new Option("Third", 2)
      ];
      const wrapper = shallow(
        <SelectBox
          title="Test box"
          options={options}
          value={options[2]}
          onChange={() => {}}
        />
      );
      expect(wrapper.find(".selected")).to.have.length(1);
      expect(wrapper.find(".selected").props().value).to.equal(2);
    });
  });

  describe("onChange", () => {
    it("Triggers the provided function when an option is selected", () => {
      const spy = sinon.spy();
      const options = [
        new Option("First", 0),
        new Option("Second", 1),
        new Option("Third", 2)
      ];
      const wrapper = shallow(
        <SelectBox
          title="Test box"
          options={options}
          value={options[0]}
          onChange={spy}
        />
      );

      wrapper.find("select").simulate("change", { target: { value: 2 } });

      sinon.assert.calledWith(spy, 2);
    });
  });
});
