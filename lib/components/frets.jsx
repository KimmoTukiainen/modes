import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";

import styles from "./frets.module.less";

import { getScalePattern } from "../data";
import { getScale, getStrings } from "../modes/modes.functions";
import { getFretSymbols } from "./app.functions";

class Frets extends React.Component {
  renderNote(note, key) {
    const hasNote = note !== "-";
    const names = ["note"];
    if (hasNote) {
      names.push("hasNote");
    }

    if (note === this.props.note) {
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
    const className = ["fret"];
    if (special) {
      className.push("special");
    }
    if (i === 0) {
      className.push("first");
    }
    return (
      <div styleName={className.join(" ")} key={i}>
        {currentFret.map((note, j) => this.renderNote(note, `${i}-${j}`))}
      </div>
    );
  }

  render() {
    const strings = getStrings(this.props.amount);
    const scale = getScale(this.props.note, getScalePattern(this.props.mode));
    const frets = getFretSymbols(strings, scale);

    return <div>{frets[0].map((fret, i) => this.renderFret(frets, i))}</div>;
  }
}

Frets.propTypes = {
  amount: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired
};

export default CSSModules(Frets, styles, { allowMultiple: true });
