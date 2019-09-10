import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import { UserContext } from "../UserContext";

import "./Login.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    loggedIn: null
  };

  componentDidMount() {
    const { loggedIn } = this.context;
    if (loggedIn) {
      this.props.history.push("appointments");
    }
  }

  componentDidUpdate(prevProps) {
    const { loggedIn } = this.context;

    if (loggedIn) {
      this.props.history.push("appointments");
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const user = this.state;

    axios
      .post(`${API_URL}/auth/login`, user, { withCredentials: true })
      .then(res => {
        this.setState({ loggedIn: true }, () => {
          this.props.fetchUser();
          // console.log(this.props);
          this.props.history.push("appointments");
        });
      })
      .catch(err => {
        if (err.response.data.message) {
          alert(err.response.data.message);
        } else {
          this.setState({ errors: err.response.data.errors });
        }
      });
  };

  render() {
    const { errors } = this.state;
    const { loggedIn } = this.context;

    return (
      <div className="row">
        <section id="login" className="col-md-6 offset-md-3">
          <h2 className="mb-4">Login</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                className="form-control form-control-lg"
                placeholder="example@example.com"
              />
              {errors.email && (
                <div
                  className="alert-danger alert-dismissable fade show"
                  style={{ width: "100%" }}
                  role="alert"
                >
                  {errors.email}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                className="form-control form-control-lg"
              />
              {errors.password && (
                <div
                  className="alert-danger alert-dismissable fade show"
                  style={{ width: "100%" }}
                  role="alert"
                >
                  {errors.password}
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary float-right">
              Login
            </button>
          </form>
        </section>
      </div>
    );
  }
}

Login.contextType = UserContext;

export default Login;
