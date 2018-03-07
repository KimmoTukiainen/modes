import React from "react";
import axios from "axios";
import Setup from "../api/Setup";
import styles from "./setups.module.less";
import CSSModules from "react-css-modules";

class Setups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setups: []
    };

    this.createSetup = this.createSetup.bind(this);
    this.deleteSetup = this.deleteSetup.bind(this);
    this.clearSetups = this.clearSetups.bind(this);
  }

  updateSetups(setups) {
    const state = {
      ...this.state,
      setups
    };
    this.setState(state);
  }

  parseSetupData(setupData) {
    const { _id, mode, key, amount } = setupData;
    return new Setup(_id, mode, key, amount);
  }

  componentDidMount() {
    this.getSetups();
  }

  getSetups() {
    axios
      .get("/api/setups")
      .then(response => {
        const { data } = response;
        this.updateSetups(data.map(item => this.parseSetupData(item)));
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteSetup(setup) {
    if (!setup._id) {
      // throw new Error("No id provided");
    }
    const { _id } = setup;

    axios
      .delete("/api/setups/" + _id)
      .then(response => {
        this.getSetups();
      })
      .catch(error => {
        console.log(error);
      });
  }

  clearSetups() {
    axios
      .delete("/api/setups")
      .then(response => {
        this.getSetups();
      })
      .catch(error => {
        console.log(error);
      });
  }

  createSetup() {
    const setup = this.props.getCurrentSetup();
    axios
      .post("/api/setups/", setup)
      .then(response => {
        this.getSetups();
      })
      .catch(error => {
        console.log(error);
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
        <div onClick={this.createSetup}>Save</div>
        <div onClick={this.clearSetups}>Clear</div>
      </div>
    );
  }
}

export default CSSModules(Setups, styles, { allowMultiple: true });
