import axios from "axios";
import Setup from "../api/Setup";

class SetupsApi {
  constructor() {
    this.parseSetupDataItem = this.parseSetupDataItem.bind(this);
  }
  parseSetupDataItem(item) {
    const { _id, mode, key, amount } = item;
    return new Setup(_id, mode, key, amount);
  }

  parseSetupData(response) {
    const data = response.data || [];
    return data.map(item => this.parseSetupDataItem(item));
  }

  getSetups() {
    return axios
      .get("/api/setups")
      .then(this.parseSetupData.bind(this))
      .catch(error => {
        return [];
        console.log(error);
      });
  }

  deleteSetup(setup) {
    if (!setup._id) {
      throw new Error("No id provided");
    }
    const { _id } = setup;

    return axios
      .delete("/api/setups/" + _id)
      .then(() => {
        return true;
      })
      .catch(error => {
        console.warn(error);
        return false;
      });
  }

  clearSetups() {
    return axios
      .delete("/api/setups")
      .then(() => {
        return true;
      })
      .catch(error => {
        console.warn(error);
        return false;
      });
  }

  createSetup(setup) {
    if (!setup) {
      return new Promise((reject, resolve) => reject());
    }

    return axios
      .post("/api/setups/", setup)
      .then(response => this.parseSetupDataItem(response.data))
      .catch(error => {
        console.warn(error);
      });
  }
}

export default SetupsApi;
