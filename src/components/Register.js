import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../constants";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    errors: {},
    loggedIn: null
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newUser = this.state;
    axios
      .post(`${API_URL}/auth/register`, newUser, { withCredentials: true })
      .then(res => {
        this.setState({ loggedIn: true }, () => {
          this.props.history.push("appointments");
        });
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors });
      });
  };

  render() {
    const { errors, loggedIn } = this.state;

    if (loggedIn == null) {
      return "I am loading";
    } else {
      return (
        <div className="row">
          <section id="register" className="col-md-6 offset-md-3">
            <h2 className="mb-4">Register</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="username"
                  id="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  className="form-control form-control-lg"
                  placeholder="Please enter your username..."
                />
                {errors.username && (
                  <div
                    className="alert-danger alert-dismissable fade show"
                    style={{ width: "100%" }}
                    role="alert"
                  >
                    {errors.username}
                  </div>
                )}
              </div>
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
                Register
              </button>
            </form>
          </section>
        </div>
      );
    }
  }
}

export default Register;
