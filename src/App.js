import React from "react";
import Routes from "./config/routes";
import NavBar from "./components/Layout/NavBar";
import { UserContext } from "./UserContext";
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
    this.fetchUser();
  }

  fetchUser = () => {
    axios
      .get(`${API_URL}/user/me`, { withCredentials: true })
      .then(res => {
        this.setState({ loggedIn: true, user: res.data.data });
      })
      .catch(err => {
        this.setState({ loggedIn: false, user: {} });
      });
  };

  render() {
    // const { loggedIn } = this.state;

    return (
      <UserContext.Provider value={this.state}>
        <NavBar fetchUser={this.fetchUser} />
        <div className="App">
          <Routes fetchUser={this.fetchUser} />
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
