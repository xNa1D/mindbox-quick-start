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
      <Segment basic style={{ flexGrow: 1 }}>
        <AuthComponent />
      </Segment>
      <Segment basic style={{ flexGrow: 3 }}>
        <ScenarioComponent />
      </Segment>
      <Segment inverted vertical style={{ padding: "3em 0em" }}>
        <Footer />
      </Segment>
    </div>
  );
};

export default Main;
