import React from "react";
import axios from "axios";
import { API_URL } from "./constants";

import "./App.css";

class Authorization extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: false
    };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/user/me`, { withCredentials: true })
      .then(res => {
        this.setState({ loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ errors: err.response.data.errors });
      });
  }

  render() {
    return this.props.children;
  }
}

export default Authorization;
