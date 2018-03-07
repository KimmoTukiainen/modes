import styles from "./selectBox.module.less";
import PropTypes from "prop-types";
import React from "react";
import CSSModules from "react-css-modules";

import Option from "./Option";


class SelectBox extends React.Component {
  constructor(props) {
    super(props);
  }

  getOptionClassName(option) {
    const classNames = ["option"];
    if (option === this.props.value) {
      classNames.push("selected");
    }
    return classNames.join(" ");
  }

  onChange(event) {
    const { value } = event.target;
    this.props.onChange(value);
  }

  render() {
    const { value } = this.props.value;
    return (
      <div>
        <h3 styleName="title">{this.props.title}</h3>
        <select value={value} onChange={this.onChange.bind(this)}>
          {this.props.options.map((option, i) => (
            <option
              key={`${option.value}-${i}`}
              styleName={this.getOptionClassName(option)}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

SelectBox.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.instanceOf(Option)).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Option).isRequired
};

export default CSSModules(SelectBox, styles, { allowMultiple: true });
