import React, { useEffect, useState } from "react";

import { Scenario, StartScenarioBody } from "src/declarations";
import useAuth from "client/auth/useAuth";
// import scenarios from "src/data";

import { Container, Grid, Header, Segment } from "semantic-ui-react";

import ScenarioInfo from "./ScenarioInfo";
import ScenarioForm, { fallbackScenario } from "./ScenarioForm";
import ScenarioInstruction from "./ScenarioInstruction";
import { getAllScenarios } from "./getAllScenarios";

const ScenarioComponent = () => {
  const auth = useAuth();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<string>("");

  useEffect(() => {
    getAllScenarios()
      .then((data) => {
        setScenarios(data);
      })
      .catch(console.log);
  }, []);

  return (
    <Container fluid>
      <Header as="h1">Завести операции ...</Header>
      <Grid columns={2} stackable>
        <Grid.Column width={6} style={{ maxWidth: "450px" }}>
          <Segment style={{ position: "sticky", top: "15px" }}>
            <ScenarioForm
              allScenarios={scenarios}
              selectedScenario={selectedScenario}
              onChangeSelectedScenario={setSelectedScenario}
            />
            <ScenarioInstruction />
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          {scenarios && selectedScenario && (
            <ScenarioInfo
              scenario={
                scenarios.find((s) => s.type === selectedScenario) ||
                fallbackScenario
              }
            />
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default ScenarioComponent;
