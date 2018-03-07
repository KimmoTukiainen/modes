import styles from "./app.module.less";

import React from "react";
import Setups from "./setups.jsx";
import CSSModules from "react-css-modules";
import { getScalePattern, scalePatterns, notes } from "../data.js";
import {
  getScale,
  getStringOctave,
  getStrings
} from "../modes/modes.functions";
import { getFretSymbols } from "./app.functions";
import { pluck, map } from "../functional.functions";
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

  renderNote(note, key) {
    const hasNote = note !== "-";
    let names = ["note"];
    if (hasNote) {
      names.push("hasNote");
    }

    if (note === this.state.key) {
      names.push("root");
    }

    const className = names.join(" ");
    return (
      <span styleName={className} key={key}>
        <span>{note}</span>
      </span>
    );
  }

  renderFret(frets, i) {
    const currentFret = frets.map(str => str[i]);
    const special = [3, 5, 7, 9].some(nbr => nbr === i);
    let className = ["fret"];
    if (special) {
      className.push("special");
    }
    if (i === 0) {
      className.push("first");
    }
    return (
      <div styleName={className.join(" ")} key={i}>
        {currentFret.map((note, j) => this.renderNote(note, i + "-" + j))}
      </div>
    );
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

    const strings = getStrings(this.state.amount);
    const scale = getScale(this.state.key, getScalePattern(this.state.mode));
    const frets = getFretSymbols(strings, scale);

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
        {frets[0].map((fret, i) => this.renderFret(frets, i))}
      </div>
    );
  }
}

export default CSSModules(App, styles, { allowMultiple: true });
