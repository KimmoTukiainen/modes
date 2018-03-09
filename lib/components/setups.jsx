import React from "react";
import axios from "axios";
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

  parseSetupDataItem(item) {
    const { _id, mode, key, amount } = item;
    return new Setup(_id, mode, key, amount);
  }

  parseSetupData(response) {
    const data = response.data || [];
    return data.map(item => this.parseSetupDataItem(item));
  }

  componentDidMount() {
    // this.getSetups();
    console.log("Dont forget to enable this"); 
  }

  getSetups() {
    axios
      .get("/api/setups")
      .then(response => {
        this.updateSetups(this.parseSetupData(response));
      })
      .catch(error => {
        console.log(error);
      });
  }

  removeSetup(setup) {
    const setups = removeFromList(this.state.setups, setup);
    const state = {
      ...this.state,
      setups
    };

    this.setState(state);
  }

  deleteSetup(setup) {
    if (!setup._id) {
      // throw new Error("No id provided");
    }
    const { _id } = setup;

    axios
      .delete("/api/setups/" + _id)
      .then(response => {
        this.removeSetup(setup);
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
