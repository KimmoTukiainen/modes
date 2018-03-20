// Chai
require("chai/register-assert"); // Using Assert style
require("chai/register-expect"); // Using Expect style
require("chai/register-should"); // Using Should style

// LESS processing needs this*
require("ignore-styles");

// ES6/ES201X-functionality
require("babel-polyfill");
// (require("../package.json").babel); // to be able to write es6+ tests

/*
// DOM simulation things
// ------------------------
if (!global.dom) {
  const jsdom = require("jsdom");
  // Define some html to be our basic document
  // JSDOM will consume this and act as if we were in a browser
  const DEFAULT_HTML = "<html><body></body></html>";
  // Define some variables to make it look like we're a browser
  // First, use JSDOM's fake DOM as the document
  const dom = new jsdom.JSDOM(DEFAULT_HTML);
  // Set up a mock window
  global.window = dom.window;
  global.document = dom.window.document;
  // Allow for things like window.location
  global.navigator = global.window.navigator;

  global.dom = dom;

  // ugly shim for react 16 to stop complaining
  if (!global.requestAnimationFrame) {
    global.requestAnimationFrame = callback => {
      setTimeout(callback, 0);
    };
  }
}
global.window.React = global.React;
global.window.ReactDOM = global.ReactDOM;
*/

// Put react on Window, that's what we do in the normal application (for now)
global.React = require("react");
global.ReactDOM = require("react-dom");

var Adapter = require("enzyme-adapter-react-16");
var configure = require("enzyme").configure;
configure({ adapter: new Adapter() });
