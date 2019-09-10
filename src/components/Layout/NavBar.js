import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import axios from "axios";
import { API_URL } from "../../constants";

import "./NavBar.css";
import Logo from "./logo.png";

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    axios
      .post(`${API_URL}/auth/logout`, {}, { withCredentials: true })
      .then(res => {
        this.setState({ loggedIn: false }, () => {
          this.props.fetchUser();
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ errors: err.response.data.errors });
      });
  };

  render() {
    let { loggedIn, user } = this.context;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              {loggedIn && (
                <NavLink className="nav-link" exact to="/appointments">
                  Appointments<span className="sr-only">(current)</span>
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {loggedIn && (
                <NavLink className="nav-link" onClick={this.logout}>
                  Log Out {[user.first_name, user.last_name].join(" ")}
                </NavLink>
              )}
            </li>
            <li className="nav-item" id="logo">
              {!loggedIn && (
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {!loggedIn && (
                <NavLink className="nav-link" to="/login">
                  Log In
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {!loggedIn && (
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

NavBar.contextType = UserContext;

export default NavBar;
