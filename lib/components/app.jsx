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
import SetupService from "../api/SetupService";
import Option from "./Option";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "E",
      scale: "dorian",
      stringsAmount: 6,
      scalePatterns
    };

    this.onModeChange = this.onModeChange.bind(this);
    this.onKeyChange = this.onKeyChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);

    this.setupService = new SetupService();
  }

  onAmountChange(stringsAmount) {
    const state = {
      ...this.state,
      stringsAmount
    };
    this.setState(state);
  }

  onModeChange(scale) {
    const state = {
      ...this.state,
      scale
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
    debugger;
    const strings = getStrings(this.state.stringsAmount);
    const scale = getScale(this.state.key, getScalePattern(this.state.scale));
    const frets = getFretSymbols(strings, scale);

    const modeOptions = this.state.scalePatterns.map(
      pattern => new Option(pattern.name, pattern.name)
    );
    const activeMode = modeOptions.find(opt => {
      return opt.value === this.state.scale;
    });
    return (
      <div styleName="container">
        <Setups getSetups={this.setupService.getSetups} />
        <div styleName="choices">
          <SelectBox
            title="Select mode"
            options={modeOptions}
            onChange={this.onModeChange}
            value={activeMode}
          />
          <div styleName="choice">
            <h1 styleName="title">Select key</h1>
            <select
              defaultValue={this.state.key}
              onChange={e => this.onKeyChange(e.target.value)}
            >
              {notes.map(note => <option key={note}>{note}</option>)}
            </select>
          </div>
          <div styleName="choice">
            <h1 styleName="title">Amount of strings</h1>
            <select
              defaultValue={this.state.stringsAmount}
              onChange={e => this.onAmountChange(e.target.value)}
            >
              {[6, 7, 8].map(amount => <option key={amount}>{amount}</option>)}
            </select>
          </div>
        </div>
        {frets[0].map((fret, i) => this.renderFret(frets, i))}
      </div>
    );
  }
}

export default CSSModules(App, styles, { allowMultiple: true });
