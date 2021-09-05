import React, { useState } from "react";

import { StartScenarioBody } from "src/declarations";
import useAuth from "client/auth/useAuth";
import scenarios from "src/data";

import { Container, Grid, Header } from "semantic-ui-react";

import ScenarioInfo from "./ScenarioInfo";
import ScenarioForm from "./ScenarioForm";

const ScenarioComponent = () => {
  const auth = useAuth();

  const [scenarioInfo, setScenarioInfo] = useState({
    scenario: scenarios[0],
    projectName: auth.loginForProject,
    campaign: 0,
    emailForNotification: "",
  } as StartScenarioBody);
  return (
    <Container>
      <Header as="h1">Завести операции ...</Header>
      <Grid columns={2} stackable divided>
        <Grid.Column width={6}>
          <ScenarioForm
            scenarioInfo={scenarioInfo}
            updateScenarioInfo={setScenarioInfo}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <ScenarioInfo
            documentationLink={scenarioInfo.scenario.docs}
            scenarioType={scenarioInfo.scenario.type}
          />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default ScenarioComponent;
