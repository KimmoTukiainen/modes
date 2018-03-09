import Login from "./login";
import { shallow } from "enzyme";
import User from "../api/User";
import sinon from "sinon";

describe("<Login />", () => {
  describe("render", () => {
    it("Shows login form when no user is given", () => {
      const wrapper = shallow(<Login logout={() => {}} />);
      expect(wrapper.find(".loginForm")).to.have.length(1);
    });
    it("Shows logout when user is logged in", () => {
      const user = new User(2, "testi");
      const wrapper = shallow(<Login user={user} logout={() => {}} />);
      expect(wrapper.find(".logoutForm")).to.have.length(1);
    });
  });

  describe("onChange", () => {
    it("Changes the property in the state", () => {
      const wrapper = shallow(<Login login={() => {}} logout={() => {}} />);
      const spy = sinon.spy();
      wrapper.find("input[name='username']").simulate("change", {
        target: { value: "steve" },
        preventDefault: spy
      });
      expect(wrapper.state().username).to.equal("steve");
      sinon.assert.called(spy);
    });
  });

  describe("Login", () => {
    it("Dispatches the login credentials", () => {
      const spy = sinon.spy();
      const login = sinon.spy();
      const wrapper = shallow(<Login login={login} logout={() => {}} />);

      wrapper.find("input[name='username']").simulate("change", {
        target: { value: "steve" },
        preventDefault: spy
      });
      wrapper
        .find("input[name='password']")
        .simulate("change", { target: { value: "pass" }, preventDefault: spy });

      wrapper.find(".loginForm").simulate("submit");
      sinon.assert.calledTwice(spy);
      sinon.assert.calledWith(login, {
          username: "steve",
          password: "pass"
      })
    });
  });
});
