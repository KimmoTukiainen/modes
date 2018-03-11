import React from "react";
import CSSModules from "react-css-modules";

import styles from "./login.module.less";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
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
            formMethod="post"
            className="logoutForm"
            onSubmit={() => this.props.logout()}
          >
            <p>{this.props.user.name}</p>
            <button>Logout</button>
          </form>
        ) : (
          <form
            className="loginForm"
            onSubmit={e => {
              e.preventDefault();
              this.login();
            }}
          >
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
            <button>Login</button>
          </form>
        )}
      </div>
    );
  }
}

export default CSSModules(Login, styles, { allowMultiple: true });
