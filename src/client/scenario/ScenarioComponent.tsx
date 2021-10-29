import React, { useEffect, useState } from "react";

import { Scenario, StartScenarioBody } from "src/declarations";
import useAuth from "client/auth/useAuth";
// import scenarios from "src/data";

import { Container, Grid, Header, Segment } from "semantic-ui-react";

import ScenarioInfo from "./ScenarioInfo";
import ScenarioForm from "./ScenarioForm";
import ScenarioInstruction from "./ScenarioInstruction";
import { getAllScenarios } from "./getAllScenarios";

const ScenarioComponent = () => {
  const auth = useAuth();

  useEffect(() => {
    getAllScenarios().then((data) => setScenarios(data));
  }, []);
  
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  const [scenarioInfo, setScenarioInfo] = useState({
    scenario: scenarios[0],
    projectName: auth.loginForProject,
    campaign: 0,
    emailForNotification: "",
  } as StartScenarioBody);
  return (
    <Container fluid>
      <Header as="h1">Завести операции ...</Header>
      <Grid columns={2} stackable>
        <Grid.Column width={6} style={{ maxWidth: "450px" }}>
          <Segment style={{ position: "sticky", top: "15px" }}>
            <ScenarioForm
              scenarioInfo={scenarioInfo}
              updateScenarioInfo={setScenarioInfo}
            />
            <ScenarioInstruction />
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          <ScenarioInfo scenario={scenarioInfo.scenario} />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default ScenarioComponent;
