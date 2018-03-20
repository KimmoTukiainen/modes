  /**
   * Setup is used for applying all the configurations to the UI at once so it's easier to compare them.
   * @param  {string} id - a unique string
   * @param  {string} mode - string representation of mode, like "dorian"
   * @param  {string} key - string representation of musical key like "F" or "F#"
   * @param  {int} amount - amount of strings
   */
class Setup {
  constructor(id, mode, key, amount) {
    this._id = id;
    this.mode = mode;
    this.key = key;
    this.amount = parseInt(amount, 10);
  }
}

export default Setup;
