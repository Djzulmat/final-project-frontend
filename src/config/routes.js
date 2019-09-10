import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../components/Register";
import Login from "../components/Login";
import Appointments from "../components/Appointments";

const Routes = parentProps => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        path="/register"
        render={props => <Register {...props} {...parentProps} />}
      />
      <Route
        path="/login"
        render={props => <Login {...props} {...parentProps} />}
      />

      <Route
        path="/appointments"
        render={props => <Appointments {...props} {...parentProps} />}
      />
    </Switch>
  );
};

export default Routes;
