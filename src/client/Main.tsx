import React from "react";

import AuthComponent from "./auth/AuthComponent";
import { Segment } from "semantic-ui-react";
import Footer from "./common/Footer";
import ScenarioComponent from "./scenario/ScenarioComponent";

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
