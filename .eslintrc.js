module.exports = {
  extends: ["airbnb", "prettier"],
  rules: {
    "no-underscore-dangle": 0
  },
  globals: {
    describe: true,
    it: true,
    expect: true,
    beforeEach: true,
    afterEach: true,
    document: true,
    location: true
  }
};
