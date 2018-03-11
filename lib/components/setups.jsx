import React from "react";
import axios from "axios";

import SetupsApi from "./SetupsApi";
import Setup from "../api/Setup";
import styles from "./setups.module.less";
import CSSModules from "react-css-modules";
import { removeFromList } from "../functional.functions";

class Setups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setups: []
    };
    this.api = new SetupsApi();
    this.deleteSetup = this.deleteSetup.bind(this);
    this.clearSetups = this.clearSetups.bind(this);
    this.createSetup = this.createSetup.bind(this);
    this.createSetupFromState = this.createSetupFromState.bind(this);
  }

  async createSetup(setup) {
    const received = await this.api.createSetup(setup, this.props.token);
    if (received) {
      this.addSetup(received);
    }
  }

  createSetupFromState() {
    const setup = this.props.getCurrentSetup();
    this.createSetup(setup);
  }

  async clearSetups() {
    const cleared = await this.api.clearSetups(this.props.token);
    this.updateSetups([]);
  }

  async deleteSetup(setup) {
    const deleted = await this.api.deleteSetup(setup, this.props.token);
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

  async getSetups() {
    const setups = await this.api.getSetups();
    this.updateSetups(setups);
  }

  componentDidMount() {
    this.getSetups();
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

  setupLabel(setup) {
    return `${setup.mode} ${setup.key} ${setup.amount}`;
  }

  render() {
    return (
      <div>
        {this.state.setups.map(setup => (
          <div styleName="setup" key={setup._id}>
            <span onClick={() => this.props.onChange(setup)}>
              {this.setupLabel(setup)}
            </span>
            <span onClick={() => this.deleteSetup(setup)}>delete</span>
          </div>
        ))}
        <div onClick={this.createSetupFromState}>Save</div>
        <div onClick={this.clearSetups}>Clear</div>
      </div>
    );
  }
}

export default CSSModules(Setups, styles, { allowMultiple: true });
