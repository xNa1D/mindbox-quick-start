import React, { CSSProperties } from "react";

import ScenarioForm from "client/scenario/ScenarioForm";
import AuthComponent from "./auth/AuthComponent";

import "client/styles/block/form/form.css";
import { Container, Grid, Menu, Segment } from "semantic-ui-react";
import Logo from "./common/Logo";

const Main = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <section>
        <AuthComponent />
      </section>
      <Segment vertical style={{ padding: "5em 0em" }}>
        <main className="main">
          <ScenarioForm />
        </main>
      </Segment>
        <Segment inverted vertical style={{ padding: "5em 0em"}}>
          <Container></Container>
        </Segment>
    </div>
  );
};

export default Main;
