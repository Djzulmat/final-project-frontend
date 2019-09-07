import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

class NavBar extends Component {
  render() {
    let { loggedIn, user } = this.context;

    console.log(user, "user");

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" exact to="/">
                Home<span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              {loggedIn && (
                <NavLink className="nav-link" to="/logout">
                  Log Out {user.username}
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
