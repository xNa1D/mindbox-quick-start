import React, { useEffect, useState } from "react";

import { Scenario } from "src/declarations";
import useAuth from "src/client/processes/auth/useAuth";
// import scenarios from "src/data";

import { Container, Grid, Header, Segment } from "semantic-ui-react";

import ScenarioInfo from "./ScenarioInfo";
import ScenarioForm from "./ScenarioForm";
import ScenarioInstruction from "./ScenarioInstruction";
import { getAllScenarios } from "./getAllScenarios";

export const fallbackScenario: Scenario = {
  type: "",
  name: "----",
  docs: "",
  api: [],
  ghType: "new",
};

const ScenarioComponent = () => {
  useAuth();
  const [scenarios, setScenarios] = useState<Scenario[]>([fallbackScenario]);
  const [selectedScenario, setSelectedScenario] = useState<string>("");

  useEffect(() => {
    getAllScenarios()
      .then((data) => {
        setScenarios((prev) => [...prev, ...data]);
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
