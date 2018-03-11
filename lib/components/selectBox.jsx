import PropTypes from "prop-types";
import React from "react";
import CSSModules from "react-css-modules";

import styles from "./selectBox.module.less";

import Option from "./Option";

class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { value } = event.target;
    this.props.onChange(value);
  }

  getOptionClassName(option) {
    const classNames = ["option"];
    if (this.isActiveOption(option)) {
      classNames.push("selected");
    }
    return classNames.join(" ");
  }

  isActiveOption(option) {
    return option === this.props.value;
  }

  // <h3 styleName="title">{this.props.title}</h3>

  render() {
    const { value } = this.props.value;
    return (
      <div styleName="choice">
        <select value={value} onChange={this.onChange}>
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
  options: PropTypes.arrayOf(PropTypes.instanceOf(Option)).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Option).isRequired
};

export default CSSModules(SelectBox, styles, { allowMultiple: true });
