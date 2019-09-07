import React from "react";
import Routes from "./config/routes";
import Authorization from "./Authorization";
import NavBar from "./components/Layout/NavBar";
import { UserContext, data } from "./UserContext";
import axios from "axios";
import { API_URL } from "./constants";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: {}
    };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/user/me`, { withCredentials: true })
      .then(res => {
        this.setState({ loggedIn: true, user: res.data.data });
      })
      .catch(err => {
        this.setState({ loggedIn: false });
      });
  }

  render() {
    const { user, loggedIn } = this.state;

    return (
      <UserContext.Provider value={this.state}>
        <NavBar />
        <div className="App">
          <Routes />
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
