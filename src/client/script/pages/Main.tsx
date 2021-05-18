import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Accordion, Icon, Label } from "semantic-ui-react";

import LoginByAdmin from "client/script/components/LoginByAdmin";
import ScenarioForm from "client/script/components/ScenarioForm";

import { StartScenarioBody, ScenarioNames } from "src/declarations";
import { handleProjectNameInput } from "client/script/helpers/inputChanges";
import startScenario from "client/script/api/scenarioRequests";
import useAuth from "client/script/hooks/useAuth";
import scenarios from "src/data";

import "client/styles/block/form/form.css";

const Main = () => {
  const auth = useAuth();

  const [isAuthShown, setIsAuthShown] = useState(!auth.isLoggedIn);

  return (
    <>
      <Accordion>
        <Accordion.Title
          active={isAuthShown}
          index={0}
          onClick={() => setIsAuthShown(!isAuthShown)}
        >
          <Icon name="dropdown" />
          {auth.loginForProject ? (
            <Label color="green">
              Авторизован в проекте: {auth.loginForProject}.mindbox.ru
            </Label>
          ) : (
            <Label color="orange">Нужно авторизоваться</Label>
          )}
        </Accordion.Title>
        <Accordion.Content active={isAuthShown}>
          <LoginByAdmin />
        </Accordion.Content>
      </Accordion>

      <ScenarioForm />
    </>
  );
};

export default Main;
