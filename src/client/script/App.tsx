import React from "react";
import Logo from "./components/Logo";
import Login from './pages/Login'
import Registration from './pages/Registration';
import Scenario from "./pages/Scenario";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <section className="header">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/registration">registration</Link>
            </li>
            <li>
              <Link to="/scenario">scenario</Link>
            </li>
          </ul>
        </nav>
      </section>
      <main className="main">
        <Logo />
        <Switch>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/scenario">
            <Scenario />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </main>
   </Router>
  );
}
