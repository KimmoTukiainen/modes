import React from "react";
import CSSModules from "react-css-modules";
import axios from "axios";

import styles from "./app.module.less";

import { scalePatterns, notes } from "../data.js";
import { pluck, map } from "../functional.functions";
import { getTokenHeader } from "./login.functions";

import Frets from "./frets";
import Setups from "./setups";
import SelectBox from "./selectBox";
import Login from "./login";

import Option from "./Option";
import Setup from "../api/Setup";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "E",
      mode: "dorian",
      amount: 6,
      scalePatterns,
      user: null,
      token: null
    };

    this.onModeChange = this.onModeChange.bind(this);
    this.onKeyChange = this.onKeyChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onSetupChange = this.onSetupChange.bind(this);
    this.getCurrentSetup = this.getCurrentSetup.bind(this);
    this.login = this.login.bind(this);
  }

  async login(credentials) {
    const response = await axios
      .post("/api/login", credentials)
      .catch(error => console.warn(error));
    const { token } = response.data;

    const res = await axios.get("/api/users/me", getTokenHeader(token));

    const { user } = res.data;
    this.setUser(user);
    this.setToken(token);
  }

  setUser(user) {
    this.setState({
      ...this.state,
      user
    });
  }

  setToken(token) {
    this.setState({
      ...this.state,
      token
    });
  }

  onSetupChange(setup) {
    const state = {
      ...this.state,
      ...setup
    };

    delete state._id;

    this.setState(state);
  }

  onAmountChange(value) {
    const amount = parseInt(value, 10);
    if (amount < 0) {
      throw new Error("Negative amount provided");
    }
    const state = {
      ...this.state,
      amount
    };
    this.setState(state);
  }

  onModeChange(mode) {
    const state = {
      ...this.state,
      mode
    };
    this.setState(state);
  }

  onKeyChange(key) {
    const state = {
      ...this.state,
      key
    };
    this.setState(state);
  }

  getCurrentSetup() {
    return new Setup(null, this.state.mode, this.state.key, this.state.amount);
  }

  render() {
    const modeOptions = this.state.scalePatterns.map(
      pattern => new Option(pattern.name, pattern.name)
    );
    const activeMode = modeOptions.find(opt => opt.value === this.state.mode);

    const keyOptions = notes.map(note => new Option(note, note));
    const activeKey = keyOptions.find(opt => opt.value === this.state.key);

    const stringOptions = [6, 7, 8].map(amount => new Option(amount, amount));
    const activeString = stringOptions.find(s => s.value === this.state.amount);

    return (
      <div styleName="container">
        <Login
          user={this.state.user}
          login={this.login}
          logout={() => console.log("logout")}
        />
        <Setups
          onChange={this.onSetupChange}
          getCurrentSetup={this.getCurrentSetup}
          token={this.state.token}
        />
        <div styleName="choices">
          <SelectBox
            title="Select mode"
            options={modeOptions}
            onChange={this.onModeChange}
            value={activeMode}
          />
          <SelectBox
            title="Select key"
            options={keyOptions}
            onChange={this.onKeyChange}
            value={activeKey}
          />
          <SelectBox
            title="Amount of strings"
            options={stringOptions}
            onChange={this.onAmountChange}
            value={activeString}
          />
        </div>
        <Frets
          amount={this.state.amount}
          mode={this.state.mode}
          note={this.state.key}
        />
      </div>
    );
  }
}

export default CSSModules(App, styles, { allowMultiple: true });
