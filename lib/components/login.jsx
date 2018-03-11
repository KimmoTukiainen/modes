import React from "react";
import CSSModules from "react-css-modules";

import styles from "./login.module.less";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showLoginForm: false
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(property) {
    return event => {
      event.preventDefault();
      const { value } = event.target;
      const state = {
        ...this.state,
        [property]: value
      };
      this.setState(state);
    };
  }

  toggleLoginForm() {
    this.setState({
      ...this.state,
      showLoginForm: !this.state.showLoginForm
    });
  }

  login() {
    const { username, password } = this.state;
    const payload = {
      username,
      password
    };
    this.props.login(payload);
  }

  render() {
    return (
      <div>
        {this.props.user ? (
          <form
            method="post"
            styleName="logoutForm topArea"
            onSubmit={e => this.props.logout(e)}
          >
            <span>{this.props.user.name}</span>
            <button styleName="action">Logout</button>
          </form>
        ) : this.state.showLoginForm ? (
          <form
            method="post"
            styleName="loginForm"
            onSubmit={e => {
              e.preventDefault();
              this.login();
            }}
          >
            <h1 styleName="title">Modes for Guitar</h1>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={this.props.username}
              onChange={this.onChange("username")}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={this.props.password}
              onChange={this.onChange("password")}
            />
            <div styleName="actions">
              <span
                styleName="action"
                onClick={e => {
                  e.preventDefault();
                  this.toggleLoginForm();
                }}
              >
                Cancel
              </span>
              <button styleName="action">Login</button>
            </div>
          </form>
        ) : (
          <div styleName="topArea openForm">
            <span
              styleName="action"
              onClick={e => {
                e.preventDefault();
                this.toggleLoginForm();
              }}
            >
              Login
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default CSSModules(Login, styles, { allowMultiple: true });
