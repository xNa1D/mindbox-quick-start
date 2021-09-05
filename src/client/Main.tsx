import React, { CSSProperties } from "react";

import ScenarioForm from "client/scenario/ScenarioForm";
import AuthComponent from "./auth/AuthComponent";

import "client/styles/block/form/form.css";
import { Container, Grid, Icon, Menu, Segment } from "semantic-ui-react";
import Logo from "./common/Logo";

const Main = () => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <section style={{ flexGrow: 1 }}>
        <AuthComponent />
      </section>
      <Segment vertical style={{ padding: "5em 0em", flexGrow: 3 }}>
        <main className="main">
          <ScenarioForm />
        </main>
      </Segment>
      <Segment inverted vertical style={{ padding: "3em 0em" }}>
        <Container>
          <Icon name="code" /> with <Icon name="heart" color="red" />
        </Container>
      </Segment>
    </div>
  );
};

export default Main;
