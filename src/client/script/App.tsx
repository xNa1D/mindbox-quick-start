import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import PrivateRoute from "client/script/helpers/PrivateRoute";
import Logo from "./components/Logo";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Scenario from "./pages/Scenario";
import { ProvideAuth } from "src/client/script/hooks/useAuth";

import "client/styles/block/main/main.css";

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <section className="header"></section>
        <main className="main">
          <Logo />
          <Switch>
            <Route path="/registration">
              <Registration />
            </Route>
            <PrivateRoute path="/scenario">
              <Scenario />
            </PrivateRoute>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </main>
      </Router>
    </ProvideAuth>
  );
}
