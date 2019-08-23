import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Route";

import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Dashboard from "../pages/dashboard";
import Profile from "../pages/profile";
import Details from "../pages/details";
import New from "../pages/new";

export default function Routes() {
  return (
    <Switch>
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/" exact component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/meetup/new" component={New} isPrivate />
      <Route path="/meetup/:id/details" component={Details} isPrivate />
      <Route path="/meetup/:id/edit" component={New} isPrivate />

      <Route path="*" component={() => <h1>404</h1>} />
    </Switch>
  );
}
