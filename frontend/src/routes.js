import React from "react";
import { Switch, Route } from "react-router-dom";

import SignIn from "./pages/signin";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={Signup} />
    </Switch>
  );
}
