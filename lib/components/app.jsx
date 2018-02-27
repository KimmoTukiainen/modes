import "./app.module.less";
import { getScalePattern, scalePatterns, notes } from "../data.js";
import {
  getScale,
  getStringOctave,
  getStrings
} from "../modes/modes.functions";
import { getFretSymbols } from "./app.functions";
import { pluck, map } from "../functional.functions";
import React from "react";

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
      <span className={className} key={key}>
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
    const strings = getStrings(this.state.stringsAmount);
    const scale = getScale(this.state.key, getScalePattern(this.state.scale));
    const frets = getFretSymbols(strings, scale);
    return (
      <div className="container">
        <div className="choices">
          <div className="choice">
            <h1>Select mode</h1>
            <select
              defaultValue={this.state.scale}
              onChange={e => this.onModeChange(e.target.value)}
            >
              {this.state.scalePatterns.map(pattern => (
                <option key={pattern.name}>{pattern.name}</option>
              ))}
            </select>
          </div>
          <div className="choice">
            <h1>Select key</h1>
            <select
              defaultValue={this.state.key}
              onChange={e => this.onKeyChange(e.target.value)}
            >
              {notes.map(note => <option key={note}>{note}</option>)}
            </select>
          </div>
          <div className="choice">
            <h1>Amount of strings</h1>
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

export default App;
