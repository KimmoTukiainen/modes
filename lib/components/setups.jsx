import React from "react";
import CSSModules from "react-css-modules";
import PropTypes from "prop-types";

import styles from "./setups.module.less";
import {
  createSetup,
  setupLabel,
  getSetups,
  deleteSetup,
  clearSetups
} from "./setups.functions";
import { removeFromList, joinItems } from "../functional.functions";

class Setups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setups: []
    };
    this.deleteSetup = this.deleteSetup.bind(this);
    this.clearSetups = this.clearSetups.bind(this);
    this.createSetup = this.createSetup.bind(this);
    this.createSetupFromState = this.createSetupFromState.bind(this);
  }

  componentDidMount() {
    this.getSetups();
  }

  async getSetups() {
    const setups = await getSetups();
    this.updateSetups(setups);
  }

  async deleteSetup(setup) {
    const deleted = await deleteSetup(setup, this.props.token);
    if (deleted) {
      this.removeSetup(setup);
    }
  }

  updateSetups(setups) {
    const state = {
      ...this.state,
      setups
    };
    this.setState(state);
  }

  async clearSetups() {
    const cleared = await clearSetups(this.props.token);
    if (cleared) {
      this.updateSetups([]);
    }
  }

  createSetupFromState() {
    const setup = this.props.getCurrentSetup();
    this.createSetup(setup);
  }

  removeSetup(setup) {
    const setups = removeFromList(this.state.setups, setup);
    const state = {
      ...this.state,
      setups
    };

    this.setState(state);
  }

  addSetup(setup) {
    this.setState({
      ...this.state,
      setups: [...this.state.setups, setup]
    });
  }

  async createSetup(setup) {
    const received = await createSetup(setup, this.props.token);
    if (received) {
      this.addSetup(received);
    }
  }

  render() {
    const hideClass = this.props.token ? "" : "hide";
    return (
      <div styleName="setups">
        {this.state.setups.map(setup => (
          <div styleName="setup" key={setup._id}>
            <span
              styleName="setupLabel"
              onClick={() => this.props.onChange(setup)}
            >
              {setupLabel(setup)}
            </span>
            <span
              styleName={joinItems(["delete", hideClass])}
              onClick={() => this.deleteSetup(setup)}
            >
              Delete
            </span>
          </div>
        ))}
        <div styleName="buttons">
          <div
            styleName={joinItems(["clear", hideClass])}
            onClick={this.clearSetups}
          >
            Clear
          </div>
        </div>
      </div>
    );
  }
}

Setups.propTypes = {
  token: PropTypes.string.isRequired,
  getCurrentSetup: PropTypes.func.isRequired
};

export default CSSModules(Setups, styles, { allowMultiple: true });
