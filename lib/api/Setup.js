class Setup {
  constructor(id, mode, key, amount) {
    this._id = id;
    this.mode = mode;
    this.key = key;
    this.amount = parseInt(amount, 10);
  }
}

export default Setup;
