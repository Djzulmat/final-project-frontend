import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import { UserContext } from "../UserContext";

import "./Register.css";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    role: "doctor",
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
    const newUser = this.state;
    axios
      .post(`${API_URL}/auth/register`, newUser, { withCredentials: true })
      .then(res => {
        this.setState({ loggedIn: true }, () => {
          this.props.fetchUser();
          // console.log(this.props);
          this.props.history.push("appointments");
        });
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors });
      });
  };

  selectRole = event => {
    console.log(event.target.value);
    this.setState({
      role: event.target.value
    });
  };

  render() {
    const { errors } = this.state;
    const { loggedIn } = this.context;

    if (loggedIn == null) {
      return "I am loading";
    } else {
      return (
        <div className="row">
          <section id="register" className="col-md-6 offset-md-3">
            <h2 className="mb-4">Register</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">First name</label>
                <input
                  type="first_name"
                  id="first_name"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.handleChange}
                  className="form-control form-control-lg"
                  placeholder="Enter your First name"
                />
                {errors.first_name && (
                  <div
                    className="alert-danger alert-dismissable fade show"
                    style={{ width: "100%" }}
                    role="alert"
                  >
                    {errors.first_name}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="username">Last name</label>
                <input
                  type="last_name"
                  id="last_name"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.handleChange}
                  className="form-control form-control-lg"
                  placeholder="Enter your Last name"
                />
                {errors.last_name && (
                  <div
                    className="alert-danger alert-dismissable fade show"
                    style={{ width: "100%" }}
                    role="alert"
                  >
                    {errors.last_name}
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
              <div className="form-group role-button">
                <div>
                  <input
                    type="radio"
                    id="doctor"
                    name="role"
                    onClick={this.selectRole}
                    checked={this.state.role === "doctor"}
                    value="doctor"
                  />
                  <label htmlFor="doctor">Doctor</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="patient"
                    name="role"
                    onClick={this.selectRole}
                    checked={this.state.role === "patient"}
                    value="patient"
                  />
                  <label htmlFor="patient">Patient</label>
                </div>
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

Register.contextType = UserContext;

export default Register;
