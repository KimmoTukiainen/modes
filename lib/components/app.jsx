import React from "react";
import CSSModules from "react-css-modules";

import styles from "./app.module.less";

import { scalePatterns, notes } from "../data.js";
import { pluck, map } from "../functional.functions";

import Frets from "./frets";
import Setups from "./setups";
import SelectBox from "./selectBox";

import Option from "./Option";
import Setup from "../api/Setup";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "E",
      mode: "dorian",
      amount: 6,
      scalePatterns
    };

    this.onModeChange = this.onModeChange.bind(this);
    this.onKeyChange = this.onKeyChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onSetupChange = this.onSetupChange.bind(this);
    this.getCurrentSetup = this.getCurrentSetup.bind(this);
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
        <Setups
          onChange={this.onSetupChange}
          getCurrentSetup={this.getCurrentSetup}
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
